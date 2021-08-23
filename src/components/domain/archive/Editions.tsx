import React, { useState } from 'react'
import { useDevconEditions } from 'src/hooks/useDevconEditions'
import moment from 'moment'
import css from './editions.module.scss'
import { DevconEdition } from 'src/types/DevconEdition'
import { Button } from 'src/components/common/button'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

interface Props {
  className?: string
}

export const Editions = (props: Props) => {
  const editions = useDevconEditions()
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0)
  let className = `padding-top padding-bottom border-top ${css['container']}`
  if (props.className) {
    className += ` ${props.className}`
  }

  const selectedEdition = editions[selectedEditionIndex]

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
                  <p className={css['number']} onClick={() => setSelectedEditionIndex(index)}>
                    {i.number}
                  </p>
                  <p className={css['conference']}>Ethereum developer conference</p>
                </div>
              )
            })}
          </div>

          <div className={css['images']}>
            {editions.map((i: DevconEdition, index: number) => {
              let className = css['image']

              if (index === selectedEditionIndex) className += ` ${css['selected']}`

              return (
                <div className={className} key={index}>
                  <GatsbyImage image={getImage(i.image)} objectFit="contain" alt={i.title} />
                </div>
              )
            })}
          </div>

          <div className={css['info']}>
            <div className={css['title']}>
              <p className="title">{selectedEdition.title}</p>
              <p className="subtitle">{selectedEdition.location}</p>
              {selectedEdition.startDate && selectedEdition.endDate && (
                <p>
                  {moment(selectedEdition.startDate).format('MMM DD')} -{' '}
                  {moment(selectedEdition.endDate).format('MMM DD')} {moment(selectedEdition.endDate).format('YYYY')}
                </p>
              )}
            </div>
            <div className={css['description']}>
              <p>{selectedEdition.description}</p>
            </div>
            <div className={css['buttons']}>
              {selectedEdition.links.map(i => {
                return (
                  <Button key={i.title} to={i.url} className={`${css['button']} white`}>
                    {i.title}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
