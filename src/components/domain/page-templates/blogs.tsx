import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/domain/seo'
import Content from 'src/components/common/layouts/content'
import { PageHero } from 'src/components/common/page-hero'
import css from './blogs.module.scss'
import { pageHOC } from 'src/context/pageHOC'
import { Feed } from '../blog-overview/Feed'
import { PageContentSection } from './page-content-section'

export default pageHOC(function BlogsTemplate({ data }: any) {
  const page = data.markdownRemark

  return (
    <Content theme={css['theme']}>
      <SEO title={page.frontmatter.title} lang={page.fields.lang} />

      <PageHero title={page.frontmatter.title} />

      <PageContentSection>
        <Feed />
      </PageContentSection>
    </Content>
  )
})

export const query = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      fields {
        lang
      }
      html
    }
    ...Tags
    ...NavigationData
    ...LatestNewsItem
    ...NewsData
  }
`

