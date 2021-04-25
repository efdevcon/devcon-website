import React from 'react'
import { Link } from 'src/components/common/link'
import { useIntl } from 'gatsby-plugin-intl'
import { Menu } from './menu'
import { Strip } from './strip'
import css from './header.module.scss'
import useIsScrolled from 'src/hooks/useIsScrolled'
import HeaderLogo from './HeaderLogo'

type HeaderProps = {
  withHero?: boolean
  className?: string
}

export function Header({ withHero }: HeaderProps) {
  const intl = useIntl()
  const isScrolled = useIsScrolled()

  const body = (
    <>
      <Strip withHero={withHero} />
      <header id="header" className={css['header']}>
        <div className={css['menu-container']}>
          <Link to={`/${intl.locale}/`}>
            <HeaderLogo />
          </Link>
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
