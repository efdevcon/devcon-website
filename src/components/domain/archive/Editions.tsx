import React, { useState } from 'react'
import { useDevconEditions } from 'src/hooks/useDevconEditions'
import moment from 'moment'
import css from './editions.module.scss'
import { DevconEdition } from 'src/types/DevconEdition'
import { LinkButton } from 'src/components/common/link-button'

interface Props {
  className?: string
}

export const Editions = (props: Props) => {
  const editions = useDevconEditions()
  const [selectedEdition, setSelectedEdition] = useState(editions[0])
  let className = `padding-top padding-bottom border-top ${css['container']}`
  if (props.className) {
    className += ` ${props.className}`
  }

  return (
    <div className="section">
      <div className="content">
        <div className={className}>
          <div className={css['numbers']}>
            {editions.map((i: DevconEdition, index: number) => {
              let className = css['edition']
              if (i.number === selectedEdition.number) className += ` ${css['selected']}`

              return (
                <div key={i.number} className={className}>
                  <p className={css['number']} onClick={() => setSelectedEdition(editions[index])}>
                    {i.number}
                  </p>
                  <p className={css['conference']}>Ethereum developer conference</p>
                </div>
              )
            })}
          </div>
          <div className={css['image']}>
            <img src={selectedEdition.imageUrl} alt={selectedEdition.title} />
          </div>
          <div className={css['info']}>
            <div className={css['title']}>
              <p className="title">{selectedEdition.title}</p>
              <p className="subtitle">{selectedEdition.location}</p>
              {selectedEdition.startDate && selectedEdition.endDate && 
                <p>
                  {moment(selectedEdition.startDate).format('MMM DD')} -{' '}
                  {moment(selectedEdition.endDate).format('MMM DD')} {moment(selectedEdition.endDate).format('YYYY')}
                </p>
              }
            </div>
            <div className={css['description']}>
              <p>{selectedEdition.description}</p>
            </div>
            <div className={css['buttons']}>
              {selectedEdition.links.map(i => {
                return (
                  <LinkButton key={i.title} to={i.url} className={css['button']}>
                    {i.title}
                  </LinkButton>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
