import React from 'react'
import { Session } from 'types/Session'
import css from './list.module.scss'
import { SessionCard } from 'components/domain/app/session'
import moment from 'moment'
import { CollapsedSection, CollapsedSectionContent, CollapsedSectionHeader } from 'components/common/collapsed-section'
import { ScheduleInformation } from '../Schedule'

interface ListProps extends ScheduleInformation {
  sessions: Session[]
}

export const List = (props: ListProps) => {
  const { sessionTimeslots, timeslotOrder, dates } = props

  console.log(props.sessionsByTime, 'by time')

  return (
    <div className={css['list']}>
      {props.sessionsByTime.map(({ date, timeslots }) => {
        // TODO: How/why is it ever null?
        if (date.readable === 'Invalid date') return null // 'date start is null, not rendering'
        if (timeslots.length === 0) return null

        return (
          <CollapsedSection sticky key={date.readable}>
            <CollapsedSectionHeader>
              <p className="font-md-fixed bold">{date.moment ? date.moment.format('dddd, MMM Do') : date.readable}</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent dontAnimate>
              {timeslots.map(({ time, sessions }) => {
                // const sessionsForTimeslot = sessionTimeslots[time]
                const startTime = moment.utc(time)
                const dateOfSession = startTime.format('MMM Do')
                const startTimeFormatted = startTime.format('h:mm A')

                if (dateOfSession !== date.readable) {
                  return null
                }
                if (startTimeFormatted === 'Invalid date') return null

                return (
                  <div key={time} className={css['timeslot']}>
                    <div className={css['start-time']}>{startTimeFormatted} UTC-5</div>

                    {sessions.map(session => {
                      return <SessionCard session={session} key={session.id} />
                    })}
                  </div>
                )
              })}
            </CollapsedSectionContent>
          </CollapsedSection>
        )
      })}
    </div>
  )

  return (
    <div className={css['list']}>
      {dates.map(date => {
        // TODO: How/why is it ever null?
        if (date.readable === 'Invalid date') return null // 'date start is null, not rendering'

        return (
          <CollapsedSection sticky key={date.readable}>
            <CollapsedSectionHeader>
              <p className="font-md-fixed bold">{date.moment ? date.moment.format('dddd, MMM Do') : date.readable}</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent dontAnimate>
              {timeslotOrder.map(time => {
                const sessionsForTimeslot = sessionTimeslots[time]
                const startTime = moment.utc(time)
                const dateOfSession = startTime.format('MMM Do')
                const startTimeFormatted = startTime.format('h:mm A')

                if (dateOfSession !== date.readable) {
                  return null
                }
                if (startTimeFormatted === 'Invalid date') return null

                return (
                  <div key={time} className={css['timeslot']}>
                    <div className={css['start-time']}>{startTimeFormatted} UTC-5</div>

                    {sessionsForTimeslot.map(session => {
                      return <SessionCard session={session} key={session.id} />
                    })}
                  </div>
                )
              })}
            </CollapsedSectionContent>
          </CollapsedSection>
        )
      })}
    </div>
  )
}
