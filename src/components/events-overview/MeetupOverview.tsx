import React from 'react'
import { Meetup } from 'src/types/Meetup'
import css from './events.module.scss'

interface MeetupOverviewProps {
  data: Array<Meetup>
}

export function MeetupOverview(props: MeetupOverviewProps) {
  const renderDomainName = (url: string) => {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]
  }

  return (
    <div className={css['events']}>
      {props.data.map((event: Meetup) => {
        return (
          <div key={event.id} className={css['event']}>
            <div>
              <a href={event.url} target="_blank" rel="oopener noreferrer">
                <p className={css['date']}>{event.location}</p>
                <p className={css['title']}>{event.title}</p>

                <span className={css['url']}>{renderDomainName(event.url)}</span>
              </a>
            </div>
            <div>
              <a href={event.url} target="_blank" rel="oopener noreferrer">
                <div className={css['image-column']}>
                  <img src={event.imageUrl} alt={event.title} />
                </div>
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
