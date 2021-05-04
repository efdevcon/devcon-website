import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Label, LabelProps } from './Label'

export default {
  title: 'Elements/Label',
  component: Label,
  argTypes: {
    type: { control: 'type' },
  },
} as Meta

const Template: Story<LabelProps> = args => <Label {...args} />

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  children: 'Success label',
}

export const Error = Template.bind({})
Error.args = {
  type: 'error',
  children: 'Error label',
}

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  children: 'Warning label',
}
