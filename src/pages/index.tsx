import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import { SEO } from 'src/components/common/seo'
import Default from 'src/components/layouts/default'

export default function Index() {
  const intl = useIntl()

  return (
    <Default>
      <SEO />

      <h2>{intl.formatMessage({ id: 'hello' })}</h2>
      <div>{intl.formatMessage({ id: 'description' })}</div>
    </Default>
  )
}
