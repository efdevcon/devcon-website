import React from 'react'
import { pageHOC } from 'context/pageHOC'
import { SEO } from 'components/domain/seo'
import themes from 'components/domain/themes.module.scss'
import Content from 'components/common/layouts/content'
import { GetCategories, GetDIPs, GetFAQ, GetNews, GetPage, GetPages } from 'services/page'

export default pageHOC(function DIPTemplate(props: any) {
  return (
    <Content theme={themes['orange']}>
      <SEO title={props.dip.title} />

      <p>Good news everyone!</p>
    </Content>
  )
})

// export async function getStaticPaths(context: any) {
//   const newsItems = GetNews()

//   return {
//     paths: [
//       newsItems.map(newsItem => {
//         return { params: { slug: newsItem.title }, locale: 'en' }
//       }),
//       newsItems.map(newsItem => {
//         return { params: { slug: newsItem.title }, locale: 'es' }
//       }),
//     ].flat(),
//     fallback: false,
//   }
// }

export async function getStaticProps() {
  return {
    props: {
      news: 'hey',
      // raw,
    },
    revalidate: 1 * 60 * 30, // 30 minutes, in seconds
  }
}
