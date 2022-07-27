import React from 'react'
import { Button } from 'components/common/button'
import css from './add-to-calendar.module.scss'
import { useTranslations } from 'next-intl'
import { Modal } from 'components/common/modal'
import { Link } from 'components/common/link'
import AddToCalendarIcon from 'assets/icons/calendar.svg'

const AddToCalendar = () => {
  const [calendarModalOpen, setCalendarModalOpen] = React.useState(false)
  const intl = useTranslations()

  const description =
    'Devcon will officially run from October 11th-14th, but come a few days earlier and stay a little later to experience the full Devcon Week which will run from October 7th-16th!'
  const location = 'Agora Bogotá Convention Center'
  const startDate = '20221011'
  const endDate = '20221015'

  const googleCalUrl = (() => {
    const googleCalUrl = new URL(`https://www.google.com/calendar/render?action=TEMPLATE&ctz=America/Bogota`)

    googleCalUrl.searchParams.append('text', `Devcon`)
    googleCalUrl.searchParams.append('details', description)
    googleCalUrl.searchParams.append('dates', `${startDate}/${endDate}`)
    googleCalUrl.searchParams.append('location', location)

    return googleCalUrl
  })()

  const ics = [`BEGIN:VCALENDAR`, `PRODID:devconnect.org`, `METHOD:PUBLISH`, `VERSION:2.0`, `CALSCALE:GREGORIAN`]

  ics.push(
    `BEGIN:VEVENT`,
    `UID:Devcon Week`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:Devcon`,
    `DESCRIPTION:${description}`,
    `URL;VALUE=URI:devcon.org`,
    `LOCATION:${location}`,
    `END:VEVENT`
  )

  ics.push(`END:VCALENDAR`)

  return (
    <>
      <Button className={`${css['button']} bold black text-uppercase hover`} onClick={() => setCalendarModalOpen(true)}>
        <AddToCalendarIcon /> <span className={css['button-text']}>{intl('add-to-calendar')}</span>
      </Button>

      {calendarModalOpen && (
        <Modal className={css['modal']} open={calendarModalOpen} close={() => setCalendarModalOpen(false)}>
          <div className={css['modal-content']}>
            <p className="bold uppercase clear-bottom">{intl('add-to-calendar')}:</p>

            <div className={css['buttons']}>
              <a
                href={(() => {
                  const file = new Blob([ics.filter((row: string) => !!row).join('\n')], { type: 'text/calendar' })

                  return URL.createObjectURL(file)
                })()}
                download="Devcon.ics"
              >
                <Button className="black ghost">Download (.ICS)</Button>
              </a>

              <Link to={googleCalUrl.href}>
                <Button className="black ghost">Google Calendar</Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AddToCalendar
