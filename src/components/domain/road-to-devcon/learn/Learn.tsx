import React, { useState } from 'react'
import { PageContent, Page } from 'src/components/common/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './learn.module.scss'
import { Filter, useFilter } from 'src/components/common/filter'
import { Dropdown } from 'src/components/common/dropdown'
import Loadable from '@loadable/component'

const ArchiveOverview = Loadable(() => import('src/components/domain/archive-overview'))

export const Learn = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [filteredVideos, filterState] = useFilter({
    filters: [
      {
        text: 'All',
        value: 'all',
      },
      {
        text: 'Ethos',
        value: 'ethos',
      },
      {
        text: 'Keynotes',
        value: 'keynotes',
      },
      {
        text: 'LATAM',
        value: 'latam',
      },
      {
        text: 'Research',
        value: 'research',
      },
    ],
    filterFunction: activeFilter => {
      return !activeFilter || activeFilter === 'all'
        ? props.videos
        : props.videos
            .filter(i => i.category?.toLowerCase() === activeFilter?.toLowerCase())
            .sort((a, b) => a.title.localeCompare(b.title))
    },
  })
  // const [filter, setFilter] = useState('')
  // const filters = ['All', 'Ethos', 'Keynotes', 'LATAM', 'Research']

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
            <Filter {...filterState} />
          </div>
          <div className={css['content']}>
            <ArchiveOverview videos={filteredVideos} />
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
