import React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from 'src/components/layouts/default'
import { SEO } from 'src/components/SEO/SEO'

export default function ContentTemplate({ data }: any) {
  const page = data.markdownRemark
  console.log('PAGE', page)

  return (
    <DefaultLayout>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </DefaultLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        lang
      }
      frontmatter {
        title
        template
        description
        autoTranslated
      }
    }
  }
`
