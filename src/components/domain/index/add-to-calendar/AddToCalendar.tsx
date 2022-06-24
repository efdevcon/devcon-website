import React from 'react'
import { Button } from 'components/common/button'
import css from './add-to-calendar.module.scss'
import { useTranslations } from 'next-intl'
import { Modal } from 'components/common/modal'
import { Link } from 'components/common/link'
import AddToCalendarIcon from 'assets/icons/calendar.svg';

// const EventLinks = (props: any) => {
//   const [calendarModalOpen, setCalendarModalOpen] = React.useState(false)

//   const enableAddToCalendar = description !== null



//   const ics = [`BEGIN:VCALENDAR`, `PRODID:devconnect.org`, `METHOD:PUBLISH`, `VERSION:2.0`, `CALSCALE:GREGORIAN`]

//   if (isMultiDayEvent) {
//     // Have to add a day for multi-day events since the final day is not included in the range
//     // (if not, it will make a boundary at exactly midnight on the previous day since the dates default to 00:00 when no time is specified)
//     end.add(1, 'days')

//     googleCalUrl.searchParams.append('dates', `${start.format('YYYYMMDD')}/${end.format('YYYYMMDD')}`)

//     ics.push(
//       `BEGIN:VEVENT`,
//       `UID:${event.Name}`,
//       `DTSTAMP:${moment.utc().format('YYYYMMDDTHHmmss')}`,
//       `DTSTART:${start.format('YYYYMMDD')}`,
//       `DTEND:${end.format('YYYYMMDD')}`,
//       `SUMMARY:${event.Name}`,
//       `DESCRIPTION:${description}`,
//       event.Location.url && `URL;VALUE=URI:${event.Location.url}`,
//       event.Location.url && `LOCATION:${event.Location.text}`,
//       `END:VEVENT`
//     )
//   } else {
//     googleCalUrl.searchParams.append(
//       'dates',
//       `${start.format('YYYYMMDD')}T${startOfFirstDay}/${end.format('YYYYMMDD')}T${endOfLastDay}`
//     )

//     ics.push(
//       `BEGIN:VEVENT`,
//       `UID:${event.Name}`,
//       `DTSTAMP:${moment.utc().format('YYYYMMDDTHHmmss')}`,
//       `DTSTART:${start.format('YYYYMMDD')}T${startOfFirstDay}`,
//       `DTEND:${end.format('YYYYMMDD')}T${endOfLastDay}`,
//       `SUMMARY:${event.Name}`,
//       `DESCRIPTION:${description}`,
//       event.Location.url && `URL;VALUE=URI:${event.Location.url}`,
//       event.Location.url && `LOCATION:${event.Location.text}`,
//       `END:VEVENT`
//     )
//   }

//   ics.push(`END:VCALENDAR`)

//   const file = new Blob([ics.filter((row: string) => !!row).join('\n')], { type: 'text/calendar' })
//   const icsAttributes = {
//     href: URL.createObjectURL(file),
//     download: `${event.Name}.ics`,
//   }

//   return (
//     <div className={`${css['event-links']} small-text uppercase`}>
//       {event.URL && event.URL.length > 0 ? (
//         <Link href={event.URL} indicateExternal>
//           Visit website
//         </Link>
//       ) : (
//         <p>Website coming soon</p>
//       )}

//       {event.Location && event.Location.url && (
//         <Link href={event.Location.url} indicateExternal>
//           Location
//         </Link>
//       )}

//       {event['Stream URL'] && (
//         <Link href={event['Stream URL']} indicateExternal className="button xs orange-fill">
//           Stream
//         </Link>
//       )}

//       {enableAddToCalendar && (
//         <>
//           <div className={css['add-to-calendar']}>
//             <AddToCalendarIcon className={`big-text icon`} onClick={() => setCalendarModalOpen(true)} />
//           </div>


//         </>
//       )}
//     </div>
//   )
// }

const AddToCalendar = () => {
  const [calendarModalOpen, setCalendarModalOpen] = React.useState(false)
  const intl = useTranslations();

  const description = 'Devcon will officially run from October 11th-14th, but come a few days earlier and stay a little later to experience the full Devcon Week which will run from October 7th-16th!';
  const location = 'Agora Bogotá Convention Center';
  const startDate = '20221011';
  const endDate = '20221015'
  
  const googleCalUrl = (() => {
    const googleCalUrl = new URL(`https://www.google.com/calendar/render?action=TEMPLATE&ctz=America/Bogota`)
    
    googleCalUrl.searchParams.append('text', `Devcon`)
    googleCalUrl.searchParams.append('details', description)
    googleCalUrl.searchParams.append(
      'dates',
      `${startDate}/${endDate}`
    )
    googleCalUrl.searchParams.append('location', location);
    
    return googleCalUrl
  })()

  const ics = [`BEGIN:VCALENDAR`, `PRODID:devconnect.org`, `METHOD:PUBLISH`, `VERSION:2.0`, `CALSCALE:GREGORIAN`]

  ics.push(
    `BEGIN:VEVENT`,
    `UID:Devcon Week`,
    // `DTSTAMP:${moment.utc().format('YYYYMMDDTHHmmss')}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:Devcon`,
    `DESCRIPTION:${description}`,
    `URL;VALUE=URI:devcon.org`,
    `LOCATION:${location}`,
    `END:VEVENT`
  )

  ics.push(`END:VCALENDAR`);

  return (
    <>
      <Button className={`${css['button']} lg black text-uppercase hover`} onClick={() => setCalendarModalOpen(true)}>
        <AddToCalendarIcon /> <span className={css['button-text']}>{intl('add-to-calendar')}</span> 
      </Button>

      {calendarModalOpen && (
          <Modal
            className={css['modal']}
            open={calendarModalOpen}
            close={() => setCalendarModalOpen(false)}
          >
            <div className={css['modal-content']}>
              <p className="bold uppercase clear-bottom">{intl('add-to-calendar')}:</p>

              <div className={css['buttons']}>
                <Link to={googleCalUrl.href} >
                  <Button className="black ghost">
                    Google Calendar
                  </Button>
                </Link>

                <a 
                  href={(() => {
                      const file = new Blob([ics.filter((row: string) => !!row).join('\n')], { type: 'text/calendar' })

                      return URL.createObjectURL(file);
                  })()} 
                  download="Devcon.ics"
                >
                  <Button className="black ghost">
                    Download (.ICS)
                  </Button>
                </a>
              </div>
            </div>
          </Modal>
        )}
    </>
  )
}

export default AddToCalendar;
