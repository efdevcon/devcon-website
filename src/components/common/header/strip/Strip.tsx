import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import { LanguageToggle } from 'src/components/common/language-toggle'
import css from './strip.module.scss'

export const Strip = () => {
  const intl = useIntl()

  return (
    <div className={css['strip']}>
      <p>COVID 19 Update - Notification</p>
      <LanguageToggle />
    </div>
  )
}
