import React from 'react'
import css from './session-card.module.scss'
import IconCalendar from 'src/assets/icons/schedule-plus.svg'
import IconCheck from 'src/assets/icons/check_circle.svg'
import trackIcon from './track-icon.png'

export const SessionCard = (props: any) => {
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
  )
}
