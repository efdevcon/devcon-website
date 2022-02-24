import React from 'react'
import IconCalendar from 'assets/icons/schedule-plus.svg'
import iconSecurity from 'assets/images/tracks/security.svg'
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

const Hero = (props: any) => {
  let className = css['hero']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {props.icon && (
        <div className={css['background-icon']}>
          <img src={props.icon} alt="track" />
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

  const duration = moment.duration(moment(props.session.end).diff(props.session.start))
  const mins = duration.asMinutes()

  return (
    <div>
      <Hero icon={iconSecurity} className={css['session-hero']}>
        <div className="section">
          <div className="content">
            <div className={css['container']}>
              <div className={css['info-line']}>
                <IconCalendar />
                <p>
                  {GetDevconDay(props.session.start)} - {moment.utc(props.session.start).format('MMM DD')} <br />
                  {moment.utc(props.session.start).format('HH:mm')} - {moment.utc(props.session.end).format('HH:mm')} <span style={{ marginLeft: '12px' }}> Mins</span>
                </p>
              </div>
              {props.session.room &&
                <div className={css['info-line']}>
                  <IconCalendar />
                  <p>{props.session.room.name}</p>
                </div>
              }
              {props.session.room?.capacity &&
                <div className={css['info-line']}>
                  <IconCalendar />
                  <p>{props.session.room.capacity}</p>
                </div>
              }

              <h2 className={css['title']}>
                {props.session.title}
              </h2>

              <div className={css['meta']}>
                <div className="label white bold">{props.session.track}</div>
                <p className="bold text-uppercase">BEGINNER (TODO)</p>
              </div>

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
            <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div>
            <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div>
            <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div>
            <div>
              <p>Mark as interesting</p> <IconCalendar />
            </div>
          </div>

          {props.session.speakers.length > 0 &&
            <div className={css['speakers']}>
              <h3 className={css['title']}>Speakers</h3>
              {props.session.speakers.map(i => {
                return <SpeakerCard key={i.id} speaker={i} />
              })}
            </div>
          }

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
