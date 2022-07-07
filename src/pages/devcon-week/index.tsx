import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'
import Schedule from './schedule/schedule'
import getNotionDatabase from './schedule/getNotionDatabase'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import { Link } from 'components/common/link'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { Button } from 'components/common/button'

export default pageHOC(function ContinuousDevcon(props: any) {
  const pageContext = usePageContext()
  const intl = useTranslations()

  return (
    <Page theme={themes['bogota']}>
      <PageHero
        path={[{ text: <span className="bold">Bogotá</span> }, { text: props.page.header }]}
        navigation={[
          {
            title: intl('devcon_week_overview'),
            to: '#overview',
          },
          {
            title: intl('devcon_week_featured_events'),
            to: '#things-to-do',
          },
          {
            title: intl('devcon_week_overview'),
            to: '#why-bogota',
          },
        ]}
      />

      <div className="section">
        <div className="two-columns clear-bottom border-bottom margin-bottom">
          <div className="left">
            <h2 className="spaced">{props.page.title}</h2>

            <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />

            <div className="links">
              <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                {intl('tickets_title')}
                <ArrowRight />
              </Link>
              <Link to="/faq" className="text-uppercase hover-underline font-lg bold">
                {intl('faq_title')}
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="right">
            <Snapshot
              items={[
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <Schedule events={props.scheduleData} />

      <div className="section margin-top border-top padding-top margin-bottom">
        <h2 className="margin-bottom">Post-Devcon Events</h2>
        <div className="two-columns">
          <div className="left">
            <h3 className="clear-bottom">ETHMedellin 🇨🇴 — October 18-22</h3>

            <p className="clear-bottom">
              A short flight or bus-ride away lies Medellin, Bogotá&apos;s warmer and more touristic neighbor. A great
              excuse to extend your trip or travel with some newfound friends to unite with the Ethereum Medellin
              community for a week of open co-working, evening events, NFT activations, and conferences.
            </p>

            <Link to="https://google.com">
              <Button className="red">Learn more</Button>
            </Link>
          </div>
          <div className="right">
            <h3 className="clear-bottom">ETHPanama 🇵🇦 — October 26-28</h3>

            <p className="clear-bottom">
              Just one week after ETHMedellin and a cheap one-hour flight, ETHPanama will be taking place in Panama
              City. Join for some continued learning, exposure to the Panamanian Ethereum community, and there just
              might be group surf trip afterwards for the more adventurous of the group!
            </p>

            <Link to="https://google.com">
              <Button className="red">Learn more</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* <Tags items={pageContext?.current?.tags} viewOnly /> */}
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/devcon-week', context.locale)

  return {
    props: {
      ...globalData,
      scheduleData: await getNotionDatabase(),
      page,
    },
  }
}
