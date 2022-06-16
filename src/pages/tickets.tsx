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
import { Link } from 'components/common/link'

type TicketProps = {
  title: string
  price: string
  tags: {
    text: string
    link?: string
  }[]
  disabled?: boolean
  description: React.ReactElement
  number: string
  link?: string
  withoutCurrency?: boolean
  color?: 'grey' | 'blue'
}

const Ticket = (props: TicketProps) => {
  let className = css['ticket']

  if (props.color) className += ` ${css[props.color]}`
  if (props.disabled) className += ` ${css['disabled']}`

  const body = (
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
          {props.withoutCurrency ? (
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
        <div>
          {props.tags.map(tag => {
            if (tag.link) {
              return (
                <Link to={tag.link} key={tag.text} className={`${css['tag']} label bold hover-underline`}>
                  {tag.text}
                </Link>
              )
            }

            return (
              <span key={tag.text} className={`${css['tag']} label bold`}>
                {tag.text}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )

  // if (props.link) {
  //   return <Link to={props.link}>{body}</Link>
  // }

  return body
}

export default pageHOC(function Tickets(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['tickets']}>
      <PageHero
        path={[{ text: <span className="bold">{intl('navigation_tickets')}</span> }, { text: 'Get Tickets' }]}
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
            <h2 className="spaced">{intl('tickets_ticketing')}</h2>
            <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />
          </div>

          <div className={css['right']}>
            <h2 className="spaced">{intl('tickets_raffle_important_dates')}</h2>
            <Snapshot
              items={[
                {
                  Icon: NoteIcon,
                  title: intl('tickets_raffle_discount_ticket_applications'),
                  right: intl('tickets_raffle_discount_ticket_applications_dates'),
                },
                {
                  Icon: AuctionIcon,
                  title: intl('tickets_raffle_auction_begins'),
                  right: intl('tickets_raffle_auction_dates'),
                },
                {
                  Icon: TicketIcon,
                  title: intl('tickets_raffle_ticket_sale_waves'),
                  right: intl('tickets_raffle_ticket_sale_waves_dates'),
                },
              ]}
            />
          </div>
        </div>

        <h2 className="clear-top clear-bottom border-bottom margin-bottom" id="timeline">
          {intl('tickets_timeline')}
        </h2>

        <div className="clear-bottom">
          <h2 className="spaced">{intl('tickets_discounted')}</h2>

          <List
            connectedItems
            items={[
              {
                id: '1',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>{intl('tickets_discount_applications_begins')}</div>
                    <div className={`${css['right']} bold`}>{intl('tickets_discount_applications_begins_date')}</div>
                    <Link to="#types" className="generic hover-underline">
                      {intl('tickets_apply_now')}
                    </Link>
                  </div>
                ),
                indent: false,
                active: true, // AUTOMATE DATE CHECKING
                body: '',
              },
              {
                id: '2',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>{intl('tickets_discount_applications_ends')}</div>
                    <div className={`${css['right']} bold`}>{intl('tickets_discount_applications_ends_date')}</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: '3',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>{intl('tickets_discount_applications_send_rolling_basis')}</div>
                    <div className={`${css['right']} bold`}>{intl('tickets_discount_applications_review_process')}</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="clear-bottom">
          <h2 className="spaced">{intl('tickets_raffle_auction_presale')}</h2>

          <List
            connectedItems
            items={[
              {
                id: '1',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>{intl('tickets_raffle_auction_begins')}</div>
                    <div className={`${css['right']} bold`}>{intl('tickets_tba')}</div>
                    <Link to="/raffle-auction" className="generic hover-underline">
                      {intl('tickets_raffle_information')}
                    </Link>
                  </div>
                ),
                indent: false,
                // active: true, // to do: date based activation
                body: '',
              },
              {
                id: '2',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>{intl('tickets_raffle_auction_ends')}</div>
                    <div className={`${css['right']} bold`}>{intl('tickets_tba')}</div>
                  </div>
                ),
                indent: false,
                body: '',
              },
            ]}
          />
        </div>

        <div className="clear-bottom">
          <h2 className="spaced">{intl('tickets_general_waves')}</h2>

          <List
            connectedItems
            items={[
              {
                id: '1',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 01</div>
                    <div className={`${css['right']} bold`}>
                      {intl('tickets_general_waves_01')} —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                    <p className="bold">{intl('tickets_coming_soon')}</p>
                  </div>
                ),
                indent: false,
                // active: true,
                body: '',
              },
              {
                id: '2',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 02</div>
                    <div className={`${css['right']} bold`}>
                      {intl('tickets_general_waves_02')} —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: '3',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 03</div>
                    <div className={`${css['right']} bold`}>
                      {intl('tickets_general_waves_03')} —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: '4',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 04</div>
                    <div className={`${css['right']} bold`}>
                      {intl('tickets_general_waves_04')} —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
                    </div>
                  </div>
                ),
                indent: false,
                body: '',
              },
              {
                id: '5',
                title: (
                  <div className={css['timeline-item']}>
                    <div className={css['left']}>Wave 05</div>
                    <div className={`${css['right']} bold`}>
                      {intl('tickets_general_waves_05')} —&nbsp;<span className={`${css['when']} font-sm`}>16:00 UTC &amp; 23:00 UTC</span>
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
          <h2 className="spaced">{intl('tickets_types_and_pricing')}</h2>
          <p className="clear-bottom">{intl('tickets_accepted_payments')}</p>

          <div className={`clear-bottom ${css['tickets']}`}>
            <Ticket
              title="General Admission"
              price="$599"
              disabled
              number="01"
              description={<div>{intl('tickets_types_ga')}</div>}
              tags={[
                {
                  text: intl('tickets_coming_soon'),
                },
              ]}
            />
            <Ticket
              title="Builder Ticket*"
              link="https://forms.gle/x6GHpq8MAZJCwwsq5"
              price="$299"
              color="grey"
              number="02"
              description={<div>{intl('tickets_types_builder')}</div>}
              tags={[
                {
                  text: intl('tickets_apply_now'),
                  link: 'https://forms.gle/x6GHpq8MAZJCwwsq5',
                },
              ]}
            />

            <Ticket
              title="Student Ticket*"
              price="$149"
              color="grey"
              link="https://forms.gle/9L7BwqCP5hS1AT4HA"
              number="03"
              description={
                <div>
                  {intl('tickets_types_student')}
                  <br /> <br />
                  <span className="font-xxs">
                    {intl('tickets_types_student_note')}
                  </span>
                </div>
              }
              tags={[
                {
                  text: intl('tickets_apply_now'),
                  link: 'https://forms.gle/9L7BwqCP5hS1AT4HA',
                },
              ]}
            />

            <Ticket
              title="LatAm Builder/Student*"
              // link="https://forms.gle/x6GHpq8MAZJCwwsq5"
              price={intl('tickets_extra_discount')}
              color="blue"
              withoutCurrency
              number="04"
              description={<div>{intl('tickets_types_latam')}</div>}
              tags={[
                {
                  text: 'Builder',
                  link: 'https://forms.gle/x6GHpq8MAZJCwwsq5',
                },
                {
                  text: 'Student',
                  link: 'https://forms.gle/9L7BwqCP5hS1AT4HA',
                },
              ]}
            />

            {/* <Ticket
              title="Press Pass*"
              price="FREE"
              link="https://forms.gle/y9SRAnVBWbZfqPGv8"
              withoutCurrency
              color="blue"
              number="05"
              description={<div>Gain access to Devcon as a Press Staff. </div>}
              tags={[
                {
                  text: 'Apply now',
                  link: 'https://forms.gle/y9SRAnVBWbZfqPGv8',
                },
              ]}
            /> */}
            <Ticket
              title="Volunteer*"
              link="https://forms.gle/mjHz1oyy2LiVCRvw7"
              price={intl('tickets_free')}
              withoutCurrency
              color="blue"
              number="05"
              description={<div>{intl('tickets_types_volunteer')}</div>}
              tags={[
                {
                  text: intl('tickets_apply_now'),
                  link: 'https://forms.gle/mjHz1oyy2LiVCRvw7',
                },
              ]}
            />
          </div>

          <p className="italic">
            {intl('tickets_note_id_check')}
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
