import React from 'react'
import Slider from 'react-slick'
import { Card } from 'src/components/common/card'
import { Feed } from 'src/components/common/feed'
import css from './news.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import { formatNewsData } from '../formatNewsData'
import { NewsItem } from 'src/types/NewsItem'
import moment from 'moment'

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
            {newsItems.map((item: NewsItem, index) => {
              let formattedItem = item

              if (item.url?.includes('twitter')) {
                formattedItem = {
                  ...formattedItem,
                  title: intl.formatMessage({ id: 'news_tweet' }),
                }
              }

              return (
                <Card
                  className={`${css['card']} ${css['slider']}`}
                  key={index}
                  metadata={[moment.utc(formattedItem.date).format('MMM D, YYYY')]}
                  {...formattedItem}
                />
              )
            })}
          </Slider>
        </div>
        <div className={css['body']}>
          <div className={css['cards']}>
            {newsItems.slice(0, 2).map((item: any, index) => {
              if (item.url?.includes('twitter')) {
                item.title = intl.formatMessage({ id: 'news_tweet' })
              }

              return (
                <Card
                  className={css['card']}
                  metadata={[moment.utc(item.date).format('MMM D, YYYY')]}
                  key={index}
                  {...item}
                />
              )
            })}
          </div>
          <div className={css['feed']}>
            <Feed inline title={intl.formatMessage({ id: 'news_feed' })} items={newsItems.slice(2)} />
          </div>
        </div>
      </div>
    </div>
  )
}
