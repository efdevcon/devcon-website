import React from 'react'
import css from './menu.module.scss'
import { Link } from 'src/components/common/link'
import { Navigation } from './navigation'
import { usePageContext } from 'src/context/page-context'
import { Link as LinkType } from 'src/types/Link'

export const Menu = () => {
  const { navigation } = usePageContext()

  return (
    <div className={css['menu']}>
      <div className={css['left']}>
        {navigation.top.map((i: LinkType) => {
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
