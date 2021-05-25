import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/domain/seo'
import Content from 'src/components/common/layouts/content'
import { pageHOC } from 'src/context/pageHOC'
import { PageContentSection } from './page-content-section'

export default pageHOC(function ContentTemplate({ data, location }: any) {
  const page = data.markdownRemark

  return (
    <Content>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageContentSection>
        <h2>{page.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </PageContentSection>
    </Content>
  )
})

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
    ...Tags
    ...LatestNewsItem
    ...NavigationData
  }
`
