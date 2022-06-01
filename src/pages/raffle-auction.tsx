import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
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
          <div className={css['left']}>
            <div>
              <h2>Experimental On-chain Ticket Raffle+Auction</h2>
              <p className="h2 highlighted">
                This year, with the help of the amazing TrueFi/TrustToken team, we will be holding a pre-sale Auction
                and Raffle for 100 tickets to Devcon 6. The entirety of the Auction and Raffle will take place on
                Arbitrum.
              </p>
              <p>
                Therefore, we will only accept crypto as a method of payment. We advise bridging funds to Arbitrum ahead
                of time if you wish to participate in the Auction/Raffle. Everybody who participates in the Raffle &amp;
                Auction will get a POAP NFT to indicate participation. The site for the Raffle &amp; Auction can be
                found here.
              </p>
            </div>
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

        <div className="clear-top clear-bottom border-bottom" id="auction">
          <h2 className="spaced">How will the auction work?</h2>
          <p>
            We will begin taking bids on ___ at _am EST and bidding will close at _pm EST xx/xx/xxxx. The minimum bid
            required to participate in the Auction will be x ETH. The 20 highest bidders in the Auction will each
            receive a Voucher Code redeemable for 1 Free Ticket to Devcon 6. All funds/proceeds above the Reserve Price
            will be donated to X-Public-Good.
          </p>
        </div>

        <div className="clear-top clear-bottom border-bottom" id="raffle">
          <h2 className="spaced">How will the raffle work?</h2>
          <p>
            All Auction participants who do not make one of the top 20 bids will be funneled into a Raffle to win 1 of
            80 tickets to Devcon 6. Each person who wins the Raffle will receive a Voucher Code redeemable for 1 Free
            Ticket Devcon 6. One Raffle winner will be randomly selected to have their ticket be a Golden Ticket to
            Devcon 6, which will grant that Raffle winner the ability to withdraw their funds from the Auction/Raffle
            contract, and still receive a Voucher Code that grants 1 Free Ticket to Devcon 6.
          </p>
        </div>

        <div className="clear-top clear-bottom border-bottom" id="withdrawal">
          <h2 className="spaced">Will I get my money back if I do not win the Auction or win the Raffle?</h2>
          <p>
            Yes, you will be able to withdraw your funds if you do not win either the Auction or Raffle &#40;minus a 2%
            fee&#41;. Raffle winners will also be able to withdraw all funds above the Reserve price &#40;minus a 2%
            fee&#41;.
          </p>
        </div>

        <div className="clear-top clear-bottom border-bottom" id="poap">
          <h2 className="spaced">What will the POAP NFTs be good for? </h2>
          <p>
            There may be future opportunities to provide rewards or discounts to those who hold a Devcon Raffle/Auction
            POAP NFT.
          </p>
        </div>

        <div className="clear-top clear-bottom" id="reasoning">
          <h2 className="clear-bottom">Reasoning</h2>

          <h3 className="highlighted clear-bottom">Dogfooding</h3>
          <p>
            At Devcon, we have a goal to dogfood built-on-ethereum tech as much as possible. It&apos;s a great
            opportunity give the community hands-on experience using ethereum-based tech, it&apos;s a good opportunity
            to get feedback on ethereum-based projects, and it&apos;s more aligned with our ethos of decentralization
            and FOSS software. Traditionally, we sell tickets in waves at several different days and times.
          </p>

          <h3 className="highlighted clear-bottom clear-top">Provably fair &amp; Provably efficient</h3>
          <p>
            One neat aspect of this mechanism is that one can tune how efficient vs. how fair one wants the distribution
            to be. With auctions being the most efficient form of scarce resource allocation, and Raffles being the most
            fair form. Twenty tickets allocated to the Auction and 80 tickets allocated to the Raffle &#40;100 tickets
            in total&#41; means the distribution is 20% efficient, 80% fair.
          </p>

          <h3 className="highlighted clear-bottom clear-top">Alternate distribution mechanism</h3>
          <p>
            This however inevitably ends up favoring some time zones more than others. In general, we think there must
            be better ways &#40;or at least ways with different tradeoffs&#41; to distribute tickets without asking
            people to wait and refresh a website at a certain time.
          </p>
        </div>
      </div>

      <div className="section">
        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/raffle-auction', context.locale)

  return {
    props: {
      ...globalData,
      page,
    },
  }
}
