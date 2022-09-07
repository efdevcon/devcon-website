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
import moment from 'moment'
import { AppNav } from 'components/domain/app/navigation'
import { Search, Tags, Basic, FilterFoldout } from 'components/common/filter/Filter'
import filterCss from 'components/domain/app/app-filter.module.scss'
import Image from 'next/image'
import Floor from 'assets/images/venue-map/venue-map-floor-1.jpeg'
import Panzoom from 'panzoom'

interface Props {
  room: RoomType
  sessions: Array<SessionType>
}

export const Room = (props: Props) => {
  const pastSessions = props.sessions.filter(i => moment(i.start) <= moment.utc())
  const upcomingSessions = props.sessions.filter(i => moment(i.start) >= moment.utc())
  const attendingSessions = props.sessions.slice(0, 1)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    const scene = document.getElementById('image-container')
    const panzoomInstance = Panzoom(scene, {
      bounds: true,
      boundsPadding: 0.8,
      beforeWheel: function (e) {
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        var shouldIgnore = !e.ctrlKey
        return shouldIgnore
      },
    })

    return () => {
      panzoomInstance.dispose()
    }
  }, [])

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: props.room.name,
            // to: '/app/schedule',
          },
        ]}
      />

      <div className={filterCss['filter']}>
        <div className="section clear-bottom-less">
          <Search placeholder="Search room sessions" onChange={setSearch} value={search} />
        </div>
      </div>

      <div className={css['panzoom']}>
        <div className={css['image']} id="image-container">
          <Image src={Floor} alt="Floor" objectFit="contain" layout="fill" />
        </div>
      </div>

      <div className="section">
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
          <p className="bold clear-bottom-less">{props.room.description}</p>
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
                  {upcomingSessions.length === 0 && <p>No sessions found</p>}
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
                  {attendingSessions.length === 0 && <p>No sessions found</p>}
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
                  {pastSessions.length === 0 && <p>No sessions found</p>}
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
