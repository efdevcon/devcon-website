import React from 'react'
import Content from 'components/common/layouts/content'
import { PageHero } from 'components/common/page-hero'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { PageContentSection } from './page-content-section'
import { NewsOverview } from 'components/domain/news/overview'

export default pageHOC(function NewsTemplate(props: any) {
  
  return (
    <Content theme={themes['news']}>
      <PageHero />

      <PageContentSection>
        <NewsOverview newsItems={props.news} />
      </PageContentSection>
    </Content>
  )
})
