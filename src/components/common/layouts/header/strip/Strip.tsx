import React from 'react'
import { LanguageToggle } from './language-toggle'
import { Label } from 'components/common/label'
import { usePageContext } from 'context/page-context'
import css from './strip.module.scss'
import { Link } from 'components/common/link'

type HeaderProps = {
  withHero?: boolean
}

export const Strip = ({ withHero }: HeaderProps) => {
  const context = usePageContext()
  let className = `section ${css['strip']}`

  if (withHero) className += ` ${css['hero']}`

  if (context?.notification === undefined) return null

  // const title = context?.notification.title

  const title = 'Wow check out devcon its a pretty cool event!'

  return (
    <div className={className} id="strip">
      <div className={css['body']}>
        <div className={css['notification']}>
          {/* <IconVirus /> */}
          {/* {context?.notification.label && <Label type={context?.notification.labelType || 'notification'}>{context?.notification.label}</Label>} */}

          {context?.notification.url ? (
            <Link to={context?.notification.url} indicateExternal className="hover-underline">
              {title}
            </Link>
          ) : (
            <p>{title}</p>
          )}
        </div>

        <LanguageToggle />
      </div>
    </div>
  )
}
