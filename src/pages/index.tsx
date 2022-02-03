import Parser from 'rss-parser'
import Default from 'components/common/layouts/default'
import { PWAPrompt } from 'components/domain/app/pwa-prompt'
import { BlogReel } from 'components/domain/blog-overview'
import { News } from 'components/domain/news'
import { SEO } from 'components/domain/seo'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'

export default pageHOC(function Index(props: any) {
  return (
    <Default>
      <SEO />
      {/* <PWAPrompt /> */}
      {/* <News data={data.newsDataInline} /> */}
      <BlogReel blogs={props.blogs} />
      {/* <Notifications /> */}
    </Default>
  )
})

export async function getStaticProps(context: any) {
  console.log('getStaticProps', context)

  // Get Navigation / Page data
  // Get News
  // Get Notifications
  const parser: Parser = new Parser({
    customFields: {
      item: ['efblog:image', 'description'],
    },
  })

  return {
    props: {
      messages: (await import(`../../content/i18n/${context.locale}.json`)).default,
      blogs: await GetBlogs()
    }
  };
}