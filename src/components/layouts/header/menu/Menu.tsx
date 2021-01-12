import React from 'react'
import css from './menu.module.scss'
import { Link } from 'src/components/common/link'
import { Navigation } from './navigation'
import { useSiteNavigationContext } from 'src/context/site-navigation-context'
import { Link as LinkType } from 'src/types/Link'

export const Menu = () => {
  const context = useSiteNavigationContext()

  return (
    <div className={css['menu']}>
      <div className={css['left']}>
        {context.data.top.map((i: LinkType) => {
          return (
            <Link key={`top-${i.url}`} external to={i.url} className={css['highlighted-link']}>
              {i.title}
            </Link>
          )
        })}
      </div>

      <div className={css['right']}>
        <Navigation />
      </div>
    </div>
  )
}
