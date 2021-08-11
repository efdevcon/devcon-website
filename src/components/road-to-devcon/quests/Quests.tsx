import React, { useEffect } from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './quests.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import Slider from 'react-slick'
import { Card } from 'src/components/common/card'
import { HashTag } from 'src/components/road-to-devcon/intro'
import star from 'src/assets/images/star.svg'
import moment from 'moment'
import { Quest } from 'src/types/Quest'
import { Arrows } from 'src/components/blog-overview'

const useSlideState = (quests: any[]) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [cardsPerSlide, setCardsPerSlide] = React.useState(0)

  // Have to compensate for injected cards
  const extraCards = quests.length === 0 ? 2 : 1

  return {
    cardsPerSlide,
    currentIndex,
    setCurrentIndex,
    setCardsPerSlide,
    canNext: currentIndex < quests.length + extraCards - cardsPerSlide,
    canBack: currentIndex > 0,
  }
}

export const Quests = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const sliderRef = React.useRef<Slider>()
  const quests: Quest[] = props.quests
  const [activeFilter, setActiveFilter] = React.useState<string>('upcoming')
  const filteredQuests = quests.filter(quest => {
    const now = new Date()
    const questBegin = moment(quest.startDate, 'MMM D, YYYY').toDate()

    if (activeFilter === 'upcoming') {
      return now < questBegin
    } else {
      return questBegin < now
    }
  })
  const slideState = useSlideState(filteredQuests)

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["quests.png", "no-quests-hearts.png"] } }) {
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
    beforeChange: (_: any, next: number) => {
      if (slideState.setCurrentIndex) slideState.setCurrentIndex(next)
    },
    onReInit: () => {
      if (!sliderRef.current) return

      const { state, props: sliderSettings } = sliderRef.current

      const currentBreakpoint = state.breakpoint
      const breakpoints = sliderSettings.responsive

      const activeBreakpoint =
        breakpoints?.find(({ breakpoint }) => {
          return breakpoint === currentBreakpoint
        })?.settings || slickSettings

      const nextCardsPerSlide = activeBreakpoint?.slidesToShow

      if (slideState.cardsPerSlide !== nextCardsPerSlide) slideState.setCardsPerSlide(nextCardsPerSlide)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: getNCardsToShow(2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: getNCardsToShow(1),
          slidesToScroll: 1,
        },
      },
    ],
  }

  const setFilter = (nextFilter: string) => {
    if (nextFilter === activeFilter) {
      sliderRef.current.slickGoTo(1)
    }

    setActiveFilter(nextFilter)
  }

  const isMounted = React.useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      sliderRef.current.slickGoTo(1, false)
    }
  }, [activeFilter])

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
          <GatsbyImage fluid={data.allFile.nodes[1].childImageSharp.fluid} />
        </div>
      </div>
      <HashTag className={css['hash-tag']} />

      <PageContent
        whiteBackgroundText
        transparent
        inverted
        backgroundText={intl.formatMessage({ id: 'rtd_quests' })}
        renderTopRight={() => <Arrows noSwipe sliderRef={sliderRef} {...slideState} />}
        bottomLinks={[
          {
            url: 'https://discord.gg/hqtfuwfQBW',
            title: intl.formatMessage({ id: 'rtd_quests_join_discord' }),
            icon: 'discord',
          },
          {
            url: 'https://forum.devcon.org/c/quests/10',
            title: intl.formatMessage({ id: 'rtd_quests_create' }),
            icon: 'medal',
          },
        ]}
      >
        {/* attrib data-no-drag is used by the horizontal layout to prevent dragging the entire layout on certain elements */}
        <div className={css['container']} data-no-drag={!slideState.canBack && !slideState.canNext ? 'false' : 'true'}>
          {/* Use filter component once/if RTD converges with static phase branch */}
          <div className={css['filter']}>
            <p onClick={() => setFilter('upcoming')} className={activeFilter === 'upcoming' ? css['active'] : ''}>
              {intl.formatMessage({ id: 'rtd_quests_upcoming' })}
            </p>
            <p onClick={() => setFilter('past')} className={activeFilter === 'past' ? css['active'] : ''}>
              {intl.formatMessage({ id: 'rtd_quests_past' })}
            </p>
          </div>
          <Slider key={activeFilter} ref={sliderRef} {...slickSettings}>
            <div className={`${css['first']} ${css['card']} no-select`}>
              <h2 className={css['title']}>
                {intl.formatMessage({ id: 'rtd' })} — {intl.formatMessage({ id: 'rtd_quests' })}
              </h2>
              <p className={css['cta']}>{intl.formatMessage({ id: 'rtd_quests_cta' })}</p>
              <p className={css['description']}>{intl.formatMessage({ id: 'rtd_quests_description' })}</p>
            </div>

            {filteredQuests.length === 0 ? (
              <div className={css['no-results']}>
                <Card
                  title={intl.formatMessage({ id: 'rtd_quests_no_upcoming' })}
                  linkUrl={'https://forum.devcon.org/c/quests/10'}
                  imageUrl={data.allFile.nodes[0].childImageSharp.fluid}
                  description={intl.formatMessage({ id: 'rtd_quests_no_upcoming_description' })}
                  customReadMore={intl.formatMessage({ id: 'rtd_quests_create' })}
                  className={`${css['card']} ${css['no-quests']}`}
                />
              </div>
            ) : (
              filteredQuests.map(quest => {
                return (
                  <Card
                    key={quest.title}
                    title={quest.title}
                    imageUrl={quest.image}
                    className={`${css['card']} ${activeFilter === 'past' && css['past']}`}
                    customReadMore={intl.formatMessage({ id: 'rtd_quests_learn_more' })}
                    metadata={[quest.startDate, quest.issuer]}
                    linkUrl={quest.url}
                    disabled={activeFilter === 'past'}
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
