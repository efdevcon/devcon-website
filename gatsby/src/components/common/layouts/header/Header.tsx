import React, { useEffect, useRef } from 'react'
import { Link } from 'src/components/common/link'
import { useIntl } from 'gatsby-plugin-intl'
import { Menu } from './menu'
import { Strip } from './strip'
import { useLocation } from '@reach/router'
import { Search } from './search'
import css from './header.module.scss'
import { useIsScrolled } from 'src/hooks/useIsScrolled'
import HeaderLogo from './HeaderLogo'
import HeaderLogoArchive from './HeaderLogoArchive'
import { useOnOutsideClick } from 'src/hooks/useOnOutsideClick'

type HeaderProps = {
  withStrip?: boolean
  withHero?: boolean
  className?: string
}

// const useIsScrolledDown = () => {
//   const [didScrollDown, setDidScrolledDown] = React.useState(false)
//   const lastScrollDistance = React.useRef(0)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollDistance = window.scrollY

//       const scrolledDown = currentScrollDistance > lastScrollDistance.current && currentScrollDistance > 0

//       if (scrolledDown) {
//         if (!didScrollDown) {
//           setDidScrolledDown(true)
//         }
//       } else {
//         if (didScrollDown) {
//           setDidScrolledDown(false)
//         }
//       }

//       lastScrollDistance.current = currentScrollDistance
//     }

//     window.addEventListener('scroll', handleScroll)

//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [didScrollDown])

//   return didScrollDown
// }

export const Header = React.memo(({ withStrip, withHero, className }: HeaderProps) => {
  const ref = useRef(null)
  const intl = useIntl()
  const isScrolled = useIsScrolled()
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const location = useLocation()
  const isArchive = location.pathname.startsWith('/archive')
  useOnOutsideClick(ref, () => setSearchOpen(false))

  const searchActive = searchOpen && !foldoutOpen

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
  // if (isApp && isScrolled) headerClass += ` ${css['hide']}`

  const body = (
    <header id="header-container" className={headerContainerClass}>
      {withStrip && <Strip withHero={withHero} />}
      <div id="header" className={headerClass} ref={ref}>
        <div className={css['menu-container']}>
          <Link to={isArchive ? '/archive' : `/${intl.locale}/`}>
            {isArchive ? <HeaderLogoArchive /> : <HeaderLogo />}
          </Link>
          <Menu
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            foldoutOpen={foldoutOpen}
            setFoldoutOpen={setFoldoutOpen}
          />
        </div>
        {isArchive && <Search open={searchActive} />}
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
