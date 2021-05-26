import React from 'react'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { PageHero } from 'src/components/common/page-hero'
import { formatNewsData } from 'src/components/domain/news/formatNewsData'
import { Feed } from 'src/components/common/feed'
import themes from './themes.module.scss'
import { pageHOC } from 'src/context/pageHOC'
import { PageContentSection } from './page-content-section'

export default pageHOC(function NewsTemplate({ data }: any) {
  const newsItems = formatNewsData(data.newsData.nodes)

  return (
    <Content theme={themes['orange']}>
      <PageHero />

      <PageContentSection>
        <Feed title="Devcon updates"
          items={newsItems}
          sortOptions={{
            options: [
              {
                text: 'RECENT',
                value: 'recent',
              },
              {
                text: 'OLDEST',
                value: 'oldest',
              },
            ],
            sort: (items: any[], sortBy: string) => {
              return items.sort((a, b) => {
                if (a.date < b.date) {
                  return sortBy === 'recent' ? -1 : 1
                } else if (a.date === b.date) {
                  return 0
                } else {
                  return sortBy === 'recent' ? 1 : -1
                }
              })
            },
          }}
          filterOptions={{
            filters: [
              {
                text: 'All',
                value: 'all',
              },
              {
                text: 'Tickets',
                value: 'tickets',
              },
              {
                text: 'Corona',
                value: 'corona',
              },
              {
                text: 'Event Date',
                value: 'event date',
              },
            ],
            filterFunction: activeFilter => {
              return !activeFilter || activeFilter === 'all'
                ? newsItems
                : newsItems.filter(newsItem => {
                    return newsItem?.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
                  })
            },
          }}
        />
      </PageContentSection>
    </Content>
  )
})

export const query = graphql`
  query($slug: String!, $language: String!) {
    ...Page
    ...NavigationData
    ...LatestNewsItem
    ...NewsData
  }
`
