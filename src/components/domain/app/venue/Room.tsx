import React from 'react'
import { AppTabsSection } from '../app-tabs-section'
import { SessionCard } from '../session'
import { NoResults } from 'components/common/filter'
import css from './room.module.scss'
import CapacityIcon from 'assets/icons/capacity.svg'
import { Session as SessionType } from 'types/Session'
import { Room as RoomType } from 'types/Room'
import moment from 'moment'
import { AppNav } from 'components/domain/app/navigation'
import { Search } from 'components/common/filter/Filter'
import filterCss from 'components/domain/app/app-filter.module.scss'
import { usePanzoom, PanzoomControls } from './Venue'
import venueCss from './venue.module.scss'
import { useAppContext } from 'context/app-context'
import { useAccountContext } from 'context/account-context'
import { getFloorImage } from './Floor'
import { RoomInfo } from './RoomInfo'

interface Props {
  room: RoomType
  sessions: Array<SessionType>
}

export const Room = (props: Props) => {
  const { now } = useAppContext()
  const { account } = useAccountContext()
  const sortedSessions = props.sessions.slice().sort((a, b) => {
    return moment.utc(a.start).isBefore(moment.utc(b.start)) ? -1 : 1
  })
  const pastSessions = sortedSessions.filter(i => !moment.utc(i.end).isAfter(now))
  const upcomingSessions = sortedSessions.filter(i => !moment.utc(i.start).isBefore(now))
  const bookmarkedSessions = account?.appState?.sessions
  const attendingSessions = sortedSessions.filter(i => bookmarkedSessions?.find(bookmark => bookmark.id === i.id))
  const [search, setSearch] = React.useState('')
  const pz = usePanzoom()

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: props.room.name,
          },
        ]}
      />

      <div className={venueCss['panzoom']}>
        <div className={venueCss['image']} id="image-container">
          {getFloorImage(props.room.info)}
        </div>
        <PanzoomControls pz={pz} />
      </div>

      <div className={`${filterCss['filter']} border-top`}>
        <div className="section clear-bottom-less">
          <Search placeholder="Search room sessions" onChange={setSearch} value={search} />
        </div>
      </div>

      <div className="section padding-top-less">
        <div className={css['background']}></div>

        <div className={css['room-info']}>
          <div className="h2 clear-bottom-less">
            <RoomInfo room={props.room} />
          </div>
          {props.room.info && <p className="h1 bold clear-bottom-less">{props.room.info}</p>}
          {props.room.capacity && (
            <div className="label">
              <CapacityIcon className={`icon ${css['capacity-icon']}`} />
              <p>Capacity - {props.room.capacity} </p>
              {/* <InfoIcon /> */}
            </div>
          )}
        </div>

        <AppTabsSection
          className={css['tabs']}
          title="Sessions"
          tabs={[
            {
              title: 'Upcoming',
              content: (
                <div>
                  {upcomingSessions.map(i => {
                    return <SessionCard key={i.id} session={i} />
                  })}
                  {upcomingSessions.length === 0 && <NoResults />}
                </div>
              ),
            },
            {
              title: 'Attending',
              content: (
                <div>
                  {attendingSessions.map(i => {
                    return <SessionCard key={i.id} session={i} />
                  })}
                  {attendingSessions.length === 0 && <NoResults />}
                </div>
              ),
            },
            {
              title: 'Past',
              content: (
                <div>
                  {pastSessions.length > 0 &&
                    pastSessions.map(i => {
                      return <SessionCard key={i.id} session={i} />
                    })}
                  {pastSessions.length === 0 && <NoResults />}
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
