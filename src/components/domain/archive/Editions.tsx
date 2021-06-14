import React, { useState } from 'react'
import { useDevconEditions } from 'src/hooks/useDevconEditions'
import moment from 'moment'
import css from './editions.module.scss'
import { DevconEdition } from 'src/types/DevconEdition'

interface Props {
  className?: string
}

export const Editions = (props: Props) => {
  const editions = useDevconEditions()
  const [selectedEdition, setSelectedEdition] = useState(editions[0])
  let className = css['container']
  if (props.className) {
    className += ` ${props.className}`
  }

  return (
    <div className={className}>
      <div className={css['numbers']}>
        {editions.map((i: DevconEdition, index: number) => {
            let className = css['number']
            if (i.number === selectedEdition.number)
                className += ` ${css['selected']}`

          return (
            <p key={i.number} className={className} onClick={() => setSelectedEdition(editions[index])}>
              {i.number}
            </p>
          )
        })}
      </div>
      <div className={css['image']}>
        <img src={selectedEdition.imageUrl} alt={selectedEdition.title} />
      </div>
      <div className={css['info']}>
        <div className={css['title']}>
          <p>{selectedEdition.location}</p>
          <p>{selectedEdition.title}</p>
        </div>
        <div className={css['description']}>
          <p>{selectedEdition.description}</p>
        </div>
        <div className={css['buttons']}>
          <p>Links -</p>
        </div>
      </div>
    </div>
  )
}
