import React from 'react'
import { AppTabsSection } from '../app-tabs-section'
import { SessionCard } from '../session'
import { AppSearch } from '../app-search'
import { useSort, SortVariation } from 'components/common/sort'
import { useFilter } from 'components/common/filter'
import css from './room.module.scss'
import { Gallery } from 'components/common/gallery'
import CapacityIcon from 'assets/icons/capacity.svg'
import InfoIcon from 'assets/icons/info.svg'
import { Session as SessionType } from 'types/Session'
import { Room as RoomType } from 'types/Room'

interface Props {
  room: RoomType
  upcomingSessions: Array<SessionType>
}

export const Room = (props: Props) => {
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
      // if (!activeFilter || Object.keys(activeFilter).length === 0) return dummySessions

      // console.log(activeFilter, 'active filter')

      // return dummySessions.filter(speaker => activeFilter[speaker.title])
      return props.upcomingSessions
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
          <h1>{props.room.name}</h1>
          <h1>{props.room.name}</h1>
        </Gallery>

        <div className={css['room-info']}>
          <p className="bold">{props.room.description}</p>
          <p className="h2">{props.room.name}</p>
          {props.room.capacity &&
            <div className="label">
              <CapacityIcon className={`icon ${css['capacity-icon']}`} />
              <p>Capacity - {props.room.capacity} </p>
              <InfoIcon />
            </div>
          }
        </div>

        <AppTabsSection
          className={css['tabs']}
          title="Sessions"
          tabs={[
            {
              title: 'Past',
              content: (
                <div>
                  {props.upcomingSessions.map((i) => {
                    return <SessionCard key={i.id} session={i} />
                  })}
                </div>
              ),
            },
            {
              title: 'Attending',
              content: (
                <div>
                  {props.upcomingSessions.map((i) => {
                    return <SessionCard key={i.id} session={i} />
                  })}
                </div>
              ),
            },
            {
              title: 'Upcoming',
              content: (
                <div>
                  {props.upcomingSessions.map((i) => {
                    return <SessionCard key={i.id} session={i} />
                  })}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
