import React from 'react'
import { graphql } from 'gatsby'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'

export default function DIPTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <Default>
      <SEO title={page.frontmatter.Title} />

      <h2>{page.frontmatter.Title} <small>#{page.frontmatter.DIP}</small></h2>
      <ul>
        <li>Status: {page.frontmatter.Status}</li>
        <li>Themes: {page.frontmatter.Themes}</li>
        <li>Tags: {page.frontmatter.Tags}</li>
        <li>Authors: {page.frontmatter.Authors}</li>
        <li>Resources Required: {page.frontmatter.Resources_Required}</li>
        <li>Dicussion: {page.frontmatter.Discussion}</li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </Default>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        DIP
        Title
        Status
        Themes
        Discussion
        Authors
        Resources_Required
        Tags
      }
    }
  }
`
