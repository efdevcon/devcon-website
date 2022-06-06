import React from 'react'
import { Link } from 'components/common/link'
import css from './schedule.module.scss'

export const Schedule = ({ sessions }: any) => {
  return (
    <div>
      <h1>Sessions:</h1>
      <div className={css['list']}>
        {sessions.map((session: any) => {
          return (
            <Link className={css['session']} key={session.id} to={`/app/schedule/${session.id}`}>
              {session.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
