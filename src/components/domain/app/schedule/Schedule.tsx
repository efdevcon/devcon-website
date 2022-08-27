import React from 'react'
import css from './schedule.module.scss'
import { AppNav } from 'components/domain/app/navigation'
import { NoResults, useFilter, Filter } from 'components/common/filter'
import Star from 'assets/icons/star.svg'
import StarFill from 'assets/icons/star-fill.svg'
import { AppSearch } from 'components/domain/app/app-search'
import { List } from './views/List'
import { Session } from 'types/Session'
import moment, { Moment } from 'moment'
import SwipeToScroll from 'components/common/swipe-to-scroll'

export type ScheduleInformation = {
  sessions: Session[]
  sessionTimeslots: {
    [key: number]: Session[]
  }
  dates: {
    readable: string
    moment?: Moment
  }[]
  timeslotOrder: number[]
}

// Process sessions
// TODO: Move to backend? No need to do it in client, and we can pregenerate search index on the backend instead for efficient searching
const useScheduleInformation = (() => {
  const formatSessions = (sessions: Session[]) => {
    return sessions.map(session => {
      const startTimeAsMoment = moment.utc(session.start)
      const endTimeAsMoment = startTimeAsMoment.clone().add(session.duration, 'minutes')

      return {
        ...session,
        startTimeAsMoment,
        endTimeAsMoment,
        day: startTimeAsMoment.format('dddd, MMM Do'),
        date: startTimeAsMoment.format('MMM Do'),
      }
    })
  }

  const getSessionTimeslots = (sessions: Session[]) => {
    const sessionTimeslots = {} as ScheduleInformation['sessionTimeslots']
    const dates = [] as ScheduleInformation['dates']
    const timeslotOrder = [] as ScheduleInformation['timeslotOrder']

    sessions.forEach(session => {
      if (session.date && session.startTimeAsMoment && !dates.some(({ readable }) => session.date === readable)) {
        dates.push({ readable: session.date, moment: session.startTimeAsMoment })
      }

      if (!sessionTimeslots[session.start]) {
        timeslotOrder.push(session.start)
        sessionTimeslots[session.start] = []
      }

      sessionTimeslots[session.start].push(session)
    })

    const sessionsByTime = dates.map(date => {
      return {
        date,
        timeslots: timeslotOrder.reduce((acc, time) => {
          const startTime = moment.utc(time)

          if (startTime.isSame(date.moment, 'day')) {
            const sessionsInTimeslot = sessionTimeslots[time]

            acc.push({ time: time, sessions: sessionsInTimeslot })
          }

          return acc
        }, [] as any),
      }
    })

    return { sessionsByTime, sessionTimeslots, timeslotOrder, dates }
  }

  const useScheduleInformation = (sessions: Session[]): ScheduleInformation => {
    return React.useMemo(() => {
      const formattedSessions = formatSessions(sessions)
      const { dates, sessionTimeslots, timeslotOrder, sessionsByTime } = getSessionTimeslots(formattedSessions)

      return {
        sessions: formattedSessions,
        sessionTimeslots,
        dates,
        sessionsByTime,
        timeslotOrder,
      }
    }, [sessions])
  }

  return useScheduleInformation
})()

export const Schedule = ({ sessions: sessionsBeforeFormatting, speakers, tracks, rooms }: any) => {
  const scheduleInformation = useScheduleInformation(sessionsBeforeFormatting)
  const [dateFilter, setDateFilter] = React.useState<{ readable: string; moment?: Moment }>({ readable: 'all' })
  const [favoritesOnly, setFavoritesOnly] = React.useState(false)

  const [search, setSearch] = React.useState('')
  const [filteredByTracks, filterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: tracks.map((i: string) => {
      return {
        text: i,
        value: i,
      }
    }),
    filterFunction: (activeFilter: any) => {
      // TODO: Fusejs or minisearch?
      const sessionsAfterSearch = scheduleInformation.sessions

      return scheduleInformation.sessions.filter((session: Session) => {
        if (dateFilter.readable !== 'all') {
          console.log('filtering by date', session.date === dateFilter.readable)
          return session.date === dateFilter.readable
        }

        return true
      })
    },
  })

  const [filteredSessions, filterState2] = useFilter({
    basic: true,
    filters: [
      {
        text: 'All',
        value: 'all',
      },
      {
        text: 'Attending',
        value: 'attending',
      },
      {
        text: 'Past',
        value: 'past',
      },
      {
        text: 'Upcoming',
        value: 'upcoming',
      },
    ],
    filterFunction: (activeFilter: any) => {
      return filteredByTracks
    },
  })

  console.log(filteredByTracks.length, 'wtf')

  const noResults = filteredSessions.length === 0

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Agenda',
            to: '/app/schedule',
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

      <div className="section">
        <Filter {...filterState2} />
      </div>

      <AppSearch
        search={{
          placeholder: 'Search agenda',
          onChange: setSearch,
        }}
        filterStates={[{ title: 'Track', filterState }]}
      >
        <div className={css['date-selector-container']}>
          <SwipeToScroll scrollIndicatorDirections={{ right: true }}>
            <ul className={css['date-selector']}>
              {[
                { text: 'All', value: { readable: 'all' } },
                ...scheduleInformation.dates.map(date => {
                  return {
                    text: date.readable,
                    value: date,
                  }
                }),
              ].map(filter => {
                const selected = dateFilter.readable === filter.value.readable

                // TODO: clear up this stuff
                if (filter.value.readable === 'Invalid date') return null

                return (
                  <li
                    className={selected ? css['selected'] : undefined}
                    key={filter.value.readable}
                    onClick={() => setDateFilter(filter.value)}
                  >
                    {filter.text}
                  </li>
                )
              })}
            </ul>
          </SwipeToScroll>
        </div>
      </AppSearch>

      <div className="section">
        {noResults ? <NoResults /> : <List {...scheduleInformation} sessions={filteredSessions} />}
      </div>
    </>
  )
}

/*
  Simplify filtering in general; the abstractions are causing more bad than good
  
    Create standalone filter components:
      Foldout w. trigger
      Search

      const [search, setSearch] = React.useState()
      const [foldoutOpen, setFoldoutOpen] = React.useState()
      const [sort, setSort] = React.useState()
      const [day, setDay] = React.useState()
      

      <div className="app-filter">
        <Search />
        <FilterFoldout>
          <FilterTitle />
          <FilterTab />
        </FilterFoldout>
        <Button className="filter-button" />
      </div>

      <Filter>
      </Filter>
    
*/
