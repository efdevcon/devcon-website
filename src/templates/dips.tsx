import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import { DIPOverview } from 'src/components/dip-overview'
import Content from 'src/components/layouts/content'
import { PageHero } from 'src/components/common/page-hero'

export default function ContentTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <Content navigationData={data.navigationData}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageHero />

      <DIPOverview />
    </Content>
  )
}

export const query = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        lang
      }
      frontmatter {
        title
        template
        description
      }
    }
    ...NavigationData
  }
`
