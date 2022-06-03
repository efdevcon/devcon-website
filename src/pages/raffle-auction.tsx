import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetContentSections, GetPage } from 'services/page'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import css from './raffle-auction.module.scss'
import AuctionIcon from 'assets/icons/auction.svg'
import CalendarIcon from 'assets/icons/calendar.svg'
import { Button } from 'components/common/button'

export default pageHOC(function RaffleAuction(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['tickets']}>
      <PageHero
        path={[{ text: <span className="bold">Tickets</span> }, { text: 'Raffle+Auction' }]}
        navigation={[
          {
            title: intl('tickets_timeline'),
            to: '#about',
          },
          {
            title: intl('tickets_auction'),
            to: '#auction',
          },
          {
            title: intl('tickets_withdrawal'),
            to: '#raffle',
          },
          {
            title: intl('tickets_poap'),
            to: '#poap',
          },
          {
            title: intl('tickets_reasoning'),
            to: '#reasoning',
          },
        ]}
      />

      <div className="section">
        <div className={`${css['about']} clear-bottom border-bottom`} id="about">
          <div className={`${css['left']} section-markdown`}>
            <h2>Experimental On-chain Ticket Raffle+Auction</h2>
            <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
          </div>
          
          <div className={css['right']}>
            <h2 className="spaced">Important Dates</h2>
            <Snapshot
              items={[
                {
                  Icon: AuctionIcon,
                  title: 'RAFFLE+AUCTION BEGINS',
                  right: 'June 30',
                },
                {
                  Icon: CalendarIcon,
                  title: 'TICKET sale waves',
                  right: 'July 01',
                },
              ]}
            />

            <Button className="blue lg">Participate in Presale Raffle+Auction</Button>
          </div>
        </div>

        {props.sections['how-will-the-auction-work'] && (
          <div className={`section-markdown clear-top clear-bottom`} dangerouslySetInnerHTML={{ __html: props.sections['how-will-the-auction-work'].body }} />
        )}
      </div>

      <div className="section">
        <Tags items={pageContext?.current?.tags} viewOnly />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/raffle-auction', context.locale)
  const sections = await GetContentSections(['on-chain-ticket-raffle-auction', 'how-will-the-auction-work'], context.locale)

  return {
    props: {
      ...globalData,
      page,
      sections
    },
  }
}
