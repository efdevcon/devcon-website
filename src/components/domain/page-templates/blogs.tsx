import React from 'react'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { PageHero } from 'src/components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'src/context/pageHOC'
import { Feed } from '../blog-overview/Feed'
import { PageContentSection } from './page-content-section'

export default pageHOC(function BlogsTemplate() {
  return (
    <Content theme={themes['blue']}>
      <PageHero />

      <PageContentSection>
        <Feed />
      </PageContentSection>
    </Content>
  )
})

export const query = graphql`
  query ($slug: String!, $language: String!) {
    ...Page
    ...NavigationData
    ...LatestNewsItem
    ...NewsData
  }
`
