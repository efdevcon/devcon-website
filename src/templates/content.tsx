import { graphql } from "gatsby"
import React from "react"
import DefaultLayout from "src/components/layouts/default"

export default function ContentTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <DefaultLayout>
      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </DefaultLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        template
        keywords
        description
        autoTranslated
      }
    }
  }
`
