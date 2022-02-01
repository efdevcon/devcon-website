import React from 'react'
import { graphql } from 'gatsby'
import Content from 'components/common/layouts/content'
import { pageHOC } from 'context/pageHOC'
import { PageContentSection } from './page-content-section'
import { PageHero } from 'components/common/page-hero'
import { usePageContext } from 'context/page-context'
import themes from './themes.module.scss'

export default pageHOC(function ContentTemplate() {
  const pageContext = usePageContext()

  return (
    <Content theme={themes['orange']}>
      <PageHero />

      <PageContentSection>
        <h2>{pageContext?.current?.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: pageContext?.current?.body ?? '' }} />
      </PageContentSection>
    </Content>
  )
})

export const query = graphql`
  query ($slug: String!, $language: String!) {
    ...Page
    ...Notification
    ...NavigationData
  }
`
