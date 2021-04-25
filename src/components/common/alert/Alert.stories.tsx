import React from 'react'
import { Story } from '@storybook/react'
import { Alert } from './Alert'

export const Alerts = () => {
  return <Alert type="warning" title="test" />
}

const meta = {
  title: 'Elements/Alerts',
  argTypes: {
    className: {
      control: 'type',
    },
  },
}

export default meta
