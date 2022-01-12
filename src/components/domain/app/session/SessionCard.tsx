import React from 'react'
import css from './session-card.module.scss'
import IconCalendar from 'src/assets/icons/schedule-plus.svg'
import IconCheck from 'src/assets/icons/check_circle.svg'
import trackIcon from './track-icon.png'
import { ThumbnailBlock } from 'src/components/common/thumbnail-block'
import { Session } from 'src/types/Session'
import { useAccountContext } from 'src/context/account-context'
import { Speaker } from 'src/types/Speaker'

type CardProps = {
  session: Session
  speakers: Speaker[]
}

export const SessionCard = (props: CardProps) => {
  const { account } = useAccountContext()
  const bookmarkedSessions = account?.appState?.bookmarkedSessions
  const speakers = props.speakers

  const [saved, setSaved] = React.useState(false) // comes from props later

  const iconProps = {
    className: `${css['save-session']} icon`,
    onClick: () => setSaved(!saved),
  }

  if (saved) {
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
          {/* <p className={css['title']}>Water We Doing: The Changing Tides of the Ethereum Foundation Grants Program</p> */}
          <p className={css['title']}>{props.session.title}</p>

          {saved ? <IconCheck {...iconProps} /> : <IconCalendar {...iconProps} />}

          <div className="label sm">
            {props.session.track} {/*UX & Design*/}
          </div>
        </div>
        <div className={css['bottom']}>
          <div className={css['time']}>
            <IconCalendar />
            <p>
              {props.session.start} {/*Oct 22nd — 10:00 AM*/}
            </p>
          </div>
          <div className={css['room']}>
            <IconCalendar />
            <p>{props.session.room}</p>
          </div>
          <div className={css['authors']}>
            <IconCalendar />
            <p>
              {props.session.speakers.map(sessionSpeaker => {
                return props.speakers.find((speaker: Speaker) => speaker.id === sessionSpeaker)?.name
              })}
            </p>
          </div>
          <div className={css['n-seats']}>
            <IconCalendar />
            <p>600</p>
          </div>
        </div>
      </div>
    </ThumbnailBlock>
  )
}

/*
    <div className={css['container']}>
      <div className={thumbnailClassName}>
        <img src={trackIcon} alt="track" />
      </div>
      <div className={css['details']}>
        <div className={css['top']}>
          <p className={css['title']}>Water We Doing: The Changing Tides of the Ethereum Foundation Grants Program</p>

          {saved ? <IconCheck {...iconProps} /> : <IconCalendar {...iconProps} />}

          <div className="label sm">UX & Design</div>
        </div>
        <div className={css['bottom']}>
          <div className={css['time']}>
            <IconCalendar />
            <p>Oct 22nd — 10:00 AM</p>
          </div>
          <div className={css['room']}>
            <IconCalendar />
            <p>Cloud Room — L1</p>
          </div>
          <div className={css['authors']}>
            <IconCalendar />
            <p>Luke Jacobsen, Lily Jacobsen, Luna Jacobsen</p>
          </div>
          <div className={css['n-seats']}>
            <IconCalendar />
            <p>600</p>
          </div>
        </div>
      </div>
    </div>
*/
