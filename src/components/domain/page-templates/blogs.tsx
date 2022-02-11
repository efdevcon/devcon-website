import React from 'react'
import Content from 'components/common/layouts/content'
import { PageHero } from 'components/common/page-hero'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { BlogOverview } from '../blog-overview'
import { PageContentSection } from './page-content-section'

export default pageHOC(function BlogsTemplate() {
  return (
    <Content theme={themes['blue']}>
      <PageHero />

      <PageContentSection>
        <BlogOverview maxItems={10} blogs={[]} />
      </PageContentSection>
    </Content>
  )
})
