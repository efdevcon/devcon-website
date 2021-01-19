import { useIntl } from 'gatsby-plugin-intl'
import React from 'react'

export default function Index() {
  const intl = useIntl()

  return (
    <div>
      <h1>{intl.formatMessage({ id: 'notfound_title' })}</h1>
      <p>{intl.formatMessage({ id: 'notfound_description' })}</p>
    </div>
  )
}
