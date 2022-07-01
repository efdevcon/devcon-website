import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'
import HorizontalLooper from 'components/common/horizontal-looper'
import { Carousel } from 'components/common/carousel'
import Bogota1 from 'assets/images/carousel/bogota/Bogota0.jpg'
import Bogota2 from 'assets/images/carousel/bogota/Bogota2.jpg'
import Bogota3 from 'assets/images/carousel/bogota/Bogota8.jpg'
import Bogota4 from 'assets/images/carousel/bogota/Bogota5.jpg'
import { Link } from 'components/common/link'
import { Snapshot } from 'components/common/snapshot'
import IconClock from 'assets/icons/icon_clock.svg'
import IconCurrency from 'assets/icons/icon_currency.svg'
import IconGlobe from 'assets/icons/icon_globe.svg'
import IconSun from 'assets/icons/icon_sun.svg'
import IconWater from 'assets/icons/icon_water.svg'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { useTranslations } from 'next-intl'
import moment from 'moment-timezone'
import css from './continuous-devcon.module.scss'
import HackerBasement from 'assets/images/hacker-basement.png'
import HackerBasementTag from 'assets/images/hacker-basement-tag.png'
import Image from 'next/image'
import SwipeToScroll from 'components/common/swipe-to-scroll'

export default pageHOC(function ContinuousDevcon(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['bogota']}>
      <PageHero
        path={[{ text: <span className="bold">{intl('city_guide_title')}</span> }, { text: props.page.header }]}
        navigation={[
          {
            title: intl('cd_meet'),
            to: '#meet',
          },
          {
            title: intl('cd_details'),
            to: '#details',
          },
          {
            title: intl('cd_community_hubs'),
            to: '#hubs',
          },
          {
            title: intl('cd_get_involved'),
            to: '#involve',
          },
        ]}
      />

      <div className={`section ${css['container']}`}>
        <section className="two-columns clear-bottom" id="meet">
          <div className="left section-markdown">
            <h2 className="spaced">{props.page.title}</h2>
            <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />

            <div className={css['links']}>
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
                  Icon: IconClock,
                  title: 'EXTENDED Hours',
                  // left: 'GMT -5',
                  right: '08:00 AM  — 11:00 PM',
                },
                {
                  Icon: IconCurrency,
                  title: intl('snapshot_currency'),
                  left: intl('snapshot_colombian_peso'),
                  right: (
                    <Link indicateExternal to="https://www.xe.com/currency/cop-colombian-peso">
                      {intl('snapshot_exchange_rate')}
                    </Link>
                  ),
                },
                {
                  Icon: IconGlobe,
                  title: intl('snapshot_language'),
                  left: intl('snapshot_spanish'),
                  right: (
                    <Link
                      indicateExternal
                      to="https://www.worldtravelguide.net/guides/south-america/colombia/history-language-culture/"
                    >
                      {intl('snapshot_language_guide')}
                    </Link>
                  ),
                },
                {
                  Icon: IconSun,
                  title: intl('snapshot_temperature'),
                  left: '8 TO 20 °C / 46.4 to 68.0 °F',
                  right: (
                    <Link
                      indicateExternal
                      to="https://www.worldtravelguide.net/guides/south-america/colombia/travel-by/"
                    >
                      {intl('snapshot_packing_tips')}
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section className="clear-top border-top margin-bottom border-bottom clear-bottom" id="details">
          <h2 className="clear-bottom">Continuous.... What?</h2>
          <div className="two-columns" id="details">
            <div className="left">
              <p className="section-markdown highlighted h2">
                Continuous Devcon brings together a variety of opportunities for the community to get hands-on involved
                and shape the event. Furthermore, parts of the amazing venue will be accessible into the evening hours,
                enabling participants to continue exchanging ideas even after the main program has concluded for the
                day, turning Devcon into a truly continuous and more holistic and collaboration-focused experience.
              </p>
            </div>
            <div className="right">
              <p>
                The venue and space will be open, available, and welcoming until 11pm — much later than you might be
                used to from other Devcons. This means you can smoothly transition into the evening and have more time
                to explore the initiatives besides the main program! The venue will foster collaboration, networking,
                exchange, creativity, creation, experimentation and relaxation through various spaces dedicated
                especially to that. You can get hands-on involved and shape Devcon by hosting (or contributing to) a
                Community Hub! Learn more about the concept of Community Hubs and how to apply for one below.
              </p>

              <div className={css['links']}>
                <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                  {intl('tickets_title')}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="expand clear-bottom">
          <Carousel
            title="Continuous Devcon"
            images={[
              {
                alt: 'Bogota 1',
                src: Bogota1,
              },
              {
                alt: 'Bogota 2',
                src: Bogota2,
              },
              {
                alt: 'Bogota 3',
                src: Bogota3,
              },
              {
                alt: 'Bogota 4',
                src: Bogota4,
              },
            ]}
          />
        </section>

        <section id="hubs" className="border-top clear-top">
          <h2 className="clear-bottom">Continuous.... What?</h2>

          <HorizontalLooper slow unpadded>
            <p className={`${css['rainbow']} ${css['infinite-text']}`}>¨{intl('cd_infinite_text_1')}&nbsp;</p>
          </HorizontalLooper>

          <div className="two-columns clear-top clear-bottom border-bottom margin-bottom" id="details">
            <div className="left">
              <p className="section-markdown highlighted h2">
                Continuous Devcon brings together a variety of opportunities for the community to get hands-on involved
                and shape the event. Furthermore, parts of the amazing venue will be accessible into the evening hours,
                enabling participants to continue exchanging ideas even after the main program has concluded for the
                day, turning Devcon into a truly continuous and more holistic and collaboration-focused experience.
              </p>
            </div>
            <div className="right">
              <p>
                The venue and space will be open, available, and welcoming until 11pm — much later than you might be
                used to from other Devcons. This means you can smoothly transition into the evening and have more time
                to explore the initiatives besides the main program! The venue will foster collaboration, networking,
                exchange, creativity, creation, experimentation and relaxation through various spaces dedicated
                especially to that. You can get hands-on involved and shape Devcon by hosting (or contributing to) a
                Community Hub! Learn more about the concept of Community Hubs and how to apply for one below.
              </p>

              <div className={css['links']}>
                <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                  {intl('tickets_title')}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>

          <div className="two-columns margin-bottom" id="details">
            <div className="left">
              <p className="section-markdown highlighted h2">
                Continuous Devcon brings together a variety of opportunities for the community to get hands-on involved
                and shape the event. Furthermore, parts of the amazing venue will be accessible into the evening hours,
                enabling participants to continue exchanging ideas even after the main program has concluded for the
                day, turning Devcon into a truly continuous and more holistic and collaboration-focused experience.
              </p>
            </div>
            <div className="right">
              <p>
                The venue and space will be open, available, and welcoming until 11pm — much later than you might be
                used to from other Devcons. This means you can smoothly transition into the evening and have more time
                to explore the initiatives besides the main program! The venue will foster collaboration, networking,
                exchange, creativity, creation, experimentation and relaxation through various spaces dedicated
                especially to that. You can get hands-on involved and shape Devcon by hosting (or contributing to) a
                Community Hub! Learn more about the concept of Community Hubs and how to apply for one below.
              </p>

              <div className={css['links']}>
                <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                  {intl('tickets_title')}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${css['hacker-basement']} expand`} id="involve">
          <div className={css['background']}>
            <Image src={HackerBasement} alt="Hacker basement" layout="raw" />
          </div>
          <div className="section">
            <h2 className="clear-top clear-bottom">Hacker Basement</h2>

            <HorizontalLooper slow unpadded>
              <p className={`${css['stroked']} ${css['infinite-text']}`}>{intl('cd_infinite_text_2')}&nbsp;</p>
            </HorizontalLooper>

            <div className="two-columns clear-top">
              <div className={`left`}>
                <div className={`markdown ${css['text-body']}`}>
                  <p>
                    Looking for a place where you can test all the new tech and build? This time, we got you covered!
                  </p>
                  <p>The hacker basement will be your high-focus zone away from the busy conference ado.</p>
                  <p>
                    It sets the right conditions for an individual to test new stuff on their laptop, to learn, or to
                    hack on new ideas in a group.
                  </p>
                  <p>
                    Everything a hacker needs will be taken care of: cozy seating, electricity and internet and, of
                    course, cyberpunk lighting and low-fi beats to get you in the right mood to build!
                  </p>
                </div>
                <div className={css['links']}>
                  <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                    {intl('tickets_title')}
                    <ArrowRight />
                  </Link>
                </div>
              </div>

              <div className={`right ${css['tag']}`}>
                <Image src={HackerBasementTag} alt="Hacker basement tag" />
              </div>
            </div>

            <div className="clear-top clear-bottom expand">
              <SwipeToScroll scrollIndicatorDirections={{ left: true, right: true }} alwaysShowscrollIndicators>
                <div className={css['gallery']}>
                  <Image src={HackerBasement} alt="Image gallery" layout="raw" />
                  <Image src={Bogota2} alt="Image gallery" layout="raw" />
                  <Image src={Bogota3} alt="Image gallery" layout="raw" />
                  <Image src={HackerBasement} alt="Image gallery" layout="raw" />
                  <Image src={Bogota2} alt="Image gallery" layout="raw" />
                  <Image src={Bogota3} alt="Image gallery" layout="raw" />
                  <Image src={HackerBasement} alt="Image gallery" layout="raw" />
                  <Image src={Bogota2} alt="Image gallery" layout="raw" />
                  <Image src={Bogota3} alt="Image gallery" layout="raw" />
                  <Image src={HackerBasement} alt="Image gallery" layout="raw" />
                  <Image src={Bogota2} alt="Image gallery" layout="raw" />
                  <Image src={Bogota3} alt="Image gallery" layout="raw" />
                </div>
              </SwipeToScroll>
            </div>
          </div>
        </section>

        {/* <div className="margin-top">
          <Tags items={pageContext?.current?.tags} viewOnly />
        </div> */}
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/continuous-devcon', context.locale)

  return {
    props: {
      ...globalData,
      page,
    },
  }
}
