import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './contribute.module.scss'
import { Proposals } from 'src/components/dip-overview/proposals'

export const Contribute = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent
        backgroundText={intl.formatMessage({ id: 'rtd_improvement_proposals' })}
        links={[
          { url: 'https://github.com/efdevcon/DIPs', title: 'Github', icon: 'github' },
          { url: 'https://forum.devcon.org/', title: 'Forum', icon: 'forum' },
        ]}
        bottomLinks={[{ url: 'https://github.com/efdevcon/DIPs', title: 'DIPS' }]}
      >
        <div className={css['container']}>
          <Proposals dips={props.dips} />
        </div>
      </PageContent>
    </Page>
  )
})
