import React from 'react'
import { Session } from 'types/Session'
import css from './list.module.scss'
import { SessionCard } from 'components/domain/app/session'
import moment from 'moment'

type ListProps = {
  sessions: Session[]
}

const getSessionTimeslots = (sessions: Session[]) => {
  const sessionTimeslots = {} as { [key: number]: Session[] }
  const order = [] as number[]

  sessions.forEach(session => {
    if (!sessionTimeslots[session.start]) {
      order.push(session.start)
      sessionTimeslots[session.start] = []
    }

    sessionTimeslots[session.start].push(session)
  })

  return { sessionTimeslots, order }
}

export const List = (props: ListProps) => {
  const uniqueStartTimes = new Set()
  const { sessionTimeslots, order } = getSessionTimeslots(props.sessions)

  return (
    <div className={css['list']}>
      {order.map(time => {
        const sessionsForTimeslot = sessionTimeslots[time]
        const startTime = moment.utc(time)
        const startTimeFormatted = startTime.format('h:mm A')

        return (
          <div className={css['timeslot']} key={time}>
            <div className={css['start-time']}>{startTimeFormatted}</div>
            {sessionsForTimeslot.map(session => {
              return <SessionCard compact session={session} key={session.id} />
            })}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className={css['list']}>
      {props.sessions.map(session => {
        const startTime = moment.utc(session.start)

        const body = <SessionCard compact session={session} key={session.id} />

        const startTimeFormatted = startTime.format('h:mm A')

        const startTimeAlreadyRendered = uniqueStartTimes.has(startTimeFormatted)

        if (startTimeAlreadyRendered) {
          return body
        }

        uniqueStartTimes.add(startTimeFormatted)

        return (
          <React.Fragment key={session.id}>
            <div className={css['start-time']}>{startTimeFormatted}</div>
            {body}
          </React.Fragment>
        )
      })}
    </div>
  )
}
