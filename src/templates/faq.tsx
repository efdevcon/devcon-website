import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import { FAQ } from 'src/components/faq'
import { ToFaqData } from 'src/components/faq/queryMapper'
import Content from 'src/components/layouts/content'

export default function FaqTemplate({ data }: any) {
  const page = data.markdownRemark
  const faq = ToFaqData(data)

  return (
    <Content navigationData={data.navigationData}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      <FAQ data={faq} />
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
    ...Categories
    ...FAQs
  }
`
