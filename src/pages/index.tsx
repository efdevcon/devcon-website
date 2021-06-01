import React from 'react'
import Default from 'src/components/common/layouts/default'
import { SEO } from 'src/components/domain/seo'
import { PWAPrompt } from 'src/components/domain/pwa-prompt'
import { BlogReel } from 'src/components/domain/blog-overview'
import { graphql } from 'gatsby'
import { News } from 'src/components/domain/news'
import { pageHOC } from 'src/context/pageHOC'

export default pageHOC(function Index({ data }: any) {
  return (
    <Default>
      <SEO />
      {/* <PWAPrompt /> */}
      <News data={data.newsDataInline} />
      <BlogReel />
    </Default>
  )
})

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsDataInline
    ...Notification
  }
`
