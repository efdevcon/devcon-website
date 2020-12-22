import React from 'react'
import { graphql } from 'gatsby'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'
import { DIPOverview } from 'src/components/dip-overview'

export default function ContentTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <Default footerData={data.footer}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      <DIPOverview />
    </Default>
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
    ...FooterData
  }
`
