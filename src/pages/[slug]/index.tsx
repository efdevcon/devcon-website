import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetCategories, GetDIPs, GetFAQ, GetNews, GetPage, GetPages } from 'services/page'
import { lazy, Suspense } from 'react'

export default pageHOC(function Index(props: any) {
    const isBrowser = typeof window !== 'undefined'
    if (isBrowser) {
        console.log('Importing', props.page.template)
        const Component = lazy(() => import('components/domain/page-templates/' + props.page.template)) //  + props.page.template

        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }

    return <></>
})

export async function getStaticPaths() {
    const pages = GetPages()

    return {
        paths: pages.map(i => {
            return { params: { slug: i.slug } }
        }),
        fallback: false
    }
}


export async function getStaticProps(context: any) {
    const page = GetPage(context.params.slug, context.locale)
    const dips = GetDIPs(context.locale)
    const news = GetNews(context.locale)
    const faq = GetCategories(context.locale)

    if (!page) {
        return {
            props: null,
            notFound: true,
        }
    }

    const intl = (await import(`../../../content/i18n/${context.locale}.json`)).default
    return {
        props: {
            messages: intl,
            blogs: await GetBlogs(),
            navigationData: await GetNavigationData(context.locale),
            notification: GetLatestNotification(context.locale),
            page,
            dips,
            news,
            faq
        }
    }
}