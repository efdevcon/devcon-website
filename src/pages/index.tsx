import { BlogReel } from 'components/domain/blog-overview'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { News } from 'components/domain/news'
import getNews from 'services/news'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import { Hero } from 'components/domain/index/hero'
import css from './index.module.scss'
import TrackList from 'components/domain/index/track-list'
import About from 'components/domain/index/about'
import CallsToAction from 'components/domain/index/ctas'
import Image from 'next/image'
import CircleBackground from 'assets/images/background-circles.png'
import { GetContentSections, GetTracks } from 'services/page'

export default pageHOC(function Index(props: any) {
  return (
    <div className={css['layout-default']}>
      <Header withStrip withHero />
      <Hero />

      <About content={props.sections['devcon-bogota']} />

      <CallsToAction speakerApplications={props.sections['cta-speaker-applications']} ticketPresale={props.sections['cta-ticket-presale']} />

      <News data={props.news} />

      <div className="clear-bottom border-bottom"></div>

      <div className={`${css['background-container']} section`}>
        <div className={`${css['circle-background']} expand`}>
          <Image src={CircleBackground} alt="Circles" />
        </div>
      </div>

      <TrackList tracks={props.tracks} />

      <BlogReel blogs={props.blogs} />

      <div className="clear-bottom"></div>

      <Footer />
    </div>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const sections = await GetContentSections(['devcon-bogota', 'cta-speaker-applications', 'cta-ticket-presale'], context.locale)
  const tracks = GetTracks(context.locale)

  return {
    props: {
      ...globalData,
      page: DEFAULT_APP_PAGE,
      news: await getNews(context.locale),
      blogs: await GetBlogs(),
      sections,
      tracks
    },
    revalidate: 1 * 60 * 30,
  }
}
