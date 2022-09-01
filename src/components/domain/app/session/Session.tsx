import React from 'react'
import IconClock from 'assets/icons/icon_clock.svg'
import IconStar from 'assets/icons/star.svg'
import IconStarFill from 'assets/icons/star-fill.svg'
import IconCalendar from 'assets/icons/schedule-plus.svg'
import IconMarker from 'assets/icons/icon_marker.svg'
import IconPeople from 'assets/icons/icon_people.svg'
import IconSecurity from 'assets/icons/icon_people.svg'
import { LinkList, Link } from 'components/common/link'
import { SpeakerCard } from 'components/domain/app/speakers'
import { SessionCard } from './SessionCard'
import css from './session.module.scss'
import { Tabs } from 'components/common/tabs'
import { Tab } from 'components/common/tabs/Tabs'
import { AppTabsSection } from 'components/domain/app/app-tabs-section'
import { ThumbnailBlock } from 'components/common/thumbnail-block'
import { Session as SessionType } from 'types/Session'
import moment from 'moment'
import { GetDevconDay } from 'utils/formatting'
import Image from 'next/image'
import { useAccountContext } from 'context/account-context'

const Hero = (props: any) => {
  let className = css['hero']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {props.icon && (
        <div className={css['background-icon']}>
          <IconSecurity />
        </div>
      )}
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

  async function bookmakSession(level: 'interested' | 'attending') {
    if (account && level === 'interested') {
      setSessionBookmark(account, props.session, level, !!interested)
    }
    if (account && level === 'attending') {
      setSessionBookmark(account, props.session, level, !!attending)
    }
  }

  return (
    <div>
      <Hero icon={IconSecurity} className={css['session-hero']}>
        <div className="section">
          <div className="content">
            <div className={css['container']}>
              <div className={css['info-line']}>
                <IconClock />
                <p>
                  {GetDevconDay(props.session.start)} - {moment.utc(props.session.start).format('MMM DD')} <br />
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

              {props.session.expertise && (
                <div className={css['meta']}>
                  <div className="label white bold">{props.session.track}</div>
                  <p className="bold text-uppercase">{props.session.expertise}</p>
                </div>
              )}

              {/* Update className - not sure what it does yet */}
              <div className={css['calendar-icon-in-circle']}>
                <IconCalendar />
              </div>
            </div>
          </div>
        </div>
      </Hero>

      <div className="section">
        <div className="content">
          <div className={css['actions']}>
            <div onClick={() => bookmakSession('interested')} className={css[interested ? 'active' : '']}>
              <p>Mark as interesting</p> {interested ? <IconStarFill /> : <IconStar />}
            </div>
            <div onClick={() => bookmakSession('attending')} className={css[attending ? 'active' : '']}>
              <p>Attend Session</p> <IconCalendar />
            </div>
            {/* <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div>
            <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div> */}
          </div>

          {props.session.speakers.length > 0 && (
            <div className={css['speakers']}>
              <h3 className={css['title']}>Speakers</h3>
              {props.session.speakers.map(i => {
                return <SpeakerCard key={i.id} speaker={i} />
              })}
            </div>
          )}

          <div className={css['description']}>
            <h3 className={css['title']}>Description</h3>
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
      </div>
    </div>
  )
}
