import { graphql } from "gatsby";
import React from "react"

export default function ContentTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <div>
      <h1>{page.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
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