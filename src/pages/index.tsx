import React from 'react'
import { HorizontalLayout, Page } from 'src/components/layouts/horizontal-layout'
import { Intro } from 'src/components/road-to-devcon/intro/Intro'
import { useIntl } from 'gatsby-plugin-intl'

export default () => {
  const intl = useIntl()

  return (
    <HorizontalLayout>
      <Intro title={intl.formatMessage({ id: 'rtd' })} />

      <Page title={intl.formatMessage({ id: 'rtd_get_informed' })}>
        <h1>Unstructured example - can render whatever we want in pages</h1>
        <div
          style={{ height: '500px', width: '500px', marginLeft: '150px', marginTop: '200px', background: 'pink' }}
        ></div>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_participate' })}>
        <h1>Page 3</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_contribute' })}>
        <h1>Page 4</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_learn' })}>
        <h1>Page 5</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_message_from_deva' })}>
        <h1>Page 6</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_invite' })}>
        <h1>Page 7</h1>
      </Page>
    </HorizontalLayout>
  )
}
