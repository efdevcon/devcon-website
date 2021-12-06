import React from 'react'
import { Link } from 'src/components/common/link'
import css from './schedule.module.scss'

export const Schedule = ({ sessions }: any) => {
  return (
    <div>
      <Link to="/app/schedule/test">Test session</Link>

      <h1>Sessions:</h1>
      {sessions.map((session: any) => {
        return <p>{session.frontmatter.code}</p>
      })}
    </div>
  )
}
