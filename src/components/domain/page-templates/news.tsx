import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/domain/seo'
import Content from 'src/components/common/layouts/content'
import { PageHero } from 'src/components/common/page-hero'
import { formatNewsData } from 'src/components/domain/news/formatNewsData'
import { Feed } from 'src/components/common/feed'
import css from './news.module.scss'
import { pageHOC } from 'src/context/pageHOC'

export default pageHOC(function NewsTemplate({ data }: any) {
  const page = data.markdownRemark
  const newsItems = formatNewsData(data.newsData.nodes)

  return (
    <Content theme={css['theme']}>
      <SEO title={page.frontmatter.title} lang={page.fields.lang} />

      <PageHero title={page.frontmatter.title} />

      <div className="section">
        <div className="content">
          <Feed
            title="Devcon updates"
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
                    return sortBy === 'recent' ? 1 : -1
                  } else if (a.date === b.date) {
                    return 0
                  } else {
                    return sortBy === 'recent' ? -1 : 1
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
        </div>
      </div>
    </Content>
  )
})

export const query = graphql`
  query($slug: String!, $language: String!, $skip: Int!, $limit: Int!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      fields {
        lang
      }
      html
    }
    ...NavigationData
    ...LatestNewsItem
    ...NewsData
  }
`
