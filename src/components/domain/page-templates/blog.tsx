import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import Content from 'src/components/common/layouts/content'

export default function BlogTemplate({ data }: any) {
  const blog = data.markdownRemark

  return (
    <Content navigationData={data.navigationData}>
      <SEO title={blog.frontmatter.Title} canonicalUrl={blog.frontmatter.permaLink} />

      <h2>{blog.frontmatter.title}</h2>
      <small>{blog.frontmatter.date}</small>
      <div dangerouslySetInnerHTML={{ __html: blog.html }} />
    </Content>
  )
}

export const query = graphql`
  query($slug: String!, $language: String!) {
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
    ...NavigationData
  }
`
