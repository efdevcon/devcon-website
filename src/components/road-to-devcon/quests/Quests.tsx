import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { IntlShape, useIntl } from 'gatsby-plugin-intl'
import css from './quests.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import Slider from 'react-slick'
import { Card } from 'src/components/common/card'
import { HashTag } from 'src/components/road-to-devcon/intro'
import star from 'src/assets/images/star.svg'
import moment from 'moment'
import { useQuests } from 'src/hooks/useQuests'

const quests = (intl: IntlShape) => [
  {
    title: 'Quest 1',
    issuer: 'ETHSTAKER',
    url: 'https://devcon.org',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Aug 21 2021',
  },
  {
    title: 'Quest 2',
    issuer: 'ETHSTAKER',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Jan 21 2021',
  },
  {
    title: 'Quest 3',
    issuer: 'ETHSTAKER',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Dec 21 2021',
  },
  {
    title: 'Quest 4',
    issuer: 'ETHSTAKER',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Jan 21 2022',
  },
  {
    title: 'Quest 5',
    issuer: 'ETHSTAKER',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Jan 21 2021',
  },
  {
    title: 'Quest 6',
    issuer: 'ETHSTAKER',
    description:
      'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen',
    startDate: 'Jan 21 2021',
  },
]

export const Quests = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const sliderRef = React.useRef<Slider>()
  const [activeFilter, setActiveFilter] = React.useState<string>('upcoming')
  const quests = useQuests()
  const filteredQuests = quests.filter(quest => {
    const now = new Date()
    const questBegin = moment(quest.startDate).toDate()

    if (activeFilter === 'upcoming') {
      return now < questBegin
    } else {
      return questBegin < now
    }
  })
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["quests.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 800, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  `)

  const nCards = filteredQuests.length + 1

  const getNCardsToShow = (base: number) => {
    const n = Math.min(nCards, base)

    if (filteredQuests.length === 0) {
      return base === 1 ? 1 : 2
    }

    // If there are more cards than can fit in one view, add 0.1 to peak the next card
    if (nCards > n) return n + 0.1

    return n
  }

  const slickSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: getNCardsToShow(3),
    arrows: false,
    slidesToScroll: Math.min(3, nCards),
    touchThreshold: 100,
    swipe: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: getNCardsToShow(2),
          slidesToScroll: Math.min(1, nCards),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: getNCardsToShow(1),
          slidesToScroll: Math.min(1, nCards),
        },
      },
    ],
  }

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}>
        <div className={css['quests']}>
          <img src={star} className={`${css['star']} ${css['one']}`} />
          <img src={star} className={`${css['star']} ${css['two']}`} />
          <img src={star} className={`${css['star']} ${css['three']}`} />
          <img src={star} className={`${css['star']} ${css['four']}`} />
          <img src={star} className={`${css['star']} ${css['five']}`} />
          <img src={star} className={`${css['star']} ${css['six']}`} />
          <GatsbyImage fluid={data.allFile.nodes[0].childImageSharp.fluid} />
        </div>
      </div>
      <HashTag className={css['hash-tag']} />

      <PageContent
        whiteBackgroundText
        transparent
        inverted
        backgroundText={intl.formatMessage({ id: 'rtd_quests' })}
        bottomLinks={[
          {
            url: 'https://github.com/efdevcon/DIPsbla',
            title: intl.formatMessage({ id: 'rtd_quests_join_discord' }),
            icon: 'discord',
          },
          {
            url: 'https://github.com/efdevcon/DIPs',
            title: intl.formatMessage({ id: 'rtd_quests_create' }),
            icon: 'medal',
          },
        ]}
      >
        <div className={css['container']} data-no-drag="true">
          {/* Use filter component once/if RTD converges with static phase branch*/}
          <div className={css['filter']}>
            <p onClick={() => setActiveFilter('upcoming')} className={activeFilter === 'upcoming' ? css['active'] : ''}>
              {intl.formatMessage({ id: 'rtd_quests_upcoming' })}
            </p>
            <p onClick={() => setActiveFilter('past')} className={activeFilter === 'past' ? css['active'] : ''}>
              {intl.formatMessage({ id: 'rtd_quests_past' })}
            </p>
          </div>
          <Slider ref={sliderRef} {...slickSettings}>
            <div className={`${css['first']} ${css['card']}`} data-no-drag="true">
              <h2 className={css['title']}>
                {intl.formatMessage({ id: 'rtd' })} — {intl.formatMessage({ id: 'rtd_quests' })}
              </h2>
              <p className={css['cta']}>{intl.formatMessage({ id: 'rtd_quests_cta' })}</p>
              <p className={css['description']}>{intl.formatMessage({ id: 'rtd_quests_description' })}</p>
            </div>

            {filteredQuests.length === 0 ? (
              <div className={css['no-results']}>
                {activeFilter === 'upcoming' ? (
                  <p>{intl.formatMessage({ id: 'rtd_quests_upcoming_no_results' })} :-(</p>
                ) : (
                  <p>{intl.formatMessage({ id: 'rtd_quests_past_no_results' })}</p>
                )}
              </div>
            ) : (
              filteredQuests.map(quest => {
                return (
                  <Card
                    key={quest.title}
                    title={quest.title}
                    imageUrl={quest.image}
                    className={css['card']}
                    customReadMore={intl.formatMessage({ id: 'rtd_quests_participate' }).toUpperCase()}
                    metadata={[quest.startDate, quest.issuer]}
                    linkUrl={quest.url}
                    description={quest.description}
                  />
                )
              })
            )}
          </Slider>
        </div>
      </PageContent>
    </Page>
  )
})
