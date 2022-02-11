import React from 'react'
import { SEO } from 'components/domain/seo'
import Content from 'components/common/layouts/content'
import { DIP } from 'components/domain/dips/dip'
import themes from 'components/domain/page-templates/assets/themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { GetDIPs } from 'services/page'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'

export default pageHOC(function DIPTemplate(props: any) {
  return (
    <Content theme={themes['teal']}>
      <SEO title={props.dip.title} />

      <DIP dip={props.dip} />
    </Content>
  )
})

export async function getStaticPaths() {
    const dips = GetDIPs()
    return {
        paths: dips.map(i => {
            return { params: { slug: i.slug } }
        }),
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const dip = GetDIPs(context.locale).find(i => i.slug.toLowerCase() === context.params.slug.toLowerCase())
    if (!dip) {
        return {
            props: null,
            notFound: true,
        }
    }

    const intl = (await import(`../../../content/i18n/${context.locale}.json`)).default
    return {
        props: {
            messages: intl,
            navigationData: await GetNavigationData(context.locale),
            notification: GetLatestNotification(context.locale),
            page: {
                lang: context.locale,
                id: dip.slug,
                slug: dip.slug,
                title: dip.title,
                description: dip.summary
            },
            dip
        }
    }
}