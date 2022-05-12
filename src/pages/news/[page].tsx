import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { NewsOverview } from 'components/domain/news/overview'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import getNews from 'services/news'
import { Button } from 'components/common/button'
import ChevronLeft from 'assets/icons/chevron_left.svg'
import ChevronRight from 'assets/icons/chevron_right.svg'
import { useRouter } from 'next/router'
import css from './news.module.scss'

const limit = 10

export default pageHOC(function NewsTemplate(props: any) {
  const pageContext = usePageContext()
  const router = useRouter()

  let className = `squared sm black ghost`

  const canNext = props.pagination.currentPage < props.pagination.totalPages
  const canBack = props.pagination.currentPage > 0
  const baseUrl = router.pathname

  console.log(baseUrl, pageContext, props)

  const prevPage = props.pagination.currentPage === 1 ? '/' : `/${props.pagination.currentPage - 1}`
  const nextPage = `/${props.pagination.currentPage + 1}`

  return (
    <Page theme={themes['news']}>
      <PageHero />

      <div className="section">
        <h1>{props.pagination.totalPages}</h1>
        <NewsOverview newsItems={props.news} />

        <div className={css['pagination']}>
          <Button
            disabled={!canBack}
            className={className}
            aria-label="Previous page"
            onClick={() => router.push(prevPage)}
          >
            <ChevronLeft />
          </Button>

          <Button
            disabled={!canNext}
            className={className}
            aria-label="Next page"
            onClick={() => router.push(nextPage)}
          >
            <ChevronRight />
          </Button>
        </div>

        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticPaths(context: any) {
  const news = await getNews(context.locale)

  const nItems = news.length

  return {
    paths: context.locales
      .filter((locale: string) => locale !== 'default')
      .map((locale: string) => {
        const paths = []
        let nPages = 0

        while (nItems > limit * nPages) {
          paths.push({ params: { page: nPages.toString() }, locale })

          nPages++
        }

        return paths
      })
      .flat(),
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/news', context.locale)
  const news = await getNews(context.locale) // Should cache this

  const isIndex = !context?.params?.page

  let range

  if (isIndex) {
    range = [0, limit]
  } else {
    const offset = context.params.page * limit

    range = [offset, offset + limit]
  }

  return {
    props: {
      ...globalData,
      page,
      news: news.slice(...range),
      pagination: {
        currentPage: isIndex ? 0 : parseInt(context.params.page),
        totalPages: Math.ceil(news.length / limit),
      },
    },
    revalidate: 1 * 60 * 30,
  }
}
