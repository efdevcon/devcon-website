import React from 'react'
import css from './snapshot.module.scss'

type SnapshotItem = {
  Icon: React.ElementType
  title: string
  left?: string
  right: string | React.ReactElement
}

type SnapshotProps = {
  items: SnapshotItem[]
}

/* 
  If we keep using this component it could probably use a less restrictive interface/allow for more customizability/flexibility of item rendering, no time atm
*/
export function Snapshot(props: SnapshotProps) {
  return (
    <div className={css['container']}>
      <ul className={css['list']}>
        {props.items.map((item: SnapshotItem) => {
          return (
            <li className={css['list-item']} key={item.title}>
              <item.Icon />
              <span className={css['label']}>{item.title}</span>
              <span>{item.left}</span>
              {typeof item.right === 'string' ? <span className="bold">{item.right}</span> : item.right}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
