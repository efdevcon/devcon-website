import React from 'react'
import { Link } from 'components/common/link'
import css from './schedule.module.scss'
import { AppNav } from 'components/domain/app/navigation'

export const Schedule = ({ sessions }: any) => {
  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Schedule',
          },
        ]}
      />
      <div className="section">
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
    </>
  )
}
