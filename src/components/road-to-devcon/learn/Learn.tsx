import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './learn.module.scss'

export const Learn = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent
        backgroundText={intl.formatMessage({ id: 'rtd_educational_resources' })}
        links={[
          { url: 'https://ethereum.org', title: 'Ethereum.org', icon: 'web' }
        ]}
        bottomLinks={[{ url: 'https://archive.devcon.org', title: 'Devcon Archive' }]}
      >
        <div className={css['container']}>
          Archive
        </div>
      </PageContent>
    </Page>
  )
})
