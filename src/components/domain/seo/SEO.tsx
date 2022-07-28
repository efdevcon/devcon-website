import React from 'react'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { Twitter } from './Twitter'
import { PWA } from './PWA'
import { SITE_URL } from 'utils/constants'
import { usePageContext } from 'context/page-context'

interface SEOProps {
  title?: string
  description?: string
  imageUrl?: string
  lang?: string
  canonicalUrl?: string
  type?: string
  author?: {
    name?: string
    url?: string
  }
}

export function SEO(props: SEOProps) {
  const router = useRouter()
  const intl = useTranslations()
  const pageContext = usePageContext()
  let title = `${intl('global_title')}`

  if (pageContext?.current?.title && pageContext?.current?.title !== title) {
    title = `${pageContext?.current.title} — ${title}`
  } else if (props.title) {
    title = `${props.title} — ${title}`
  }

  let description = intl('global_description')

  if (props.description) {
    description = props.description
  }

  let lang = router.locale || router.defaultLocale
  if (pageContext?.current?.lang) {
    lang = pageContext?.current.lang
  }
  if (props.lang) {
    lang = props.lang
  }

  const globalTitle = intl('global_title')
  const canonical = props.canonicalUrl || ''

  let image = 'https://www.devcon.org/assets/images/og-graph.png'
  if (props.imageUrl) {
    image = props.imageUrl
  }

  const siteUrl = SITE_URL
  const url = `${siteUrl}${router.pathname || '/'}`.replace(/\/$/, '')

  return (
    <>
      <Head>
        {/* title={title} titleTemplate={titleTemplate} htmlAttributes={{ lang: lang }}> */}

        {title && <title>{title}</title>}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {globalTitle !== title && <meta property="og:site_name" content={globalTitle} />}
        <meta property="og:type" content={props.type ?? 'website'} />
        {url && <meta property="og:url" content={url} />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {props.author?.name && <link itemProp="name" href={props.author?.name} />}
        {props.author?.url && <link itemProp="url" href={props.author.url} />}

        {props.author?.name ||
          (props.author?.url && (
            <span itemProp="author" itemScope itemType="http://schema.org/Person">
              {props.author?.name && <link itemProp="name" href={props.author?.name} />}
              {props.author?.url && <link itemProp="url" href={props.author.url} />}
            </span>
          ))}
        <Twitter title={title} description={description} image={image} />
        <PWA />
      </Head>
    </>
  )
}
