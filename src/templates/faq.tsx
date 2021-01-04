import React from 'react'
import { graphql } from 'gatsby'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'
import { FAQ } from 'src/components/faq'
import { ToCategories, ToFAQs } from 'src/components/faq/queryMapper'

export default function FaqTemplate({ data }: any) {
  const page = data.markdownRemark
  const categories = ToCategories(data)
  const faq = ToFAQs(data)

  return (
    <Default footerData={data.footer}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      <FAQ categories={categories} faqs={faq} />
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
    ...Categories
    ...FAQs
  }
`
