import React from 'react'
import Slider from 'react-slick'
import { Card } from 'src/components/common/card'
import { Feed } from './feed'
import css from './news.module.scss'
import moment from 'moment'
// import Twitter from 'src/assets/icons/twitter.svg'
import { NewsItem } from 'src/types/NewsItem'
import { useIntl } from 'gatsby-plugin-intl'
// import { useSiteNavigationContext } from 'src/context/site-navigation-context'

type NewsProps = {
  data?: any
  className?: string
}

// Add better typescript here
// + move to page context provider and do formatting there; discuss with Wesley how to handle non-navigation context data
const formatNewsData = (data: any): Array<any> => {
  return data.map((node: any) => {
    const { date, description, metadata, title, url } = node.frontmatter as NewsItem

    const formattedDate = moment(date).format('ll')
    const formattedMetaData = [formattedDate, metadata]

    // Need a stronger regex here probably
    // if (url.includes('twitter')) formattedMetaData.push(<Twitter />)

    return {
      title,
      description,
      linkUrl: url,
      date,
      metadata: formattedMetaData,
    }
  })
}

const sortNews = (data: any): Array<any> => {
  return data.slice().sort((a: any, b: any) => {
    const d1 = new Date(a.frontmatter?.date)
    const d2 = new Date(b.frontmatter?.date)

    return d1 < d2 ? 1 : -1
  })
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
  const data = formatNewsData(sortNews(rawData.nodes))
  const intl = useIntl()

  return (
    <div className="section">
      <div className={css['news-container']}>
        <h2 className="spaced">{intl.formatMessage({ id: 'news' })}</h2>
        {/* Only visible on mobile */}
        <div className={css['slider']}>
          <Slider {...settings}>
            {data.map((item: any, index) => {
              return <Card className={`${css['card']} ${css['slider']}`} key={index} {...item} />
            })}
          </Slider>
        </div>
        <div className={css['body']}>
          <div className={css['cards']}>
            {data.slice(0, 2).map((item: any, index) => {
              return <Card className={css['card']} key={index} {...item} />
            })}
          </div>
          <div className={css['feed']}>
            <Feed title={intl.formatMessage({ id: 'news feed' })} items={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
