import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import DefaultLayout from 'src/components/layouts/default'
import { SEO } from 'src/components/SEO/SEO'

export default function Index() {
  const intl = useIntl()

  return (
    <DefaultLayout>
      <SEO />

      <p>{intl.formatMessage({ id: 'hello' })}</p>
    </DefaultLayout>
  )
}
