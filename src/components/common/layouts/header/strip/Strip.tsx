import React from 'react'
import { LanguageToggle } from './language-toggle'
import IconVirus from 'src/assets/icons/virus.svg'
import { Label } from 'src/components/common/label'
import { usePageContext } from 'src/context/page-context'
import css from './strip.module.scss'

type HeaderProps = {
  withHero?: boolean
}

export const Strip = ({ withHero }: HeaderProps) => {
  const { notification } = usePageContext()
  let className = css['strip']

  if (withHero) className += ` ${css['hero']}`

  return (
    <div className={className} id="strip">
      <div className={css['body']}>
        <div className={css['notification']}>
          <IconVirus />
          {notification.label && <Label type="notification">{notification.label}</Label>}
          <p>{notification.title}</p>
        </div>

        <LanguageToggle />
      </div>
    </div>
  )
}
