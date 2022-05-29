import React from 'react'
import css from './calls-to-action.module.scss'
import TicketBackground from 'assets/images/pages/tickets.svg'
import SpeakersBackground from 'assets/images/pages/speakers.svg'
import CallToAction from 'components/common/card/CallToActionCard'

const CallsToAction = () => {
  return (
    <div className={`section`}>
      <div className={`${css['container']} border-bottom clear-bottom`}>
        <CallToAction
          title="Ticket Pre-sale Raffle & Auction"
          tag="LIVE"
          BackgroundSvg={TicketBackground}
          link="/ticketing"
          linkText="Ticketing"
          meta="Raffle Ends: June 20th"
        >
          We are holding an experimental pre-sale Auction and Raffle for 100 tickets to Devcon 6. With a hybrid
          mechanism, we get the best of both worlds. 20 tickets will serve the demand of those who just can&apos;t miss
          Devcon at any price, while 80 tickets are given out in a provably fair fashion, at face value.
        </CallToAction>

        <CallToAction
          color="orange"
          title="Speaker Applications"
          tag="OPEN"
          BackgroundSvg={SpeakersBackground}
          link="/schedule"
          linkText="Program"
          meta="Application Deadline: June 29th"
        >
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
        </CallToAction>
      </div>
    </div>
  )
}

export default CallsToAction
