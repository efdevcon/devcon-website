import React from 'react'
import css from './typography.module.scss'

export const Typography = () => {
  return (
    <div className={css['typography']}>
      <p className="font-primary">Primary</p>
      <p className="font-secondary">Secondary</p>
      <br />
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <br />
      <p className="title">Title</p>
      <p className="subtitle">Subtitle</p>
      <br />
      <p className="massive">Massive</p>
      <p className="font-xs">Extra Small (NOT IN DESIGN SYSTEM)</p>
      <p className="font-sm">Small</p>
      <p className="font-lg">Large</p>
      <br />
      <p className="text-italic">Italic</p>
      <p className="text-bold">Bold</p>
      <p className="text-uppercase">Upppercase</p>
      <p className="text-lowercase">Lowercase</p>
      <p className="text-linethrough">Linethrough</p>
      <p className="text-underline">Underline</p>
      <p className="text-no-underline">No underline</p>

      {/* <p className="black">Paragraph bold</p> */}
    </div>
  )
}

const meta = {
  title: 'Typography',
}

export default meta
