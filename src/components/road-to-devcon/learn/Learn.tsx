import React, { useState } from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './learn.module.scss'
import { Filter } from 'src/components/common/filter'
import { Dropdown } from 'src/components/common/dropdown'
import Loadable from "@loadable/component"

const ArchiveOverview = Loadable(() => import('src/components/archive-overview'))

export const Learn = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [filter, setFilter] = useState('')
  const filters = ['All', 'Ethos', 'Keynotes', 'LATAM', 'Research']

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent
        backgroundText={intl.formatMessage({ id: 'rtd_educational_resources' })}
        links={[{ url: 'https://ethereum.org', title: 'Ethereum.org', icon: 'web' }]}
        bottomLinks={[
          { url: 'https://archive.devcon.org', title: 'Devcon ' + intl.formatMessage({ id: 'rtd_archive' }) },
        ]}
      >
        <div className={css['container']}>
          <div className={css['header']}>
            <h3 className="subsection-header">{intl.formatMessage({ id: 'rtd_archive' })}</h3>
            <div className={css['dropdown']}>
              <Dropdown onFilter={e => setFilter(e)} filters={filters} />
            </div>
            <div className={css['filter']}>
              <Filter onFilter={e => setFilter(e)} filters={filters} />
            </div>
          </div>
          <div className={css['content']}>
            <ArchiveOverview videos={props.videos} filter={filter} />
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
