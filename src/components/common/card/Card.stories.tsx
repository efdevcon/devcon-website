import React from 'react'
import { Story } from '@storybook/react'
import { Card } from './Card'

export const Cards = () => {
  return <Card title="test" />
}

const meta = {
  title: 'Elements/Cards',
  argTypes: {
    className: {
      control: 'type',
    },
  },
}

export default meta
