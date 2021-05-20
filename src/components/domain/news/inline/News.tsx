import React from 'react'
import Slider from 'react-slick'
import { Card } from 'src/components/common/card'
import { Feed } from 'src/components/common/feed'
import css from './news.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import { formatNewsData } from '../formatNewsData'

type NewsProps = {
  data?: any
  className?: string
}

const settings = {
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 2.1,
  slidesToScroll: 2,
  touchThreshold: 100,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 410,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
      },
    },
  ],
}

export const News = ({ data: rawData }: NewsProps) => {
  const newsItems = formatNewsData(rawData.nodes)
  const intl = useIntl()

  return (
    <div className="section">
      <div className={css['news-container']}>
        <h2 className="spaced">{intl.formatMessage({ id: 'news' })}</h2>
        {/* Only visible on mobile */}
        <div className={css['slider']}>
          <Slider {...settings}>
            {newsItems.map((item: any, index) => {
              return <Card className={`${css['card']} ${css['slider']}`} key={index} {...item} />
            })}
          </Slider>
        </div>
        <div className={css['body']}>
          <div className={css['cards']}>
            {newsItems.slice(0, 2).map((item: any, index) => {
              return <Card className={css['card']} key={index} {...item} />
            })}
          </div>
          <div className={css['feed']}>
            <Feed inline title={intl.formatMessage({ id: 'news feed' })} items={newsItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
