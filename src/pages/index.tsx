import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'
import { BlogOverview } from 'src/components/blog-overview'

export default function Index() {
  const intl = useIntl()

  return (
    <Default>
      <SEO />

      <h2>{intl.formatMessage({ id: 'journey' })}</h2>
      <div>{intl.formatMessage({ id: 'description' })}</div>

      <BlogOverview />
    </Default>
  )
}
