import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import Content from 'src/components/common/layouts/content'
import { DIP } from 'src/components/domain/dips/dip'

export default function DIPTemplate({ data, location }: any) {
  const page = data.markdownRemark

  return (
    <Content navigationData={data.navigationData} location={location}>
      <SEO title={page.frontmatter.Title} />

      <DIP dip={data.markdownRemark} />
    </Content>
  )
}

export const query = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { lang: { eq: $language }, slug: { eq: $slug } }) {
      html
      frontmatter {
        next_dip(language: $language)
        prev_dip(language: $language)
        DIP
        Title
        Status
        Themes
        Discussion
        Authors
        Resources_Required
        Github_URL
        Tags
      }
    }
    ...NavigationData
  }
`
