import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Link } from 'components/common/link'
import { Menu } from './menu'
import { Strip } from './strip'
// import { Search } from './search'
import css from './header.module.scss'
import { useIsScrolled } from 'hooks/useIsScrolled'
import HeaderLogo from './HeaderLogo'
import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

type HeaderProps = {
  withStrip?: boolean
  withHero?: boolean
  className?: string
}

export const Header = React.memo(({ withStrip, withHero, className }: HeaderProps) => {
  const ref = useRef(null)
  const router = useRouter()
  const isScrolled = useIsScrolled()
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  useOnOutsideClick(ref, () => setSearchOpen(false))

  // const searchActive = searchOpen && !foldoutOpen

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

  let headerContainerClass = `${css['header-container']}`
  let headerClass = `${css['header']}`

  if (foldoutOpen) headerClass += ` ${css['foldout-open']}`
  if (className) headerContainerClass += ` ${className}`

  const body = (
    <header id="header-container" className={headerContainerClass}>
      {withStrip && <Strip withHero={withHero} />}
      <div id="header" className={headerClass} ref={ref}>
        <div className="section">
          <div className={`${css['menu-container']}`}>
            <Link to={`/${router.locale}`}>
              <HeaderLogo />
            </Link>

            <Menu
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              foldoutOpen={foldoutOpen}
              setFoldoutOpen={setFoldoutOpen}
            />
          </div>
          {/* {isArchive && <Search open={searchActive} />} */}
        </div>
      </div>
    </header>
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
})

Header.displayName = 'Header'
