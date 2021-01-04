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
  const headerEl = React.useRef() as any

  let className = css['header-wrapper']

  if (withHero) {
    className += ` ${css['hero']}`
  }

  if (isScrolled) {
    className += ` ${css['scrolled']}`
  }

  return (
    <div className={className}>
      <div ref={headerEl} className={css['header-wrapper-inner']}>
        <header className={css['header']}>
          <Strip />

          <div className={css['menu-container']}>
            <h1>
              <Link to={`/${intl.locale}/`}>{intl.formatMessage({ id: 'title' })}</Link>
            </h1>

            <Menu />
          </div>
        </header>
      </div>
    </div>
  )
}
