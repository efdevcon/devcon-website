import React from 'react'
import Default from 'src/components/common/layouts/default'
import { SEO } from 'src/components/common/seo'
import { BlogOverview } from 'src/components/domain/blog-overview'
import { graphql } from 'gatsby'
import { News } from 'src/components/domain/news'

export default function Index({ data }: any) {
  return (
    <Default navigationData={data.navigationData}>
      <SEO />
      <News data={data.newsData} />
      <BlogOverview />
    </Default>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`
