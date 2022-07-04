import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage, GetContentSections } from 'services/page'
import HorizontalLooper from 'components/common/horizontal-looper'
import { Carousel } from 'components/common/carousel'
import Bogota1 from 'assets/images/carousel/bogota/Bogota0.jpg'
import Bogota2 from 'assets/images/carousel/bogota/Bogota2.jpg'
import Bogota3 from 'assets/images/carousel/bogota/Bogota8.jpg'
import Bogota4 from 'assets/images/carousel/bogota/Bogota5.jpg'
import { Link } from 'components/common/link'
import { Snapshot } from 'components/common/snapshot'
import IconClock from 'assets/icons/icon_clock.svg'
import IconPeople from 'assets/icons/people.svg'
import IconLayers from 'assets/icons/layers.svg'
import IconTransactions from 'assets/icons/transactions.svg'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { useTranslations } from 'next-intl'
import css from './continuous-devcon.module.scss'
import HackerBasement from 'assets/images/hacker-basement.png'
import LinkIcon from 'assets/icons/link-indicator.svg'
import HackerBasementTag from 'assets/images/hacker-basement-tag.png'
import Image from 'next/image'
import SwipeToScroll from 'components/common/swipe-to-scroll'

export default pageHOC(function ContinuousDevcon(props: any) {
  const intl = useTranslations()

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
              <Link to="#involve" className="text-uppercase hover-underline font-lg bold">
                {props.sections['hacker-basement'].title}
                <ArrowRight />
              </Link>
              <Link to="#hubs" className="text-uppercase hover-underline font-lg bold">
                {intl('cd_community_hubs')}
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="right">
            <Snapshot
              items={[
                {
                  Icon: IconClock,
                  title: intl('cd_extended_hours'),
                  right: '08:00 AM  — 11:00 PM',
                },
                {
                  Icon: IconPeople,
                  title: intl('cd_community_curation'),
                  right: (
                    <Link indicateExternal className="theme-color" to="https://forum.devcon.org">
                      {intl('cd_devcon_forum')}
                    </Link>
                  ),
                },
                {
                  Icon: IconLayers,
                  title: props.sections['hacker-basement'].title,
                  right: (
                    <Link indicateExternal className="theme-color" to="#involve">
                      {intl('cd_learn_more')}
                    </Link>
                  ),
                },
                {
                  Icon: IconTransactions,
                  title: intl('cd_community_hubs'),
                  right: (
                    <Link indicateExternal className="theme-color" to="#hubs">
                      {intl('cd_apply_now')}
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section className="clear-top border-top margin-bottom border-bottom clear-bottom" id="details">
          <h2 className="clear-bottom">{props.sections['continuous-what'].title}</h2>
          <div className="two-columns" id="details">
            <div className="left">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['continuous-what'].data.left,
                }}
              ></div>
            </div>
            <div className="right">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['continuous-what'].data.right,
                }}
              ></div>

              <div className={css['links']}>
                <Link to="#hubs" className="text-uppercase hover-underline font-lg bold">
                  {intl('cd_community_hubs')}
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
          <h2 className="clear-bottom">{props.sections['community-and-ecosystem-hubs-at-devcon-bogota'].title}</h2>

          <HorizontalLooper slow unpadded>
            <p className={`${css['rainbow']} ${css['infinite-text']}`}>{intl('cd_infinite_text_1')}&nbsp;</p>
          </HorizontalLooper>

          <div className="two-columns clear-top clear-bottom border-bottom margin-bottom" id="details">
            <div className="left">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['community-and-ecosystem-hubs-at-devcon-bogota'].data.left,
                }}
              ></div>
            </div>
            <div className="right">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['community-and-ecosystem-hubs-at-devcon-bogota'].data.right,
                }}
              ></div>
            </div>
          </div>

          <div className="two-columns margin-bottom" id="details">
            <div className="left">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['community-and-ecosystem-hubs-at-devcon-bogota-2'].data.left,
                }}
              ></div>
              <div className={css['links']}>
                <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                  {intl('cd_apply_hub')}
                  <LinkIcon />
                </Link>
                <Link to="https://forum.devcon.org/" className="text-uppercase hover-underline font-lg bold">
                  {intl('cd_devcon_forum')}
                  <LinkIcon />
                </Link>
              </div>
            </div>
            <div className="right">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: props.sections['community-and-ecosystem-hubs-at-devcon-bogota-2'].data.right,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section className={`${css['hacker-basement']} expand`} id="involve">
          <div className={css['background']}>
            <Image src={HackerBasement} alt="Hacker basement" layout="raw" />
          </div>
          <div className="section">
            <h2 className="clear-top clear-bottom">{props.sections['hacker-basement'].title}</h2>

            <HorizontalLooper slow unpadded>
              <p className={`${css['stroked']} ${css['infinite-text']}`}>{intl('cd_infinite_text_2')}&nbsp;</p>
            </HorizontalLooper>

            <div className="two-columns clear-top">
              <div className={`left`}>
                <div
                  className={`markdown ${css['text-body']}`}
                  dangerouslySetInnerHTML={{ __html: props.sections['hacker-basement'].body }}
                >
                  {/* <p>
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
                  </p> */}
                </div>
                <div className={css['links']}>
                  <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                    {intl('cd_apply_hub')}
                    <LinkIcon />
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
  const sections = await GetContentSections(
    [
      'continuous-what',
      'community-and-ecosystem-hubs-at-devcon-bogota-2',
      'community-and-ecosystem-hubs-at-devcon-bogota',
      'hacker-basement',
    ],
    context.locale
  )

  return {
    props: {
      ...globalData,
      sections,
      page,
    },
  }
}
