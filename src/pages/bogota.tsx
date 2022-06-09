import React from 'react'
import { PageHero } from 'components/common/page-hero'
import { FAQ } from 'components/domain/faq'
import Page from 'components/common/layouts/page'
import themes from './themes.module.scss'
import { Carousel } from 'components/common/carousel'
import { Snapshot } from 'components/common/snapshot'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { useTranslations } from 'next-intl'
import { GetFAQ, GetPage, GetContentSections } from 'services/page'
import { getGlobalData } from 'services/global'
import { toHtml } from 'utils/markdown'
import { Tags } from 'components/common/tags'
import moment from 'moment-timezone'
import IconClock from 'assets/icons/icon_clock.svg'
import { Link } from 'components/common/link'
import IconCurrency from 'assets/icons/icon_currency.svg'
import IconGlobe from 'assets/icons/icon_globe.svg'
import IconSun from 'assets/icons/icon_sun.svg'
import IconWater from 'assets/icons/icon_water.svg'
import Bogota1 from 'assets/images/carousel/bogota/Bogota0.jpg'
import Bogota2 from 'assets/images/carousel/bogota/Bogota2.jpg'
import Bogota3 from 'assets/images/carousel/bogota/Bogota8.jpg'
import Bogota4 from 'assets/images/carousel/bogota/Bogota5.jpg'

export default pageHOC(function CityGuideTemplate(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()
  const faqs = props.faq.filter((faq: any) => faq.category.id === 'location')

  return (
    <Page theme={themes['bogota']}>
      <PageHero
        path={[{ text: <span className="bold">Bogotá</span> }, { text: 'City Guide' }]}
        navigation={[
          {
            title: intl('city_guide_title'),
            to: '#location',
          },
          {
            title: intl('city_guide_things_todo'),
            to: '#things-to-do',
          },
          {
            title: intl('city_guide_why_bogota'),
            to: '#why-bogota',
          },
          {
            title: intl('city_guide_safety'),
            to: '#safety',
          },
          {
            title: intl('city_guide_areas'),
            to: '#areas',
          },
          {
            title: intl('city_guide_faq'),
            to: '#FAQ',
          },
          {
            title: intl('city_guide_map'),
            to: '#map',
          },
        ]}
      />

      <div className="section">
        <div className="two-columns clear-bottom" id="location">
          <div className="left section-markdown">
            <h2 className="spaced">{intl('city_guide_title')}</h2>
            <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />
          </div>

          <div className="right">
            <Snapshot
              items={[
                {
                  Icon: IconClock,
                  title: intl('snapshot_timezone'),
                  left: 'GMT -5',
                  right: moment().tz('America/Bogota').format('hh:mm A'),
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
                {
                  Icon: IconWater,
                  title: intl('snapshot_water'),
                  left: intl('snapshot_tap_water'),
                  right: (
                    <Link indicateExternal to="#FAQ">
                      {intl('snapshot_FAQs')}
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <section id="carousel" className="expand clear-bottom">
          <Carousel
            title="Bogota Colombia"
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

        {props.sections['things-to-do'] && (
          <>
            <h2 id="things-to-do" className="spaced">
              {props.sections['things-to-do'].title}
            </h2>
            <div className="two-columns border-bottom clear-bottom">
              <div className="left section-markdown">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['things-to-do'].data.left) }}
                />
              </div>
              <div className="right">
                <div dangerouslySetInnerHTML={{ __html: toHtml(props.sections['things-to-do'].data.right) }} />
              </div>
            </div>
          </>
        )}

        {props.sections['why-devcon-in-bogota'] && (
          <>
            <h2 id="why-bogota" className="spaced clear-top">
              {props.sections['why-devcon-in-bogota'].title}
            </h2>

            <div className="two-columns clear-bottom">
              <div className="left section-markdown">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['why-devcon-in-bogota'].data.left) }}
                />
              </div>
              <div className="right">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['why-devcon-in-bogota'].data.right) }}
                />
              </div>
            </div>
          </>
        )}

        {props.sections['is-bogota-safe'] && (
          <>
            <h2 id="safety" className="spaced clear-top border-top">
              {props.sections['is-bogota-safe'].title}
            </h2>

            <div className="two-columns clear-bottom border-bottom">
              <div className="left section-markdown">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['is-bogota-safe'].data.left) }}
                />
              </div>
              <div className="right">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['is-bogota-safe'].data.right) }}
                />
              </div>
            </div>
          </>
        )}

        {props.sections['what-areas-to-stay'] && (
          <>
            <h2 id="areas" className="spaced clear-top border-top">
              {props.sections['what-areas-to-stay'].title}
            </h2>

            <div className="two-columns clear-bottom border-bottom">
              <div className="left section-markdown">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['what-areas-to-stay'].data.left) }}
                />
              </div>
              <div className="right section-markdown">
                <div
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: toHtml(props.sections['what-areas-to-stay'].data.right) }}
                />
              </div>
            </div>
          </>
        )}

        <section id="FAQ" className="clear-top">
          <FAQ
            data={[{ id: 'something', title: 'Frequently Asked Questions', questions: faqs }]}
            customCategoryTitle="FAQ"
            noSearch
          />
        </section>

        <Tags items={pageContext?.current?.tags} viewOnly />

        <iframe
          className="expand"
          id="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15907.197000779528!2d-74.0926271!3d4.6298745!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x23880f62017a68ac!2sAgora%20Bogot%C3%A1%20Convention%20Center!5e0!3m2!1sda!2sdk!4v1652018534291!5m2!1sda!2sdk"
          width="100%"
          height="500px"
          loading="lazy"
        ></iframe>
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/bogota', context.locale)
  const sections = await GetContentSections(
    ['things-to-do', 'why-devcon-in-bogota', 'is-bogota-safe', 'what-areas-to-stay'],
    context.locale
  )

  return {
    props: {
      ...globalData,
      page,
      faq: await GetFAQ(context.locale),
      sections,
    },
  }
}