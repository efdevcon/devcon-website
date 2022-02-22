import React from 'react'
import css from './session-card.module.scss'
import IconCalendar from 'assets/icons/schedule-plus.svg'
import IconCheck from 'assets/icons/check_circle.svg'
import { ThumbnailBlock } from 'components/common/thumbnail-block'
import { Session } from 'types/Session'
import { useAccountContext } from 'context/account-context'
import moment from 'moment'

type CardProps = {
  session: Session
}

export const SessionCard = (props: CardProps) => {
  const { account, setSessionBookmark } = useAccountContext()
  const bookmarkedSessions = account?.appState?.bookmarkedSessions
  const sessionIsBookmarked = bookmarkedSessions?.[props.session.id]

  const iconProps = {
    className: `${css['save-session']} icon`,
    onClick: () => setSessionBookmark(props.session, 'attending', !!sessionIsBookmarked),
  }

  if (sessionIsBookmarked) {
    iconProps.className += ` ${css['saved']}`
  }

  let thumbnailClassName = css['thumbnail-container']

  switch ('UX & Design' as string) {
    case 'Security':
      thumbnailClassName += ` ${css['security']}`

      break

    case 'UX & Design':
    default:
      thumbnailClassName += ` ${css['ux-design']}`
  }

  return (
    <ThumbnailBlock className={thumbnailClassName}>
      <div className={css['details']}>
        <div className={css['top']}>
          <p className={css['title']}>{props.session.title}</p>

          {sessionIsBookmarked ? <IconCheck {...iconProps} /> : <IconCalendar {...iconProps} />}

          <div className="label sm">
            {props.session.track}
          </div>
        </div>
        <div className={css['bottom']}>
          <div className={css['time']}>
            <IconCalendar />
            <p>
              {moment.utc(props.session.start).format('MMM DD - HH:mm a')} {/*Oct 22nd — 10:00 AM*/}
            </p>
          </div>
          <div className={css['room']}>
            <IconCalendar />
            <p>{props.session.room}</p>
          </div>
          <div className={css['authors']}>
            <IconCalendar />
            <p>
              {props.session.speakers.map(i => {
                return i.name
              })}
            </p>
          </div>
          <div className={css['n-seats']}>
            <IconCalendar />
            <p>600 (TODO)</p>
          </div>
        </div>
      </div>
    </ThumbnailBlock>
  )
}
