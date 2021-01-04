import React from 'react'
import { LanguageToggle } from './language-toggle'
import css from './strip.module.scss'

export const Strip = () => {
  return (
    <div className={css['strip']}>
      <p>COVID 19 Update - Notification</p>
      <LanguageToggle />
    </div>
  )
}
