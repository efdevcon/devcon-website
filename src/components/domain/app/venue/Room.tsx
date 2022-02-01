import React from 'react'
import { AppTabsSection } from '../app-tabs-section'
import { SessionCard } from '../session'
import { AppSearch } from '../app-search'
import { useSort, SortVariation, Sort } from 'components/common/sort'
import { Filter, FilterFoldout, NoResults, useFilter } from 'components/common/filter'
import css from './room.module.scss'
import { Gallery } from 'components/common/gallery'
import CapacityIcon from 'assets/icons/capacity.svg'
import InfoIcon from 'assets/icons/info.svg'

const dummySessions = [
  { id: '1', title: 'Test session' },
  { id: '2', title: 'Test session 2' },
  { id: '3', title: 'Test session 3' },
]

export const Room = (props: any) => {
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
        title: 'Schedule',
        key: 'days',
        sort: SortVariation.basic,
      },
      {
        title: 'Tracks',
        key: 'tracks',
        sort: SortVariation.date,
      },
    ],
    false,
    'desc'
  )

  return (
    <div className="section">
      <div className="content">
        <AppSearch
          noResults={sessions.length === 0}
          search={{
            placeholder: 'Search room sessions...',
            onChange: setSearch,
          }}
          // sortState={sortState}
          // filterStates={[
          //   { title: 'Test', filterState },
          //   { title: 'Test', filterState },
          //   { title: 'Test', filterState },
          // ]}
          className={css['search-section']}
        />

        <Gallery className={css['gallery']}>
          <h1>Room</h1>
          <h1>Room</h1>
        </Gallery>

        <div className={css['room-info']}>
          <p className="bold">Floor.Room</p>
          <p className="h2">Flower Power</p>
          <div className="label">
            <CapacityIcon className={`icon ${css['capacity-icon']}`} />
            <p>Capacity - 150 </p>
            <InfoIcon />
          </div>
        </div>

        <AppTabsSection
          className={css['tabs']}
          title="Sessions"
          tabs={[
            {
              title: 'Past',
              content: (
                <div>
                  <SessionCard />
                  <SessionCard />
                  <SessionCard />
                </div>
              ),
            },
            {
              title: 'Attending',
              content: (
                <div>
                  <SessionCard />
                  <SessionCard />
                </div>
              ),
            },
            {
              title: 'Upcoming',
              content: (
                <div>
                  <SessionCard />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
