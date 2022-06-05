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
import DevconLogo from 'assets/images/devcon-6-logo.png'
import Image from 'next/image'

type TicketProps = {
  title: string
  price: string
  tag: string
  description: React.ReactElement
  number: string
  color?: 'grey' | 'blue'
}

const Ticket = (props: TicketProps) => {
  let className = css['ticket']

  if (props.color) className += ` ${css[props.color]}`

  return (
    <div className={className}>
      <div className={css['background-logo']}></div>
      <div className={css['mask']}></div>
      <div className={css['border']}></div>
      <div className={css['left']}>
        <div className={css['background-number']}>
          <span>{props.number}</span>
        </div>
        <Image src={DevconLogo} alt="Devcon logo" />

        <p className="h3">{props.title}</p>
        <p className={css['price']}>
          {props.price === 'FREE' ? (
            <span className={css['free']}>{props.price}</span>
          ) : (
            <>
              {props.price} <span className={css['currency']}>USD/DAI</span>
            </>
          )}
        </p>
      </div>
      <div className={css['right']}>
        <span className="font-sm bold">{props.description}</span>
        <span className={`${css['tag']} label bold`}>{props.tag}</span>
      </div>
    </div>
  )
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
            title: intl('tickets_timeline'),
            to: '#timeline',
          },
          {
            title: intl('tickets_types_and_pricing'),
            to: '#types',
          },
          {
            title: intl('tickets_faq'),
            to: '#faq',
          },
        ]}
      />

      <div className="section">
        <div className={`${css['about']} clear-bottom border-bottom`} id="about">
          <div className={`${css['left']} section-markdown`}>
            <h2>Devcon Ticketing</h2>
            <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
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

        <h2 className="clear-top clear-bottom border-bottom margin-bottom" id="timeline">
          Timeline
        </h2>

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
                    <div className={css['left']}>Discount Ticket Applications open</div>
                    <div className={`${css['right']} bold`}>June 1</div>
                  </div>
                ),
                indent: false,
                active: true, // AUTOMATE DATE CHECKING
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Discount Ticket Applications close</div>
                    <div className={`${css['right']} bold`}>June 30</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Discount Ticket Responses sent on a rolling basis</div>
                    <div className={`${css['right']} bold`}>Review Process</div>
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
                    <div className={css['left']}>Wave 01</div>
                    <div className={`${css['right']} bold`}>
                      July 18 —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                // active: true,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 02</div>
                    <div className={`${css['right']} bold`}>
                      July 18 —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 03</div>
                    <div className={`${css['right']} bold`}>
                      July 18 —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 04</div>
                    <div className={`${css['right']} bold`}>
                      July 18 —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: 'collab',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 05</div>
                    <div className={`${css['right']} bold`}>
                      July 18 —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="border-bottom clear-bottom margin-bottom border-top clear-top" id="types">
          <h2 className="spaced">Ticket Types &amp; Pricing</h2>
          <p className="clear-bottom">
            Payment will be accepted in <b>ETH</b> or <b>DAI</b> on Ethereum Mainnet, Arbitrum + Optimism, OR Fiat/Card
            via Stripe integration. Prices will be displayed in <b>$USD</b>.
          </p>

          <div className={`clear-bottom ${css['tickets']}`}>
            <Ticket
              title="General Admission"
              price="$599"
              number="01"
              description={<div>The Original ticket to Devcon. No ID Required.</div>}
              tag="Waves coming soon"
            />
            <Ticket
              title="Press Pass"
              price="FREE"
              color="blue"
              number="04"
              description={<div>Gain access to Devcon as a Press Staff.* </div>}
              tag="Apply now"
            />
            <Ticket
              title="Student Ticket"
              price="$149"
              color="grey"
              number="02"
              description={
                <div>
                  For students &amp; educators alike. If you&apos;d like to apply for a Student discount.
                  <br /> <br />
                  <span className="font-xxs">
                    <span className="bold">*Note:</span> School/University ID required at check-in to prevent resale.
                    Secondary/high school, College, or University.
                  </span>
                </div>
              }
              tag="Apply now"
            />
            <Ticket
              title="Volunteer"
              price="FREE"
              color="blue"
              number="05"
              description={<div>If you are interested in Volunteering at Devcon.*</div>}
              tag="Apply now"
            />
            <Ticket
              title="Builder Ticket"
              price="$299"
              color="grey"
              number="03"
              description={
                <div>
                  For those who actively volunteer their time to the growth, research and development of the ecosystem.*
                </div>
              }
              tag="Apply now"
            />
          </div>

          <p className="font-xs italic">
            <span className="bold">*Note:</span> ID Required at check-in to prevent resale.
            <br />
            Additional discount available for Builders and Students from Latin America
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
        <Tags items={pageContext?.current?.tags} viewOnly />
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
