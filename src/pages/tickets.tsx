import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetPage, GetFAQ } from 'services/page'
import { FAQ } from 'components/domain/faq'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import TicketIcon from 'assets/icons/ticket.svg'
import AuctionIcon from 'assets/icons/auction.svg'
import NoteIcon from 'assets/icons/note.svg'
import css from './tickets.module.scss'
import List from 'components/common/list'

const Ticket = (props: any) => {
  return <div className={css['ticket']}>Ticket lol</div>
}

export default pageHOC(function Tickets(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['tickets']}>
      <PageHero
        path={[{ text: <span className="bold">Tickets</span> }, { text: 'Get Tickets' }]}
        navigation={[
          {
            title: intl('program_application_process'),
            to: '#process',
          },
          {
            title: intl('program_application_guidelines'),
            to: '#guidelines',
          },
        ]}
      />

      <div className="section">
        <div className={`${css['about']} clear-bottom border-bottom`} id="about">
          <div className={css['left']}>
            <div>
              <h2>Devcon Ticketing</h2>
              <p className="h2 highlighted">
                Ticket sales will launch in June with Applications for Discounted Tickets, and our Presale
                Raffle+Auction following shortly after. Ticket sales will begin shortly after and all sales will
                conclude by September.
              </p>
            </div>
          </div>

          <div className={css['right']}>
            <h2 className="spaced">Important Dates</h2>
            <Snapshot
              items={[
                {
                  Icon: NoteIcon,
                  title: 'DISCOUNT TICKET APPLIcations',
                  right: 'June 1',
                },
                {
                  Icon: AuctionIcon,
                  title: 'RAFFLE+AUCTION BEGINS',
                  right: 'June 30',
                },
                {
                  Icon: TicketIcon,
                  title: 'TICKET sale waves',
                  right: 'July 18',
                },
              ]}
            />
          </div>
        </div>

        <h2 className="clear-top clear-bottom border-bottom margin-bottom">Timeline</h2>

        <div className="clear-bottom">
          <h2 className="spaced">Presale Raffle+Auction</h2>

          <List
            connectedItems
            items={[
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                // active: true, // to do: date based activation
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Ends</div>
                    <div className={`${css['right']} bold`}>July 1</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="clear-bottom">
          <h2 className="spaced">Discounted Tickets</h2>

          <List
            connectedItems
            items={[
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                active: true,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="clear-bottom">
          <h2 className="spaced">General Ticketing Waves</h2>

          <List
            connectedItems
            items={[
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                active: true,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Raffle+Auction Begins?</div>
                    <div className={`${css['right']} bold`}>June 13</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="border-bottom clear-bottom margin-bottom">
          <h2 className="spaced">Ticket Types & Pricing</h2>
          <p className="clear-bottom">
            Payment will be accepted in ETH or DAI on Ethereum Mainnet, Arbitrum + Optimism, OR Fiat/Card via Stripe
            integration. Prices will be displayed in $USD.
          </p>

          <div className="clear-bottom">A BUNCH OF IMAGES GO HERE</div>

          <p className="font-xs">
            *Note: ID Required at check-in to prevent resale.
            <br />+ Additional discount available for Builders and Students from Latin America
          </p>
        </div>
      </div>

      <div id="faq" className="section">
        <FAQ
          data={[{ id: 'something', title: 'Frequently Asked Questions', questions: props.faq }]}
          customCategoryTitle="FAQ"
          noSearch
        />
      </div>

      <div className="section">
        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/tickets', context.locale)
  const faq = await GetFAQ(context.locale)

  return {
    props: {
      ...globalData,
      faq: faq.filter((faq: any) => faq.category.id === 'ticketing'),
      page,
    },
  }
}
