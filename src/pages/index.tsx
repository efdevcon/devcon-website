import { BlogReel } from 'components/domain/blog-overview'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { TITLE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { PWAPrompt } from 'components/domain/app/pwa-prompt'
import { News } from 'components/domain/news'
import getNews from 'services/news'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import { Hero } from 'components/domain/hero'
import css from './index.module.scss'

export default pageHOC(function Index(props: any) {
  return (
    <div className={css['layout-default']}>
      <Header withStrip withHero />
      <Hero />

      {/* <PWAPrompt /> */}

      <News data={props.news} />
      <BlogReel blogs={props.blogs} />
      <div className="clear-bottom"></div>

      {/* <Notifications /> */}

      <Footer />
    </div>
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
