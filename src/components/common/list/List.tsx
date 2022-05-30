import React from 'react'
import css from './list.module.scss'

interface Item {
  id: number | string
  title: string | React.ReactChild
  body: string | React.ReactChild
  indent?: boolean
}

interface ListProps {
  items: Item[]
  withSeparators?: boolean
}

const List = (props: ListProps) => {
  let className = css['list']

  if (props.withSeparators) className += ` ${css['with-separators']}`

  return (
    <ul className={className}>
      {props.items.map((item: Item, index: number) => {
        return (
          <li className={css['item']} key={item.id}>
            <span className={css['number']}>{index + 1}</span>
            <div className={css['content']}>
              <div className={`${css['title']} font-xl`}>{item.title}</div>
              <div className={css['body']}>{item.body}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default List
