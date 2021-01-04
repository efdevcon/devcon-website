import React from 'react'
import css from './design-system.module.scss'

export function DesignSystem() {
  return (
    <div>
      <br />
      <p>Various components for testing the design system</p>
      <p>
        <u>Headers:</u>
      </p>

      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <title>Title</title>

      <p>
        <u>Buttons:</u>
      </p>

      <div className="w-full flex justify-center items-center">
        <button className={css['module-test']}>Main Button</button>
        <button className="button-secondary">Main Button</button>
        <button>Main Button</button>
      </div>
    </div>
  )
}
