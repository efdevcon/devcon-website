import { GetCategories, GetDIPs, GetFAQ, GetPage, GetPages, GetContentSection } from 'services/page'
import { getGlobalData } from 'services/global'
import markdownUtils from 'utils/markdown'
import dynamic from 'next/dynamic'
import getNews from 'services/news'
import { GetBlogs } from 'services/blogs'
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

export async function getStaticPaths({ locales }: any) {
  const pages = GetPages()

  return {
    paths: locales
      .filter((locale: string) => locale !== 'default')
      .map((locale: string) => {
        return pages.map(i => {
          return { params: { slug: i.slug.slice(1) /* Remove leading slash */ }, locale }
        })
      })
      .flat(),
    fallback: false,
  }
}

// Get context specific data (e.g. blog posts for the blog page)
export const getPageSpecificData = async (context: any) => {
  const slug = context.params.slug
  const page = await GetPage(slug, context.locale)

  if (!page) {
    return {
      contextData: null,
    }
  }

  switch (slug) {
    case 'dips': {
      return {
        contextData: {
          page,
          dips: await GetDIPs(context.locale),
        },
        revalidate: 1 * 60 * 30,
      }
    }

    case 'blog': {
      return {
        contextData: {
          page,
          blogs: await GetBlogs(),
        },
        revalidate: 1 * 60 * 30,
      }
    }

    case 'bogota': {
      const todoData = await GetContentSection('things-to-do', context.locale)
      const whyData = await GetContentSection('why-devcon-in-bogota', context.locale)

      const todo = {
        left: await markdownUtils.toHtml(todoData.data.left),
        right: await markdownUtils.toHtml(todoData.data.right),
      }

      const why = {
        title: whyData.data.title,
        left: await markdownUtils.toHtml(whyData.data.left),
        right: await markdownUtils.toHtml(whyData.data.right),
      }

      return {
        contextData: {
          page,
          faq: GetFAQ(context.locale),
          sections: {
            todo,
            why,
          },
        },
      }
    }

    case 'news': {
      return {
        contextData: {
          page,
          news: await getNews(context.locale),
        },
        revalidate: 1 * 60 * 60,
      }
    }

    case 'faq': {
      return {
        contextData: {
          page,
          faq: GetCategories(context.locale),
        },
      }
    }

    default:
      return {
        contextData: {
          page,
        },
      }
  }
}

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const { contextData, ...options } = await getPageSpecificData(context)

  return {
    notFound: contextData === null,
    props: {
      ...contextData,
      ...globalData,
    },
    ...options,
  }
}
