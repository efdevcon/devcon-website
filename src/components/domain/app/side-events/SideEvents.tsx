import React from 'react'
import css from './side-events.module.scss'
import { Link, LinkList } from 'components/common/link'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'components/common/collapsed-section'
import { AppSearch } from 'components/domain/app/app-search'
import { useSort, SortVariation } from 'components/common/sort'
import { useFilter } from 'components/common/filter'
import { SessionCard } from 'components/domain/app/session'
import logo from 'assets/images/test-asset.svg'
import Image from 'next/image'
import imageBogota from 'assets/images/bogota-city.png'

const dummySessions = [
  { id: '1', title: 'Test session' },
  { id: '2', title: 'Test session 2' },
  { id: '3', title: 'Test session 3' },
]

export const SideEvents = (props: any) => {
  console.log(props.sessions, 'sessions')
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
        <div className={`${css['hero']}`}>
          <div className={`${css['hero-content']}`}>
            <div className={css['image-container']}>
              <Image src={imageBogota} objectFit='cover' alt={'Devcon Side event'} />
            </div>

            <div className={`${css['details']}`}>
              <div>
                <Image src={logo} alt="Title" />

                <div className={css['title']}>
                  <h2 className="bold font-primary font-xxl">Devcon Bogota</h2>
                  <h2 className="font-primary font-xxl">Side Events</h2>
                </div>
              </div>

              <p className="font-sm">
                <b>Note:</b> These events are not organized or endorsed by Devcon in any capacity beyond listings and
                schedule integration for ease of access.
              </p>
            </div>
          </div>
        </div>

        <div className={css['curator']}>
          <div className={css['title']}>
            <p className="bold">Curated by:</p>
            <h3 className="bold">OFFDevcon</h3>
          </div>
          <div className={`${css['submit-event']} label neutral bold`}>Submit Event</div>
        </div>

        <CollapsedSection>
          <CollapsedSectionHeader title="Additional Resources" />
          <CollapsedSectionContent>
            <LinkList>
              <Link to="https://devcon.org">EF Ecosystem Support Program</Link>
              <Link to="https://devcon.org">Grantee Roundup August 2021</Link>
              <Link to="https://devcon.org">Grantee Roundup July 2021</Link>
            </LinkList>
          </CollapsedSectionContent>
        </CollapsedSection>

        <AppSearch
          noResults={sessions.length === 0}
          search={{
            placeholder: 'Search side events...',
            onChange: setSearch,
          }}
          sortState={sortState}
          filterStates={[
            { title: 'Test', filterState },
            { title: 'Test', filterState },
            { title: 'Test', filterState },
          ]}
          className={css['search-section']}
        />

        {/* <h4 className={`app-header ${css['header']}`}>Side Events</h4> */}

        {sessions.map(session => {
          return <SessionCard session={props.sessions[0]} speakers={props.speakers} key={session.id} />
        })}
      </div>
    </div>
  )
}
