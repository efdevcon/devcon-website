import React from 'react'
import css from './menu.module.scss'
import { Link } from 'src/components/common/link'
import { Navigation } from './navigation'
import { useIntl } from 'gatsby-plugin-intl'

export const Menu = () => {
  const intl = useIntl()

  return (
    <div className={css['menu']}>
      <div className={css['left']}>
        <Link external to="https://archive.devcon.org/" className={css['highlighted-link']}>
          {intl.formatMessage({ id: 'archive' })}
        </Link>
        <Link external to="https://forum.devcon.org/" className={css['highlighted-link']}>
          {intl.formatMessage({ id: 'forum' })}
        </Link>
        <Link external to="https://blog.ethereum.org/category/devcon/" className={css['highlighted-link']}>
          {intl.formatMessage({ id: 'blog' })}
        </Link>
      </div>

      <div className={css['right']}>
        <Navigation />
      </div>
    </div>
  )
}
