import React from 'react'
import css from './two-columns.module.scss'

type TwoColumnsProps = {
  id: string
  title?: string
  left: string
  right: string
}

export const TwoColumns = (props: TwoColumnsProps) => {
  return (
    <section id={props.id} className={css['content-section']}>
      { props.title && <h3 className="subsection-header">{props.title}</h3> }

      <div className={css['container']}>
        <div className={css['left']}>
          <p dangerouslySetInnerHTML={{ __html: props.left }} />
        </div>
        <div className={css['right']}>
          <p dangerouslySetInnerHTML={{ __html: props.right }} />
        </div>
      </div>
    </section>
  )
}
