import React from 'react'
import IconCalendar from 'src/assets/icons/schedule-plus.svg'
import iconSecurity from 'src/assets/images/tracks/security.svg'
import { SpeakerCard } from 'src/components/domain/app/speakers'
import { SessionCard } from './SessionCard'
import css from './session.module.scss'

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

export const Session = (props: any) => {
  return (
    <div>
      <Hero icon={iconSecurity} className={css['session-hero']}>
        <div className="section">
          <div className="content">
            <div className={css['container']}>
              <div className={css['info-line']}>
                <IconCalendar />
                <p>
                  Day 2 — Oct 22nd <br />
                  10:00-10:30 AM <span style={{ marginLeft: '12px' }}>30 Mins</span>
                </p>
              </div>
              <div className={css['info-line']}>
                <IconCalendar />
                <p>Flower Room </p>
              </div>
              <div className={css['info-line']}>
                <IconCalendar />
                <p>150</p>
              </div>

              <h2 className={css['title']}>
                Water We Doing: The Changing Tides of the Ethereum Foundation Grants Program
              </h2>

              <div className={css['meta']}>
                <div className="label white bold">SECURITY</div>
                <p className="bold text-uppercase">BEGINNER</p>
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
              Mark as interesting <IconCalendar />
            </div>
            <div>
              Mark as interesting <IconCalendar />
            </div>
            <div>
              Mark as interesting <IconCalendar />
            </div>
            <div>
              Mark as interesting <IconCalendar />
            </div>
          </div>

          <div className={css['speakers']}>
            <h3 className={css['title']}>Speakers</h3>
            <SpeakerCard
              speaker={{
                name: 'Vitalik Buterin',
                role: 'Researcher',
                company: 'Ethereum Foundation',
                tracks: ['One'],
              }}
            />
            <SpeakerCard
              speaker={{
                name: 'Vitalik Buterin',
                role: 'Researcher',
                company: 'Ethereum Foundation',
                tracks: ['One'],
              }}
            />
          </div>

          <div className={css['description']}>
            <h3 className={css['title']}>Description</h3>
            <p>
              Machine learning is being adopted more and more broadly in technology. Such success is largely due to a
              combination of algorithmic breakthroughs, computation resource improvements, and the access to a large
              amount of diverse training data. The collection of data can raise concerns about siloing, security, and
              user privacy.
            </p>
          </div>

          <div className={css['']}>
            <h3 className={css['title']}>Resources</h3>
            <h4 className={css['subtitle']}>Presentation Slides</h4>
            <h4 className={css['subtitle']}>Suggested reading</h4>
          </div>

          <div className={css['']}>
            <h3 className={css['title']}>Livestream</h3>
            <SessionCard />
          </div>

          <div className={css['']}>
            <h3 className={css['title']}>Related Sessions</h3>
            <SessionCard />
            <SessionCard />
          </div>
        </div>
      </div>
    </div>
  )
}
