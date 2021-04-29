import React from 'react'

export const Basic = () => {
  return <button>Basic</button>
}

export const Colors = () => {
  return (
    <>
      <button>Default</button>
      <button className="white">White</button>
      <button className="white inverted">White Inverted</button>
      <button className="light-blue">Light Blue</button>
      <button className="light-blue inverted">Light Blue Inverted</button>
    </>
  )
}

export const Sizes = () => {
  return (
    <>
      <button className="lg icon">Large</button>
      <button>Regular</button>
      <button className="sm">Small</button>
    </>
  )
}

export const Squared = () => {
  // TO-DO: Rendering icons is a bit tricky in storybook due to how they're loaded on the gatsby side
  return (
    <>
      <button className="light-blue lg square">+</button>
      <button className="light-blue square">+</button>
      <button className="light-blue sm square">+</button>
    </>
  )
}

const meta = {
  title: 'Elements/Button',
  argTypes: {
    className: {
      control: 'type',
    },
  },
}

export default meta
