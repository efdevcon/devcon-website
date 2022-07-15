import React from 'react'
import css from './calls-to-action.module.scss'
import TicketBackground from 'assets/images/pages/tickets.svg'
import SpeakersBackground from 'assets/images/pages/speakers.svg'
import CallToAction from 'components/common/card/CallToActionCard'
import { ContentSection } from 'types/ContentSection'

interface Props {
  ticketPresale: ContentSection
  scholarApplications: ContentSection
  speakerApplications: ContentSection
}

const CallsToAction = (props: Props) => {
  return (
    <div className={`section`}>
      <div className={`${css['container']} border-bottom clear-bottom`}>
        <CallToAction
          title={props.ticketPresale.title}
          tag="LIVE"
          BackgroundSvg={TicketBackground}
          link="/tickets"
          linkText="Ticketing"
          meta="Applications Close: June 30th @ 23:59:59 UTC"
        >
          <div dangerouslySetInnerHTML={{ __html: props.ticketPresale.body }} />
        </CallToAction>

        <CallToAction
          color="orange"
          title={props.scholarApplications.title}
          tag="OPEN"
          BackgroundSvg={SpeakersBackground}
          link="https://scholars.paperform.co/"
          linkText="Apply"
          meta="Applications are now open"
        >
          <div dangerouslySetInnerHTML={{ __html: props.scholarApplications.body }} />
        </CallToAction>

        <CallToAction
          color="orange"
          title={props.speakerApplications.title}
          // tag="OPEN"
          BackgroundSvg={SpeakersBackground}
          link="/applications"
          linkText="Applications"
          meta="Applications are now closed"
        >
          <div dangerouslySetInnerHTML={{ __html: props.speakerApplications.body }} />
        </CallToAction>
      </div>
    </div>
  )
}

export default CallsToAction
