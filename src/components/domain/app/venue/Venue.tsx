import React from 'react'
import { CSS3D } from './css-3d'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'src/components/common/collapsed-section'
import { AppSearch } from 'src/components/domain/app/app-search'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import { useFilter } from 'src/components/common/filter'

const dummySessions = [
  { id: '1', title: 'Test session' },
  { id: '2', title: 'Test session 2' },
  { id: '3', title: 'Test session 3' },
]

export const Venue = () => {
  const [search, setSearch] = React.useState('')
  const trackFilters = ['Test session', 'Test session 2', 'Test session 3']
  const [sessions, filterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: trackFilters.map(i => {
      return {
        text: i.toString(),
        value: i.toString(),
      }
    }),
    filterFunction: (activeFilter: any) => {
      if (!activeFilter || Object.keys(activeFilter).length === 0) return dummySessions

      console.log(activeFilter, 'active filter')

      return dummySessions.filter(speaker => activeFilter[speaker.title])
    },
  })

  const sortState = useSort(
    [],
    [
      {
        title: 'Alphabetical',
        key: 'name',
        sort: SortVariation.basic,
      },
      {
        title: 'Floor',
        key: 'days',
        sort: SortVariation.basic,
      },
      {
        title: 'Purpose',
        key: 'tracks',
        sort: SortVariation.date,
      },
    ],
    false,
    'desc'
  )

  return (
    <div>
      <div className="section">
        <div className="content">
          <AppSearch
            noResults={sessions.length === 0}
            search={{
              placeholder: 'Search venue...',
              onChange: setSearch,
            }}
            sortState={sortState}
            filterStates={[
              { title: 'Test', filterState },
              { title: 'Test', filterState },
              { title: 'Test', filterState },
            ]}
          />
        </div>
      </div>
      <CSS3D />
    </div>
  )
}
