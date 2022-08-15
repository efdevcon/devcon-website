import React from 'react'
import { CSS3D } from './css-3d'
import { AppSearch } from 'components/domain/app/app-search'
import { useSort, SortVariation, Sort } from 'components/common/sort'
import { LinkList, Link } from 'components/common/link'
import { useFilter } from 'components/common/filter'
import css from './venue.module.scss'
import ListIcon from 'assets/icons/list.svg'
import LayersIcon from 'assets/icons/layers.svg'
import { Room } from 'types/Room'
import { AppNav } from 'components/domain/app/navigation'

interface Props {
  rooms: Array<Room>
  floors: Array<string>
}

export const Venue = (props: Props) => {
  const [listView, setListView] = React.useState()
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

      // dummySessions.filter(speaker => activeFilter[speaker.title])
      return []
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
    <>
      <AppNav />

      <CSS3D />

      <div className="section">
        <AppSearch
          noResults={sessions.length === 0}
          search={{
            placeholder: 'Search venue...',
            onChange: setSearch,
          }}
          actions={
            <>
              <button className={`app squared sm thin-borders`} onClick={console.log}>
                {/* {open ? <IconClose /> : <IconFilter />} */}
                <ListIcon />
              </button>
              <button className={`app squared sm thin-borders`} onClick={console.log}>
                {/* {open ? <IconClose /> : <IconFilter />} */}
                <LayersIcon />
              </button>
            </>
          }
        />
      </div>

      <div className="section">
        {props.floors.map(floor => {
          const roomsByFloor = props.rooms.filter(i => i.info === floor)

          return (
            <React.Fragment key={floor}>
              <div className={`list-item padded bold ${css['title']}`}>{floor}</div>
              <LinkList noIndicator>
                {roomsByFloor.map((room: Room) => {
                  return (
                    <Link key={room.id} to={`/app/venue/${room.id}`}>
                      {room.name}
                    </Link>
                  )
                })}
              </LinkList>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
