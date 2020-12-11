import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useIntl } from 'gatsby-plugin-intl'
import { Twitter } from './Twitter'

interface SEOProps {
  title?: string
  description?: string
  lang?: string
  canonicalUrl?: string
}

export function SEO(props: SEOProps) {
  const intl = useIntl()
  const location = useLocation()

  const titleTemplate = props.title
    ? `%s · ${intl.formatMessage({ id: 'title' })}`
    : intl.formatMessage({ id: 'title' })
  const title = props.title || intl.formatMessage({ id: 'title' })
  const description = props.description || intl.formatMessage({ id: 'description' })
  const lang = props.lang || intl.locale || intl.defaultLocale
  const canonical = props.canonicalUrl || ''

  const image = '/assets/images//seo.jpg'
  const siteUrl = location.origin
  const url = `${siteUrl}${location.pathname || '/'}`.replace(/\/$/, '')

  return (
    <>
      <Helmet title={title} titleTemplate={titleTemplate} htmlAttributes={{ lang: lang }}>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {url && <meta property="og:url" content={url} />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>

      <Twitter title={title} description={description} image={image} />
    </>
  )
}
