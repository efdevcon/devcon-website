import React from 'react'
import { Card } from './card'
import { Feed } from './feed'
import css from './news.module.scss'

const dummyData = [
  {
    date: new Date(),
    title: 'Titleru',
    type: 'twitter',
  },
  {
    date: new Date(),
    title: 'Titleru',
    type: 'twitter',
  },
  {
    date: new Date(),
    title: 'Titleru',
    type: 'twitter',
  },
  {
    date: new Date(),
    title: 'Titleru',
    type: 'twitter',
  },
  {
    date: new Date(),
    title: 'Titleru',
    type: 'twitter',
  },
]

export const News = () => {
  return (
    <>
      News!
      <Card />
      <Feed title="News feed" items={dummyData} />
    </>
  )
}
