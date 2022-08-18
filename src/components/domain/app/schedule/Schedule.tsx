import React from 'react'
import css from './schedule.module.scss'
import { AppNav } from 'components/domain/app/navigation'
import { NoResults, useFilter } from 'components/common/filter'
import Star from 'assets/icons/star.svg'
import StarFill from 'assets/icons/star-fill.svg'
import { AppSearch } from 'components/domain/app/app-search'
import { List } from './views/List'

export const Schedule = ({ sessions, speakers, tracks, rooms }: any) => {
  const [attendingOnly, setAttendingOnly] = React.useState(false)
  const [favoritesOnly, setFavoritesOnly] = React.useState(false)
  // const trackFilters = tracks

  const [search, setSearch] = React.useState('')
  const [filteredSessions, filterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: tracks.map((i: string) => {
      return {
        text: i,
        value: i,
      }
    }),
    filterFunction: (activeFilter: any) => {
      return sessions
      // let filtered = props.speakers as SpeakerType[]
      // if (activeFilter && Object.keys(activeFilter).length > 0) {
      //   const filters = Object.keys(activeFilter)
      //   filtered = props.speakers.filter((i: any) =>
      //     i.tracks?.some((x: any) => filters.some(y => x === y) && activeFilter[x])
      //   )
      // }

      // if (sortState.sortBy === 0) {
      //   filtered =
      //     sortState.sortDirection === 'asc'
      //       ? filtered.sort((a: Speaker, b: Speaker) => a.name.localeCompare(b.name))
      //       : filtered.sort((a: Speaker, b: Speaker) => b.name.localeCompare(a.name))
      // }

      // if (search) {
      //   const filter = search.toLowerCase()
      //   filtered = filtered.filter(
      //     i =>
      //       i.name.toLowerCase().includes(filter) ||
      //       i.description?.toLowerCase().includes(filter) ||
      //       i.company?.toLowerCase().includes(filter) ||
      //       i.tracks?.some(x => x.toLowerCase().includes(filter))
      //   )
      // }

      // return filtered
    },
  })

  // const sortedBy = sortState.fields[sortState.sortBy]
  const noResults = speakers.length === 0

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Agenda',
            to: '/app/schedule',
            onClick: () => {
              setAttendingOnly(false)
            },
            useIsActive: (pathname: string) => {
              return pathname.includes('/app/schedule') && !attendingOnly
            },
          },
          {
            title: 'Attending',
            onClick: () => {
              setAttendingOnly(true)
            },
            useIsActive: () => {
              return attendingOnly
            },
          },
        ]}
        renderRight={() => {
          const starProps = {
            onClick: () => setFavoritesOnly(!favoritesOnly),
            style: {
              cursor: 'pointer',
            },
          }

          if (favoritesOnly) {
            return <StarFill {...starProps} />
          } else {
            return <Star {...starProps} />
          }
        }}
      />

      <AppSearch
        search={{
          placeholder: 'Search agenda',
          onChange: setSearch,
        }}
        // sortState={sortState}
        filterStates={[{ title: 'Track', filterState }]}
      />

      <div className="section">{noResults ? <NoResults /> : <List sessions={sessions} />}</div>
    </>
  )
}
