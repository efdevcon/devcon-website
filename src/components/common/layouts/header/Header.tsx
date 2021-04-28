import React, { useEffect } from 'react'
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
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)

  // Prevent page scroll when menu is open
  useEffect(() => {
    if (foldoutOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [foldoutOpen])

  let headerClass = `${css['header']}`

  if (foldoutOpen) headerClass += ` ${css['foldout-open']}`

  const body = (
    <div className={css['header-container']}>
      <Strip withHero={withHero} />
      <header id="header" className={headerClass}>
        <div className={css['menu-container']}>
          <Link to={`/${intl.locale}/`}>
            <HeaderLogo />
          </Link>
          <Menu foldoutOpen={foldoutOpen} setFoldoutOpen={setFoldoutOpen} />
        </div>
      </header>
    </div>
  )

  if (withHero) {
    let headerContainerClass = `${css['header-fixed-container']}`

    if (isScrolled) {
      headerContainerClass += ` ${css['scrolled']}`
    }

    return (
      <div className={headerContainerClass} id="header-strip">
        {body}
      </div>
    )
  }

  return body
}
