import React from 'react'
import IconClock from 'assets/icons/icon_clock.svg'
import IconStar from 'assets/icons/star.svg'
import IconStarFill from 'assets/icons/star-fill.svg'
import IconCalendarAdd from 'assets/icons/schedule-plus.svg'
import IconMarker from 'assets/icons/icon_marker.svg'
import IconPeople from 'assets/icons/icon_people.svg'
import { SpeakerCard } from 'components/domain/app/speakers'
import { SessionCard } from './SessionCard'
import css from './session.module.scss'
import IconCheck from 'assets/icons/check_circle.svg'
import { Session as SessionType } from 'types/Session'
import moment from 'moment'
import { GetDevconDay } from 'utils/formatting'
import Image from 'next/image'
import { useAccountContext } from 'context/account-context'
import { AppNav } from 'components/domain/app/navigation'
import IconCalendar from 'assets/icons/calendar.svg'
import { getTrackImage, getTrackID } from 'components/domain/index/track-list/TrackList'
import { CopyToClipboardLegacy } from 'components/common/share/Share'
import PinIcon from 'assets/icons/pin.svg'
import { Link } from 'components/common/link'
import AddToCalendar from 'components/domain/index/add-to-calendar/AddToCalendar'

const Hero = (props: any) => {
  let className = css['hero']
  const trackID = getTrackID(props.track)

  if (props.className) className += ` ${props.className}`
  if (trackID) className += ` ${css[trackID]}`

  return (
    <div className={className}>
      <div className={css['background-icon']}>{getTrackImage(trackID)}</div>
      {props.children}
    </div>
  )
}

type SessionProps = {
  session: SessionType
  relatedSessions?: SessionType[]
}

export const Session = (props: SessionProps) => {
  const { account, setSessionBookmark } = useAccountContext()
  const duration = moment.duration(moment(props.session.end).diff(props.session.start))
  const mins = duration.asMinutes()
  const interested = account?.appState?.sessions?.some(i => i.level === 'interested' && i.id === props.session.id)
  const attending = account?.appState?.sessions?.some(i => i.level === 'attending' && i.id === props.session.id)

  async function bookmarkSession(level: 'interested' | 'attending') {
    if (account && level === 'interested') {
      setSessionBookmark(account, props.session, level, !!interested)
    }
    if (account && level === 'attending') {
      setSessionBookmark(account, props.session, level, !!attending)
    }
  }

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: props.session.title || 'Session',
          },
        ]}
        renderRight={() => (
          <>
            {/* <Share /> */}

            <CopyToClipboardLegacy url={`https://devcon.org/app/schedule/${props.session.id}`} />

            {account && (
              <>
                {attending ? (
                  <IconCheck className="icon fill-red" onClick={() => bookmarkSession('attending')} />
                ) : (
                  <IconCalendarAdd onClick={() => bookmarkSession('attending')} />
                )}
              </>
            )}
          </>
        )}
      />

      <Hero track={props.session.track} className={css['session-hero']}>
        <div className="section">
          <div className={css['container']}>
            <div className={css['info-line']}>
              <IconClock />
              <p className="bold">
                {GetDevconDay(props.session.start)} - {moment.utc(props.session.start).format('MMM DD')},&nbsp;
                {moment.utc(props.session.start).format('HH:mm')} - {moment.utc(props.session.end).format('HH:mm')}{' '}
                <span style={{ marginLeft: '12px' }}> {mins} Mins</span>
              </p>
            </div>
            {props.session.room && (
              <div className={css['info-line']}>
                <IconMarker />
                <p>{props.session.room.name}</p>
              </div>
            )}
            {props.session.room?.capacity && (
              <div className={css['info-line']}>
                <IconPeople />
                <p>{props.session.room.capacity}</p>
              </div>
            )}

            <h2 className={css['title']}>{props.session.title}</h2>

            <div className={css['meta']}>
              <div className="label white bold">{props.session.track || 'No specific track'}</div>
            </div>

            {(props.session.expertise || props.session.type) && (
              <div className={`${css['expertise-and-type']} ${css['meta']}`}>
                {props.session.expertise && <p className="bold text-uppercase">{props.session.expertise}</p>}
                {props.session.type && <p className="bold text-uppercase">{props.session.type}</p>}
              </div>
            )}

            <div className={css['calendar-icon-in-circle']}>
              <IconCalendar />
            </div>
          </div>
        </div>
      </Hero>

      <div className="section">
        <div className={css['actions']}>
          {account && (
            <>
              <div onClick={() => bookmarkSession('interested')} className={css[interested ? 'active' : '']}>
                <p>Mark as interesting</p> {interested ? <IconStarFill /> : <IconStar />}
              </div>
              <div onClick={() => bookmarkSession('attending')} className={css[attending ? 'active' : '']}>
                <p>Attend Session</p> <> {attending ? <IconCheck /> : <IconCalendarAdd />}</>
              </div>
            </>
          )}
          <AddToCalendar
            event={{
              id: props.session.id,
              title: props.session.title,
              description: props.session.description,
              location: 'Agora Bogotá Convention Center',
              startDate: moment.utc(props.session.start),
              endDate: moment.utc(props.session.end),
            }}
          >
            <div style={{ cursor: 'pointer' }}>
              <p>Export to Calendar</p> <IconCalendar />
            </div>
          </AddToCalendar>

          <Link to={`/app/venue/${props.session.room?.id}`}>
            <p>Room Details</p> <PinIcon />
          </Link>
        </div>

        {props.session.speakers.length > 0 && (
          <div className={css['speakers']}>
            <h3 className="app-header clear-bottom-less">Speakers</h3>
            {props.session.speakers.map(i => {
              return <SpeakerCard key={i.id} speaker={i} />
            })}
          </div>
        )}

        <div className={css['description']}>
          <h3 className="app-header clear-bottom-less">Description</h3>
          <p>{props.session.description}</p>
        </div>

        {/* <div className={css['resources']}>
            <h3 className={css['title']}>Resources</h3>

            <div className={css['slides']}>
              <h4 className={css['subtitle']}>Presentation Slides</h4>
              <LinkList className={css['link-list']}>
                <Link to="https://drive.google.com">
                  <p>Access presentation Slides.</p>
                  <p className="bold">drive.google.com/file/d/1rGuCVLyMV-2T...</p>
                </Link>
              </LinkList>
            </div>

            <div className={css['suggested-reading']}>
              <h4 className={css['subtitle']}>Suggested Reading</h4>
              <LinkList className={css['link-list']}>
                <Link to="https://devcon.org">EF Ecosystem Support Program </Link>
                <Link to="https://devcon.org">Grantee Roundup: August 2021</Link>
                <Link to="https://devcon.org">Grantee Roundup: July 2021</Link>
              </LinkList>
            </div>
          </div> */}

        {/* <div className={css['livestream']}>
            <AppTabsSection
              title="Livestream"
              tabs={[
                {
                  title: 'Livepeer',
                  content: (
                    <ThumbnailBlock className={css['banner']}>
                      <div className={css['content']}>
                        <p className="font-xs-fixed">Waiting for scheduled livestream to begin.</p>
                        <p className="bold font-xs-fixed">Streaming in 24:20:12</p>
                        <p className={css['powered-by']}>Powered by Livepeer</p>
                      </div>
                    </ThumbnailBlock>
                  ),
                },
                {
                  title: 'Youtube',
                  content: <p>Youtube</p>,
                },
              ]}
            />
            <div>
              <h3 className={css['title']}>Livestream</h3>
              <Tabs>
                <Tab title="LivePeer">Livepeer</Tab>
                <Tab title="YouTube">YouTube</Tab>
              </Tabs>
            </div>
          </div> */}

        {props.relatedSessions && props.relatedSessions.length > 0 && (
          <div className={css['related-sessions']}>
            <h3 className={css['title']}>Related Sessions</h3>
            {props.relatedSessions.map(session => {
              return <SessionCard session={session} key={session.id} />
            })}
          </div>
        )}
      </div>
    </>
  )
}
