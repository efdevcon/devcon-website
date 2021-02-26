import moment from 'moment'
import React from 'react'
import { Event as EventType } from 'src/types/Event'
import css from './events.module.scss'
import EventIcon from 'src/assets/icons/event_add.svg'

interface EventOverviewProps {
  data: Array<EventType>
}

export function EventOverview(props: EventOverviewProps) {

  const renderEventDate = (event: EventType) => {
    const start = moment(event.startDate);
    const end = moment(event.endDate);

    if (start.day() === end.day()) { 
      return start.format('MMM DD YYYY')
    }
    if (start.month() === end.month()) { 
      return `${start.format('MMM')} ${start.format('DD')}-${end.format('DD')} ${start.format('YYYY')}`
    }
    return `${start.format('MMM DD')}-${end.format('MMM DD')} ${end.format('YYYY')}`
  }

  const renderDomainName = (url: string) => { 
    return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
  }

  const downloadIcs = (event: EventType) => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN

BEGIN:VEVENT
UID:${event.id}
DTSTART;VALUE=DATE:${event.startDate}
DTEND;VALUE=DATE:${event.endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.title}
URL:${event.url}
LOCATION:${event.url}
END:VEVENT
END:VCALENDAR`

    const element = document.createElement("a");
    const file = new Blob([ics], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${event.title}.ics`;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className={css['events']}>
      {props.data.map((event: EventType) => {
        return (
          <div className={css['event']}>
            <a className={css['link']} href={event.url}>
              <div>
                <span className={css['day']}>{moment(event.startDate).format('DD')}</span>
                <span className={css['month']}>{moment(event.startDate).format('MMM')}</span>

                <a className={css['event-add']} href="#" onClick={() => downloadIcs(event)}>
                  <EventIcon />
                </a>
              </div>
              <div>
                <p className={css['date']}>{renderEventDate(event)}</p>
                <p className={css['title']}>{event.title}</p>

                <a className={css['url']} target={event.url}>{renderDomainName(event.url)}</a>
              </div>
              <div className={css['image-column']}>
                <img src={event.imageUrl} alt={event.title} />
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}
