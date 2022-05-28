import React from 'react'
import css from './calls-to-action.module.scss'
import { Button } from 'components/common/button'
import TicketBackground from 'assets/images/pages/tickets.svg'
import GetInvolvedBackground from 'assets/images/pages/speakers.svg'

const CallsToAction = () => {
  return (
    <div className={`section`}>
      <div className={`${css['container']} border-bottom clear-bottom`}>
        <div className={css['message-card']}>
          <div className={css['background']}>
            <TicketBackground />
          </div>

          <div className={css['header']}>
            <p className="h3">Ticket Pre-sale Raffle & Auction</p>
            <div className="label red bold">LIVE</div>
          </div>

          <p>
            We are holding an experimental pre-sale Auction and Raffle for 100 tickets to Devcon 6. With a hybrid
            mechanism, we get the best of both worlds. 20 tickets will serve the demand of those who just can&apos;t
            miss Devcon at any price, while 80 tickets are given out in a provably fair fashion, at face value.
          </p>

          <div className={css['footer']}>
            <Button className="red lg">Ticketing</Button>
            <p className="bold font-sm">Raffle Ends: June 20th</p>
          </div>
        </div>

        <div className={`${css['message-card']} ${css['orange']}`}>
          <div className={css['background']}>
            <GetInvolvedBackground />
          </div>

          <div>
            <div className={css['header']}>
              <p className="h3">Speaker Applications</p>
              <div className="label red bold">Open</div>
            </div>

            <p>
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
            </p>
          </div>

          <div className={css['footer']}>
            <Button className="red lg">Program</Button>
            <p className="bold font-sm">Application Deadline: June 29th</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallsToAction
