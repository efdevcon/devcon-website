import React from 'react'
import Content from 'components/common/layouts/content'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { BlogOverview } from 'components/domain/blog-overview'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { GetBlogs } from 'services/blogs'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'

export default pageHOC(function BlogsTemplate(props: any) {
  const pageContext = usePageContext()

  return (
    <Content theme={themes['blue']}>
      <PageHero />

      <div className="section">
        <BlogOverview maxItems={10} blogs={props.blogs} />
        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Content>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/blog', context.locale)

  return {
    props: {
      ...globalData,
      page,
      blogs: await GetBlogs(),
    },
  }
}
