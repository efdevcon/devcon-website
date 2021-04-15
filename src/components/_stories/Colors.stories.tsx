import React from 'react'
import colors from './colors.module.scss'
import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks'

export default {
  title: 'Design System',
}

export const Colors = () => {
  return (
    <ColorPalette>
      <ColorItem title="main" subtitle="test" colors={['blue']} />
    </ColorPalette>
  )
}

// export const H1 = () => <h1>Heading 1</h1>
// export const H2 = () => <h2>Heading 2</h2>
// export const H3 = () => <h3>Heading 3</h3>
// export const H4 = () => <h4>Heading 4</h4>
// export const H5 = () => <h5>Heading 5</h5>
// export const H6 = () => <h6>Heading 6</h6>
// export const p = () => <p>Paragraph</p>
// export const bold = () => <p className="bold">Paragraph bold</p>

// import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks'

// <Meta title="Design System/Colors" />

// # Colors

// <ColorPalette>
//   <ColorItem title="theme.color.primary" subtitle="Coral" colors={[color.primary]} />
//   <ColorItem title="theme.color.secondary" subtitle="Blue" colors={[color.secondary]} />
//   <ColorItem title="theme.color.tertiary" subtitle="Grey" colors={[color.tertiary]} />
//   <ColorItem title="theme.color.positive" subtitle="Green" colors={[color.positive]} />
//   <ColorItem title="theme.color.warning" subtitle="Ochre" colors={[color.warning]} />
//   <ColorItem title="theme.color.negative" subtitle="Red" colors={[color.negative]} />
//   <ColorItem title="theme.color.orange" subtitle="Orange" colors={[color.orange]} />
//   <ColorItem title="theme.color.gold" subtitle="Gold" colors={[color.gold]} />
//   <ColorItem title="theme.color.green" subtitle="Green" colors={[color.green]} />
//   <ColorItem title="theme.color.seafoam" subtitle="Seafoam" colors={[color.seafoam]} />
//   <ColorItem title="theme.color.purple" subtitle="Purple" colors={[color.purple]} />
//   <ColorItem title="theme.color.ultraviolet" subtitle="Ultraviolet" colors={[color.ultraviolet]} />
//   <ColorItem
//     title="Monochrome"
//     colors={[
//       color.darkest,
//       color.darker,
//       color.dark,
//       color.mediumdark,
//       color.medium,
//       color.mediumlight,
//       color.light,
//       color.lighter,
//       color.lightest,
//     ]}
//   />
// </ColorPalette>
