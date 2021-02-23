import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './participate.module.scss'

export const Participate = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent backgroundText={intl.formatMessage({ id: 'rtd_community_events' })}>
        <div className={css['container']}>
          Participate
        </div>
      </PageContent>
    </Page>
  )
})
