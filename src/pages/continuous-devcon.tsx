import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { GetBlogs } from 'services/blogs'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'

export default pageHOC(function ContinuousDevcon(props: any) {
  const pageContext = usePageContext()

  return (
    <Page theme={themes['blue']}>
      <PageHero />

      <div className="section">
        <Tags items={pageContext?.current?.tags} viewOnly />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/continuous-devcon', context.locale)

  return {
    props: {
      ...globalData,
      page,
    },
  }
}
