import React from 'react'
import { Link } from 'src/components/common/link'
import { useIntl } from 'gatsby-plugin-intl'
import { Menu } from './menu'
import { Strip } from './strip'
import css from './header.module.scss'
import useIsScrolled from 'src/hooks/useIsScrolled'

type HeaderProps = {
  withHero?: boolean
}

export function Header({ withHero }: HeaderProps) {
  const intl = useIntl()
  const isScrolled = useIsScrolled()

  const body = (
    <>
      <Strip />
      <header className={css['header']}>
        <div className={css['menu-container']}>
          <h1>
            <Link to={`/${intl.locale}/`}>{intl.formatMessage({ id: 'title' })}</Link>
          </h1>

          <Menu />
        </div>
      </header>
    </>
  )

  if (withHero) {
    let className = css['header-fixed-container']

    if (isScrolled) {
      className += ` ${css['scrolled']}`
    }

    return <div className={className}>{body}</div>
  }

  return body
}
