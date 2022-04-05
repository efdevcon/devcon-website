import Default from 'components/common/layouts/default'
import { BlogReel } from 'components/domain/blog-overview'
import { SEO } from 'components/domain/seo'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { TITLE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { PWAPrompt } from 'components/domain/app/pwa-prompt'
import { News } from 'components/domain/news'
import getNews from 'services/news'

export default pageHOC(function Index(props: any) {
  return (
    <Default>
      <SEO />
      {/* <PWAPrompt /> */}
      <News data={props.news} />
      <BlogReel blogs={props.blogs} />
      {/* <Notifications /> */}
    </Default>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)

  return {
    props: {
      ...globalData,
      page: {
        title: TITLE,
        description: globalData.messages.description,
        template: 'index',
        tags: [],
        lang: context.locale,
        id: 'index',
        slug: `/${context.locale}/`,
      },
      news: await getNews(context.locale),
      blogs: await GetBlogs(),
    },
  }
}
