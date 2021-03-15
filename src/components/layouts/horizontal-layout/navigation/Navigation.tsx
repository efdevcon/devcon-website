import React, { useImperativeHandle } from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import css from './navigation.module.scss'
import IconMenu from 'src/assets/icons/menu.svg'
import IconClose from 'src/assets/icons/cross.svg'
import IconGlobe from 'src/assets/icons/globe.svg'
import IconRoad from 'src/assets/icons/road.svg'
import ethLogo from 'src/assets/images/eth.svg'
import leftPad from 'src/utils/left-pad'
import HeaderLogo from '../../header/HeaderLogo'
import { Newsletter } from 'src/components/newsletter'
import { SocialMedia } from 'src/components/layouts/footer'
import { Link as LinkType } from 'src/types/Link'
import { Link } from 'src/components/common/link'
import { COPYRIGHT_NOTICE } from 'src/utils/constants'
import usePageInView, { hashSlug } from './usePageInView'
import { useLanguageToggle } from 'src/components/layouts/header/strip/language-toggle'

type PageRefs = {
  [key: string]: React.Ref<HTMLDivElement>
}

type NavigationProps = {
  pages: any[]
  links: LinkType[]
  pageRefs: PageRefs
  pageTrackRef: any
  lastX: any
}

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

const LanguageToggle = () => {
  const { redirectPath, currentLanguage } = useLanguageToggle()

  return (
    <div className={`no-select ${css['language-toggle']}`}>
      <Link className={currentLanguage === 'en' ? 'semi-bold' : ''} to={`/en/${redirectPath}`}>
        EN
      </Link>
      <Link className={currentLanguage === 'es' ? 'semi-bold' : ''} to={`/es/${redirectPath}`}>
        ES
      </Link>
    </div>
  )
}

export const navigateToSlide = (pageTitle: string, props: any, setFoldoutOpen?: any) => {
  const targetSlide = props.pageRefs.current[pageTitle]

  if (!targetSlide) return

  const offsetLeft = targetSlide.offsetLeft

  props.pageTrackRef.current.style.transform = `translateX(-${offsetLeft}px)`
  props.lastX.current = offsetLeft

  if (setFoldoutOpen) {
    window.location.replace(hashSlug(pageTitle))
    setFoldoutOpen(false)
  }
}

export const Navigation = React.forwardRef((props: NavigationProps, ref: any) => {
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)
  const [hover, setHover] = React.useState(-1)
  const pageProps: any[] | null | undefined = React.Children.map(props.pages, page => page.props)
  const intl = useIntl()
  const pageInView = usePageInView(props.pageRefs)
  const wheelLock = React.useRef(false)

  const goToSlide = (action: 'next' | 'prev' | 'syncCurrent', lockWheel?: true) => {
    const currentPageIndex = props.pages.findIndex(page => page.props.title === pageInView)
    let nextPageIndex

    if (action === 'prev') {
      nextPageIndex = Math.max(0, currentPageIndex - 1)
    } else if (action === 'next') {
      const lastPageIndex = props.pages.length - 1

      nextPageIndex = Math.min(lastPageIndex, currentPageIndex + 1)
    }

    const isSamePage = nextPageIndex === currentPageIndex

    if (isSamePage) return

    // When resizing the window, we have to resynchronize the position of the current page so it snaps into the new viewport size
    if (action === 'syncCurrent') {
      nextPageIndex = currentPageIndex
    }

    const nextPage = pageProps[nextPageIndex]

    if (!nextPage) return

    if (lockWheel) {
      wheelLock.current = true

      setTimeout(() => {
        wheelLock.current = false
      }, 300)
    }

    navigateToSlide(nextPage.title, props, setFoldoutOpen)
  }

  useImperativeHandle(ref, () => ({
    goToSlide,
  }))

  // Wheel scrolling
  // React.useEffect(() => {
  //   const scrollHandler = (e: any) => {
  //     if (wheelLock.current) return
  //     if (!props.pageTrackRef.current) return
  //     if (e.deltaY === 0) return

  //     console.log(e, 'e');

  //     const scrolledLeft = e.deltaX > 0;
  //     const scrolledDown = e.deltaY > 0

  //     goToSlide(scrolledDown ? 'next' : 'prev', true)
  //   }

  //   document.addEventListener('wheel', scrollHandler)

  //   return () => {
  //     document.removeEventListener('wheel', scrollHandler)
  //   }
  // }, [pageInView])

  // Sync page position with anchor on mount
  React.useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      props.pageTrackRef.current.style.transition = 'none'

      pageProps?.find(({ title: pageTitle }) => {
        if (hashSlug(pageTitle) === hash) {
          navigateToSlide(pageTitle, props)

          // Dirty fix for letting anchor navigate on mount - other hooks can read the window object to see if anchor has been handled or not before deciding to navigate
          setTimeout(() => {
            props.pageTrackRef.current.style.transition = ''
            window.__anchor_handled = true
          }, 100)
        }
      })
    }
  }, [])

  return (
    <>
      <div className={`${css['navigation']} ${foldoutOpen ? css['open'] : ''}`}>
        <div className={css['logo-mobile']}>
          <HeaderLogo />
        </div>

        <div className={css['toggle']} onClick={() => setFoldoutOpen(!foldoutOpen)}>
          <IconMenu />
          <IconClose />
        </div>

        <div className={css['nav-middle']}>
          <LanguageToggle />

          <ul className={css['slide-nav']}>
            {pageProps?.map(({ title, icon }, index) => {
              const selected = pageInView === title

              let className = 'text-uppercase font-secondary no-select'

              if (selected || hover === index) className += ` ${css['selected']}`

              return (
                <li
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(-1)}
                  className={className}
                  key={title}
                  onClick={() => navigateToSlide(title, props, setFoldoutOpen)}
                >
                  {icon || leftPad(index + '')}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={css['logo']}>
          <img src={ethLogo} alt="Ethereum logo" />
        </div>

        {/* Need a layer with a filled in background so we avoid content overlapping when menu slides in */}
        <div className={css['backdrop']} />

        <div className={css['foldout']}>
          <div className={css['header']}>
            <HeaderLogo />
            <IconRoad className="override" style={{ marginTop: '-3px' }} />
          </div>

          <div className={css['globe-icon']}>
            <IconGlobe />
            <LanguageToggle /> {/* 0 opacity language toggle to synchronize the height of the sidebar */}
          </div>

          <ul className={css['nav']}>
            {pageProps?.map(({ title }, index) => {
              const selected = pageInView === title

              let className = 'text-uppercase font-secondary no-select'

              if (selected || hover === index) className += ` ${css['selected']}`

              return (
                <li
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(-1)}
                  className={className}
                  key={title}
                  data-index={leftPad(index + '')}
                  onClick={() => navigateToSlide(title, props, setFoldoutOpen)}
                >
                  {title}
                </li>
              )
            })}
          </ul>

          {props.links && (
            <nav className={css['links']}>
              {props.links.map((link, index) => {
                return (
                  <Link key={index} className="bold" to={link.url}>
                    {link.title}
                  </Link>
                )
              })}
            </nav>
          )}

          <div className={css['nav-footer']}>
            <div>
              <SocialMedia />
              <Newsletter />
              <div className={css['info']}>
                <p className="bold">{intl.formatMessage({ id: 'rtd_footer' })}</p>
                <p>{COPYRIGHT_NOTICE}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={css['inline-nav']}>
          <IconRoad className="abc" />

          <ul className={css['inline-nav-list']}>
            {pageTitles?.map((title, index) => {
              const selected = title === pageInView

              return (
                <li
                  key={title}
                  className={selected ? css['selected-inline'] : undefined}
                  data-index={leftPad(index + '')}
                  onClick={() => navigateToSlide(title, props, setFoldoutOpen)}
                >
                  {leftPad(index + '')}
                </li>
              )
            })}
          </ul>
        </div> */}
      </div>
    </>
  )
})
