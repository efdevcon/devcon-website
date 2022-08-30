import React from 'react'
import css from './schedule.module.scss'
import { AppNav } from 'components/domain/app/navigation'
import { Search, Tags, Basic, FilterFoldout } from 'components/common/filter/Filter'
import { NoResults } from 'components/common/filter'
import Star from 'assets/icons/star.svg'
import StarFill from 'assets/icons/star-fill.svg'
import TileIcon from 'assets/icons/tiles.svg'
import ListIcon from 'assets/icons/list-simple.svg'
import { List } from './views/List'
import { Session } from 'types/Session'
import moment, { Moment } from 'moment'
import SwipeToScroll from 'components/common/swipe-to-scroll'
import FuzzySearch from 'fuzzy-search'

type Timeslot = {
  time: number
  sessions: Session[]
}

type Date = {
  readable: string
  moment?: Moment
}

export type ScheduleInformation = {
  sessionTimeslots: {
    [key: number]: Session[]
  }
  sessionsByTime: {
    date: Date
    timeslots: Timeslot[]
  }[]
  timeslotOrder: number[]
}

const normalizeDate = (moment: Moment) => {
  return moment.format('MMM Do')
}

const useFormatSessions = (sessions: Session[]) => {
  return React.useMemo(() => {
    return sessions.map(session => {
      const startTimeAsMoment = moment.utc(session.start)
      const endTimeAsMoment = startTimeAsMoment.clone().add(session.duration, 'minutes')

      return {
        ...session,
        startTimeAsMoment,
        endTimeAsMoment,
        day: startTimeAsMoment.format('dddd, MMM Do'),
        date: normalizeDate(startTimeAsMoment),
      }
    })
  }, [sessions])
}

const getSessionsByDatesAndTimeslots = (sessions: Session[], dates: Date[]) => {
  const sessionTimeslots = {} as ScheduleInformation['sessionTimeslots']
  const timeslotOrder = [] as ScheduleInformation['timeslotOrder']

  sessions.forEach(session => {
    if (!sessionTimeslots[session.start]) {
      timeslotOrder.push(session.start)
      sessionTimeslots[session.start] = []
    }

    sessionTimeslots[session.start].push(session)
  })

  const sessionsByTime = dates.map((date: Date) => {
    return {
      date,
      timeslots: timeslotOrder.reduce((acc, time) => {
        const startTime = moment.utc(time)

        if (startTime.isSame(date.moment, 'day')) {
          const sessionsInTimeslot = sessionTimeslots[time]

          acc.push({ time, sessions: sessionsInTimeslot })
        }

        return acc
      }, [] as Timeslot[]),
    }
  })

  return { sessionsByTime, sessionTimeslots, timeslotOrder, dates }
}

export const Schedule = ({ sessions: sessionsBeforeFormatting, tracks, event }: any) => {
  const [search, setSearch] = React.useState('')
  const [view, setView] = React.useState('list')
  const [basicFilter, setBasicFilter] = React.useState('all')
  const [selectedTracks, setSelectedTracks] = React.useState({} as any)
  const [dateFilter, setDateFilter] = React.useState<{ readable: string; moment?: Moment }>({ readable: 'all' })
  const eventDates = React.useMemo(() => {
    const dates = []
    const end = moment.utc(event.date_to).add(1, 'days')

    let current = moment.utc(event.date_from)

    while (!current.isSame(end)) {
      const next = current.clone()
      dates.push({ readable: normalizeDate(next), moment: next })
      current.add(1, 'days')
    }

    return dates
  }, [event])
  const [favoritesOnly, setFavoritesOnly] = React.useState(false)
  // Format sessions (memoized)
  const formattedSessions = useFormatSessions(sessionsBeforeFormatting)
  // Create search index
  const searcher = React.useMemo(
    () => new FuzzySearch(formattedSessions, ['title', 'speakers.name', 'description', 'room.name']),
    [formattedSessions]
  )
  // Apply search filter
  const sessionsMatchingSearch = search.length > 0 ? searcher.search(search) : formattedSessions
  // Apply remaining filters
  const filteredSessions = sessionsMatchingSearch.filter((session: Session) => {
    // Filter by tracks
    const tracks = Object.keys(selectedTracks)
    const thereAreTracksToFilterBy = tracks.length > 0

    if (thereAreTracksToFilterBy) {
      if (!selectedTracks[session.track]) return false
    }

    // Filter by day
    if (dateFilter.readable !== 'all') {
      const sessionIsSameDay = session.date === dateFilter.readable

      if (!sessionIsSameDay) return false
    }

    return true
  })

  const { sessionTimeslots, timeslotOrder, sessionsByTime } = getSessionsByDatesAndTimeslots(
    filteredSessions,
    eventDates
  )

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
        <Basic
          value={basicFilter}
          onChange={setBasicFilter}
          options={[
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
          ]}
        />
      </div>

      <div className={css['filter']}>
        <div className="section">
          <Search value={search} onChange={setSearch} />

          <div className={css['foldout']}>
            <FilterFoldout active={Object.keys(selectedTracks).length > 0}>
              {(open, setOpen) => {
                return (
                  <div className={css['foldout-content']}>
                    <div className={css['tracks']}>
                      <Tags
                        value={selectedTracks}
                        onChange={nextValue => {
                          const isAlreadySelected = selectedTracks[nextValue]

                          const nextState = {
                            ...selectedTracks,
                          }

                          if (isAlreadySelected) {
                            delete nextState[nextValue]
                          } else {
                            nextState[nextValue] = true
                          }

                          setSelectedTracks(nextState)
                        }}
                        options={tracks.map((i: string) => {
                          return {
                            text: i,
                            value: i,
                          }
                        })}
                      />
                    </div>

                    <div className={css['actions']}>
                      <button className={`app hover sm thin-borders`} onClick={() => setSelectedTracks({})}>
                        Reset
                      </button>

                      <button className={`app hover sm thin-borders`} onClick={() => setOpen(false)}>
                        Confirm
                      </button>
                    </div>
                  </div>
                )
              }}
            </FilterFoldout>

            <div className={css['right']}>
              <div>
                <p className="font-xs-fixed">Current Filter:</p>
                <p className={css['filter-indicator']}>
                  {(() => {
                    const trackFilters = Object.keys(selectedTracks)

                    if (trackFilters.length === 0) return 'All tracks'

                    return trackFilters.join(', ')
                  })()}
                </p>
              </div>
              <div className={css['end']}>
                <button
                  onClick={() => setView('list')}
                  className={`${view === 'list' ? 'hover' : ''} app squared sm thin-borders`}
                >
                  <ListIcon />
                </button>
                <button
                  onClick={() => setView('timeline')}
                  className={`${view === 'timeline' ? 'hover' : ''} app squared sm thin-borders`}
                >
                  <TileIcon />
                </button>
              </div>
            </div>
          </div>

          <div className={css['date-selector-container']}>
            <SwipeToScroll scrollIndicatorDirections={{ right: true }}>
              <ul className={css['date-selector']}>
                {[
                  { text: 'All', value: { readable: 'all' } },
                  ...eventDates.map(date => {
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
        </div>
      </div>

      <div className="section">
        {(() => {
          if (noResults) return <NoResults />

          return view === 'list' ? (
            <List sessionTimeslots={sessionTimeslots} timeslotOrder={timeslotOrder} sessionsByTime={sessionsByTime} />
          ) : (
            <p>Timeline view goes here</p>
          )
        })()}
      </div>
    </>
  )
}
