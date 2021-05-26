import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useIntl } from 'gatsby-plugin-intl'
import { Twitter } from './Twitter'
import { TITLE } from 'src/utils/constants'
import { usePageContext } from 'src/context/page-context'

interface SEOProps {
  title?: string
  description?: string
  lang?: string
  canonicalUrl?: string
}

export function SEO(props: SEOProps) {
  const intl = useIntl()
  const location = useLocation()
  const pageContext = usePageContext();

  // props > pageContext > default values
  let title = TITLE
  if (pageContext?.current?.title) { 
    title = pageContext?.current.title
  }
  if (props.title) {
    title = props.title
  }

  let description = intl.formatMessage({ id: 'rtd_intro' })
  if (pageContext?.current?.description) { 
    description = pageContext?.current?.description
  }
  if (props.description) {
    description = props.description
  }

  let lang = intl.locale || intl.defaultLocale
  if (pageContext?.current?.lang) { 
    lang = pageContext?.current.lang
  }
  if (props.lang) {
    lang = props.lang
  }

  const titleTemplate = (props.title || pageContext?.current?.title) ? `%s · ${TITLE}` : TITLE
  const canonical = props.canonicalUrl || ''

  const image = 'https://www.devcon.org/assets/images/rtd-social.png'

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
