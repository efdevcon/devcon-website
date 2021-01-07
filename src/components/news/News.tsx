import React from 'react'
import { Card } from 'src/components/common/card'
import { Feed } from './feed'
import css from './news.module.scss'
import moment from 'moment'
import Twitter from 'src/assets/icons/twitter.svg'

// interface CardProps {
//   title: string
//   description?: string
//   imageUrl?: string
//   linkUrl?: string
//   metadata?: string[]
// }

const data = [
  {
    title: 'Ticket Raffle is Live!',
    description: 'Some description!',
    linkUrl: '/en/',
    type: 'twitter',
    metadata: [moment(new Date()).format('ll'), '@EFDEVCON', <Twitter />],
  },
  {
    title: 'Ticket Raffle is Live!',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    linkUrl: '/en/',
    type: 'twitter',
    metadata: [moment(new Date()).format('ll'), '@EFDEVCON', <Twitter />],
  },
  {
    title: 'Ticket Raffle is Live!',
    description: 'Some description!',
    linkUrl: '/en/',
    type: 'twitter',
    metadata: [moment(new Date()).format('ll'), '@EFDEVCON', <Twitter />],
  },
  {
    title: 'Ticket Raffle is Live!',
    description: 'Some description!',
    linkUrl: '/en/',
    type: 'twitter',
    metadata: [moment(new Date()).format('ll'), '@EFDEVCON', <Twitter />],
  },
  {
    title: 'Ticket Raffle is Live!',
    description: 'Some description!',
    linkUrl: '/en/',
    type: 'twitter',
    metadata: [moment(new Date()).format('ll'), '@EFDEVCON', <Twitter />],
  },
]

export const News = () => {
  return (
    <div className={css['news-container']}>
      <h2 className="section-header">News</h2>
      <div className={css['body']}>
        <div className={css['cards']}>
          {data.slice(0, 2).map((item: any, index) => {
            return <Card key={index} {...item} />
          })}
        </div>
        <div className={css['feed']}>
          <Feed title="News feed" items={data} />
        </div>
      </div>
    </div>
  )
}
