import React from 'react'
import { LanguageToggle } from './language-toggle'
import IconVirus from 'src/assets/icons/virus.svg'
import { Label } from 'src/components/common/label'
import css from './strip.module.scss'

type HeaderProps = {
  withHero?: boolean
}

export const Strip = ({ withHero }: HeaderProps) => {
  let className = css['strip']

  if (withHero) className += ` ${css['hero']}`

  return (
    <div className={className} id="strip">
      <div className={css['body']}>
        <div className={css['notification']}>
          <IconVirus />
          <Label type="notification">COVID-19 UPDATE</Label>
          <p>Notification</p>
        </div>
        <LanguageToggle />
      </div>
    </div>
  )
}
