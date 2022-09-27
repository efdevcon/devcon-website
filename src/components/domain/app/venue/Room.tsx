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
import Image from 'next/image'
import { usePanzoom, PanzoomControls } from './Venue'
import venueCss from './venue.module.scss'
import { useAppContext } from 'context/app-context'
import { useAccountContext } from 'context/account-context'

import FloorBasement from 'assets/images/venue-map/venue-map-floor-basement.jpeg'
import Floor1 from 'assets/images/venue-map/venue-map-floor-1.jpeg'
import Floor2 from 'assets/images/venue-map/venue-map-floor-2.jpeg'
import Floor3 from 'assets/images/venue-map/venue-map-floor-3.jpeg'
import Floor4 from 'assets/images/venue-map/venue-map-floor-4.jpeg'
import Floor5 from 'assets/images/venue-map/venue-map-floor-5.jpeg'

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

  const getFloorImage = () => {
    if (props.room.info === '1st Floor') return <Image src={Floor1} alt={props.room.name} layout="raw" id="venue-image" priority />
    if (props.room.info === '2nd Floor') return <Image src={Floor2} alt={props.room.name} layout="raw" id="venue-image" priority />
    if (props.room.info === '3rd Floor') return <Image src={Floor3} alt={props.room.name} layout="raw" id="venue-image" priority />
    if (props.room.info === '4th Floor') return <Image src={Floor4} alt={props.room.name} layout="raw" id="venue-image" priority />
    if (props.room.info === '5th Floor') return <Image src={Floor5} alt={props.room.name} layout="raw" id="venue-image" priority />
    if (props.room.info === 'Basement') return <Image src={FloorBasement} alt={props.room.name} layout="raw" id="venue-image" priority />
  }

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
          {getFloorImage()}
        </div>
        <PanzoomControls pz={pz} />
      </div>

      <div className={`${filterCss['filter']} border-top`}>
        <div className="section clear-bottom-less">
          <Search placeholder="Search room sessions" onChange={setSearch} value={search} />
        </div>
      </div>

      <div className="section padding-top-less">
        {/* <AppSearch
            noResults={sessions.length === 0}
            search={{
              placeholder: 'Search room sessions...',
              onChange: setSearch,
            }}
            sortState={sortState}
            filterStates={[]}
            className={css['search-section']}
          /> */}

        <div className={css['background']}></div>

        {/* <Gallery className={css['gallery']}>
          <h1>{props.room.name}</h1>
          <h1>{props.room.name}</h1>
        </Gallery> */}

        <div className={css['room-info']}>
          <p className="h2 clear-bottom-less">{props.room.name}</p>
          {props.room.description && <p className="bold clear-bottom-less">{props.room.description}</p>}
          {props.room.capacity && (
            <div className="label">
              <CapacityIcon className={`icon ${css['capacity-icon']}`} />
              <p>Capacity - {props.room.capacity} </p>
              {/* <InfoIcon /> */}
            </div>
          )}
        </div>

        {/* {props.sessions
          .sort((a, b) => {
            return moment.utc(a.start).isBefore(moment.utc(b.start)) ? -1 : 1
          })
          .map(i => {
            return <SessionCard key={i.id} session={i} />
          })} */}

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
