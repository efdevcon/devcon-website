import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetCategories, GetDIPs, GetFAQ, GetNews, GetPage, GetPages } from 'services/page'
import { lazy, Suspense } from 'react'
import { getMessages } from 'utils/intl'
import dynamic from 'next/dynamic'
const Blog = dynamic(() => import('components/domain/page-templates/blog'))
const Blogs = dynamic(() => import('components/domain/page-templates/blogs'))
const CityGuide = dynamic(() => import('components/domain/page-templates/city-guide'))
const Content = dynamic(() => import('components/domain/page-templates/content'))
const DIPs = dynamic(() => import('components/domain/page-templates/dips'))
const FAQ = dynamic(() => import('components/domain/page-templates/faq'))
const News = dynamic(() => import('components/domain/page-templates/news'))
const Search = dynamic(() => import('components/domain/page-templates/search'))

const Page = (props: any) => {
  switch (props.page.template) {
    case 'blog': {
      return <Blog {...props} />
    }

    case 'blogs': {
      return <Blogs {...props} />
    }

    case 'city-guide': {
      return <CityGuide {...props} />
    }

    case 'content': {
      return <Content {...props} />
    }

    case 'dips': {
      return <DIPs {...props} />
    }

    case 'faq': {
      return <FAQ {...props} />
    }

    case 'news': {
      return <News {...props} />
    }

    case 'search': {
      return <Search {...props} />
    }
  }
}

export default Page

// export default function Index(props: any) {
//   const isBrowser = typeof window !== 'undefined'
//   if (isBrowser) {
//     console.log('Importing', props.page.template)
//     const Component = lazy(() => import('components/domain/page-templates/' + props.page.template)) //  + props.page.template

//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Component {...props} />
//       </Suspense>
//     )
//   }

//   return <></>
// }

export async function getStaticPaths({ locales }: any) {
  const pages = GetPages()

  return {
    paths: [
      pages.map(i => {
        return { params: { slug: i.slug.slice(1) }, locale: 'en' }
      }),
      pages.map(i => {
        return { params: { slug: i.slug.slice(1) }, locale: 'es' }
      }),
    ].flat(),
    fallback: false,
  }
}

// Get data that *all* pages need
const getGlobalData = async (context: any) => {
  const intl = await getMessages(context.locale)

  return {
    messages: intl,
    navigationData: await GetNavigationData(context.locale),
    notification: GetLatestNotification(context.locale),
  }
}

// Get context specific data (e.g. blog posts for the blog page)
const getContextSpecificData = async (context: any) => {
  const slug = context.params.slug
  const page = GetPage(slug, context.locale)

  if (!page) {
    return null
  }

  switch (slug) {
    case 'dips': {
      return {
        page,
        dips: await GetDIPs(context.locale),
      }
    }

    case 'news': {
      return {
        page,
        news: GetNews(context.locale),
      }
    }

    case 'faq': {
      return {
        page,
        faq: GetCategories(context.locale),
      }
    }

    default:
      return {
        page,
      }
  }
}

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const contextData = await getContextSpecificData(context)

  return {
    notFound: contextData === null,
    props: {
      ...contextData,
      ...globalData,
    },
    revalidate: 1 * 60 * 30, // 30 minutes, in seconds
  }
}
