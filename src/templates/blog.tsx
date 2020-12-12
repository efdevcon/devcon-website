import React from 'react'
import { graphql } from 'gatsby'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'

export default function BlogTemplate({ data }: any) {
  const blog = data.markdownRemark

  return (
    <Default>
      <SEO title={blog.frontmatter.Title} canonicalUrl={blog.frontmatter.permaLink} />

      <h2>{blog.frontmatter.title}</h2>
      <small>{blog.frontmatter.date}</small>
      <div dangerouslySetInnerHTML={{ __html: blog.html }} />
    </Default>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        author
        permaLink
        imageUrl
      }
      fields {
        slug
      }
      html
    }
  }
`
