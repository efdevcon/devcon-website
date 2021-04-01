import React from 'react'
import css from './design.module.scss'

export default function Components() {
  return (
    <div>
        <h1>Colors</h1>
        <br/>

        <h2>Main</h2>
        <p className="text-primary">color-primary</p>
        <p className="text-secondary">color-secondary</p>
        <p className="text-tertiary">color-tertiary</p>
        <br/>
        <ul className={css['colors']}>
          <li className={css['bg-color-primary']}></li>
          <li className={css['bg-color-secondary']}></li>
          <li className={css['bg-color-tertiary']}></li>
        </ul>
        <br/>

        <h2>States</h2>
        <p className={css['color-success']}>color-success</p>
        <p className={css['color-success-light']}>color-success</p>
        <p className={css['color-error']}>color-error</p>
        <p className={css['color-error-light']}>color-error-light</p>
        <p className={css['color-warning']}>color-warning</p>
        <p className={css['color-warning-light']}>color-warning-light</p>
        <p className={css['color-info']}>color-info</p>
        <p className={css['color-info-light']}>color-info-light</p>
        <p className={css['color-light']}>color-light</p>
        <p className={css['color-light-light']}>color-light-light</p>
        <br/>
        <ul className={css['colors']}>
          <li className={css['bg-color-success']}></li>
          <li className={css['bg-color-success-light']}></li>
          <li className={css['bg-color-error']}></li>
          <li className={css['bg-color-error-light']}></li>
          <li className={css['bg-color-warning']}></li>
          <li className={css['bg-color-warning-light']}></li>
          <li className={css['bg-color-info']}></li>
          <li className={css['bg-color-info-light']}></li>
          <li className={css['bg-color-light']}></li>
          <li className={css['bg-color-light-light']}></li>
        </ul>
        <br/>
    </div>
  )
}