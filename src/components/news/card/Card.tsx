import React from 'react'
import css from './card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'

export const Card = () => {
  return (
    <div className={css['card']}>
      <p> JAN 21, 2021</p>
      <h3>Ticket Raffle is Live!</h3>
      <p className={css['summary']}>
        Today, we (the Devcon organizing team) are excited to make public a new way to get involved in next year’s
        event, and one that should make Devcon an experience ... ELLPISISISIS
      </p>

      <div className={css['backlink']}></div>

      <div className={css['learn-more']}>
        <p>LEARN MORE</p>
        <IconArrowRight />
      </div>
    </div>
  )
}
