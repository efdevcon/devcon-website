import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import DefaultLayout from 'src/components/layouts/default'
import { SEO } from 'src/components/SEO/SEO'

export default function Index() {
  const intl = useIntl()

  return (
    <DefaultLayout>
      <SEO />

      <h2>{intl.formatMessage({ id: 'hello' })}</h2>
      <div>{intl.formatMessage({ id: 'description' })}</div>
    </DefaultLayout>
  )
}
