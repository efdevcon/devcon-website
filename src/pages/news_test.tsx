import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { NewsOverview } from 'components/domain/news/overview'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import getNews from 'services/news'

export default pageHOC(function NewsTemplate(props: any) {
  const pageContext = usePageContext()

  return (
    <Page theme={themes['news']}>
      <PageHero />

      <div className="section">
        <NewsOverview newsItems={props.news} />

        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/news', context.locale)

  return {
    props: {
      ...globalData,
      page,
      news: await getNews(context.locale),
    },
    revalidate: 1 * 60 * 30,
  }
}
