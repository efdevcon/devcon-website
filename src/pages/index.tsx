import Default from 'components/common/layouts/default'
import { BlogReel } from 'components/domain/blog-overview'
import { News } from 'components/domain/news'
import { SEO } from 'components/domain/seo'
import { pageHOC } from 'context/pageHOC'

export default pageHOC(function Index({ data }: any) {
  return (
    <Default>
      <SEO />
      {/* <PWAPrompt /> */}
      {/* <News data={data.newsDataInline} /> */}
      <BlogReel />
      {/* <Notifications /> */}
    </Default>
  )
})

export async function getInitialProps(context: any) {
  const { req, query, res, asPath, pathname } = context;

  console.log('getInitialProps', context)
  if (req) {
    let host = req.headers.host // will give you localhost:3000
    console.log('')
  }
}

export async function getStaticProps(context: any) {
  console.log('getStaticProps', context)
  const { req, query, res, asPath, pathname } = context

  return {
    props: {
      messages: (await import(`../../content/i18n/${context.locale}.json`)).default
    }
  };
}