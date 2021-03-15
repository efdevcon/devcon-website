import React, { useState } from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './contribute.module.scss'
import { Proposals } from 'src/components/dip-overview/proposals'
import { Dropdown } from 'src/components/common/dropdown'
import { Filter } from 'src/components/common/filter'

export const Contribute = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [filter, setFilter] = useState('')
  const filters = ['All', 'Draft', 'Accepted', 'Withdrawn', 'Rejected']

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent
        applyScrollLock
        backgroundText={intl.formatMessage({ id: 'rtd_improvement_proposals' })}
        links={[
          { url: 'https://github.com/efdevcon/DIPs', title: 'Github', icon: 'github' },
          { url: 'https://forum.devcon.org/', title: 'Forum', icon: 'forum' },
        ]}
        bottomLinks={[{ url: 'https://github.com/efdevcon/DIPs', title: 'DIPs' }]}
      >
        <div className={css['container']}>
          <div className={css['header']}>
            <h3 className="subsection-header">{intl.formatMessage({ id: 'dips_proposals' })}</h3>
            <div className={css['dropdown']}>
              <Dropdown onFilter={e => setFilter(e)} filters={filters} />
            </div>
            <div className={css['filter']}>
              <Filter onFilter={e => setFilter(e)} filters={filters} />
            </div>
          </div>
          <div className={css['content']}>
            <Proposals dips={props.dips} filter={filter} />
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
