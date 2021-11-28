import React from 'react'
import { CSS3D } from './css-3d'
import { AppSearch } from 'src/components/domain/app/app-search'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import { LinkList, Link } from 'src/components/common/link'
import { useFilter } from 'src/components/common/filter'
import css from './venue.module.scss'
import { Button } from 'src/components/common/button'
import ListIcon from 'src/assets/icons/list.svg'
import LayersIcon from 'src/assets/icons/layers.svg'

const dummySessions = [
  { id: '1', title: 'Test session' },
  { id: '2', title: 'Test session 2' },
  { id: '3', title: 'Test session 3' },
]

const floors = [
  {
    id: '1',
    rooms: [
      { text: 'Room one', id: 'room-one' },
      { text: 'Room two', id: 'room-two' },
      { text: 'Room three', id: 'room-three' },
    ],
    name: 'F1',
  },
  {
    id: '2',
    rooms: [
      { text: 'Room one', id: 'room-one' },
      { text: 'Room two', id: 'room-two' },
      { text: 'Room three', id: 'room-three' },
    ],
    name: 'F2',
  },
  {
    id: '3',
    rooms: [
      { text: 'Room one', id: 'room-one' },
      { text: 'Room two', id: 'room-two' },
      { text: 'Room three', id: 'room-three' },
    ],
    name: 'F3',
  },
]

export const Venue = () => {
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
      if (!activeFilter || Object.keys(activeFilter).length === 0) return dummySessions

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
      </div>

      <CSS3D />

      <div className="section">
        <div className="content">
          {floors.map((floor: any) => {
            const { rooms, name } = floor

            return (
              <React.Fragment key={name}>
                <div className={`list-item padded bold ${css['title']}`}>{name}</div>
                <LinkList noIndicator>
                  {rooms.map((room: any) => {
                    const { text, id } = room

                    return (
                      <Link key={id} to={`/app/venue/${id}`}>
                        {text}
                      </Link>
                    )
                  })}
                </LinkList>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
