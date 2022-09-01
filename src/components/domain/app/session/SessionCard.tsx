import React from 'react'
import css from './session-card.module.scss'
import IconClock from 'assets/icons/icon_clock.svg'
import IconCalendar from 'assets/icons/schedule-plus.svg'
import IconMarker from 'assets/icons/icon_marker.svg'
import IconPeople from 'assets/icons/icon_people.svg'
import IconSpeaker from 'assets/icons/icon_speaker.svg'
import IconCheck from 'assets/icons/check_circle.svg'
import { ThumbnailBlock } from 'components/common/thumbnail-block'
import { Session } from 'types/Session'
import { useAccountContext } from 'context/account-context'
import moment from 'moment'

type CardProps = {
  session: Session
  compact?: boolean
}

export const SessionCard = (props: CardProps) => {
  // TODO: personalization/bookmarks
  const { account, setSessionBookmark } = useAccountContext()
  const bookmarkedSessions = account?.appState?.sessions
  const bookmarkedSession = bookmarkedSessions?.find(bookmark => bookmark.id === props.session.id)
  const sessionIsBookmarked = !!bookmarkedSession

  // console.log(setSessionBookmark, 'set session bookmark')
  console.log(account, 'account')

  const iconProps = {
    className: `${css['save-session']} icon`,
    onClick: (e: React.SyntheticEvent) => {
      e.stopPropagation()

      if (account) {
        setSessionBookmark(account, props.session, 'attending', !!sessionIsBookmarked)
      }
    },
  }

  if (sessionIsBookmarked) {
    iconProps.className += ` ${css['saved']}`
  }

  let thumbnailClassName = css['thumbnail-container']

  if (props.compact) thumbnailClassName += ` ${css['compact']}`

  switch ('UX & Design' as string) {
    case 'Security':
      thumbnailClassName += ` ${css['security']}`

      break

    case 'UX & Design':
    default:
      thumbnailClassName += ` ${css['ux-design']}`
  }

  return (
    <ThumbnailBlock className={thumbnailClassName} thumbnailSubtext={props.session.track}>
      <div className={css['details']}>
        <div className={css['top']}>
          <p className={css['title']}>{props.session.title}</p>

          {/* <div className="label sm bold">{props.session.track}</div> */}

          {account && <> {sessionIsBookmarked ? <IconCheck {...iconProps} /> : <IconCalendar {...iconProps} />}</>}
        </div>

        <div className={css['bottom']}>
          {props.session.room && (
            <div className={css['room']}>
              <div className={css['room-title']}>
                <IconMarker />
                <p>{props.session.room.name}</p>
              </div>

              {props.session.room.capacity && (
                <div className={css['n-seats']}>
                  <IconPeople />
                  <p>{props.session.room.capacity}</p>
                </div>
              )}
            </div>
          )}

          <div className={css['time']}>
            <IconClock />
            <p>
              {(() => {
                const startTime = moment.utc(props.session.start)
                const endTime = startTime.clone().add(props.session.duration, 'minutes')

                return `${startTime.format('MMM Do')} — ${startTime.format('h:mm A')} - ${endTime.format('h:mm A')}`
              })()}
            </p>
          </div>

          {props.session.speakers.length > 0 && (
            <div className={css['speakers']}>
              <IconSpeaker />
              <p>
                {props.session.speakers
                  .map(i => {
                    return i.name
                  })
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </ThumbnailBlock>
  )
}
