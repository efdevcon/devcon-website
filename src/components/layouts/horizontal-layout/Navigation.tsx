import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import css from './navigation.module.scss'
import IconMenu from 'src/assets/icons/menu.svg'
import IconClose from 'src/assets/icons/cross.svg'
import IconGlobe from 'src/assets/icons/globe.svg'
import IconRoad from 'src/assets/icons/road.svg'
import ethLogo from 'src/assets/images/eth.svg'
import devconLogoSimple from 'src/assets/images/devcon-logo-simple.svg'
import leftPad from 'src/utils/left-pad'
import HeaderLogo from '../header/HeaderLogo'
import { Newsletter } from 'src/components/newsletter'
import { SocialMedia } from 'src/components/layouts/footer'
import { Link as LinkType } from 'src/types/Link'
import { Link } from 'src/components/common/link'
import { COPYRIGHT_NOTICE } from 'src/utils/constants'
import usePageInView from './usePageInView'
import { useLanguageToggle } from 'src/components/layouts/header/strip/language-toggle'

type PageRefs = {
  [key: string]: React.Ref<HTMLDivElement>
}

type NavigationProps = {
  pages: React.ReactNode
  links: LinkType[]
  pageRefs: PageRefs
  pageTrackRef: any
  lastX: any
}

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
const hashSlug = (slug: string) => '#' + slug.replaceAll(' ', '-').toLowerCase()

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

  if (isTouchDevice) {
    props.pageTrackRef.current.scrollLeft = offsetLeft
  } else {
    props.pageTrackRef.current.style.transition = `none`
    props.pageTrackRef.current.style.transform = `translateX(-${offsetLeft}px)`

    setImmediate(() => {
      props.pageTrackRef.current.style.transition = ``
    })

    props.lastX.current = offsetLeft
  }

  if (setFoldoutOpen) {
    window.location.replace(hashSlug(pageTitle))

    setFoldoutOpen(false)
  }
}

export const Navigation = (props: NavigationProps) => {
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)
  const pageProps: any[] | null | undefined = React.Children.map(props.pages, page => page.props)
  const intl = useIntl()
  const pageInView = usePageInView(props.pageRefs)

  React.useEffect(() => {
    const hash = window.location.hash

    // console.log('child')
    // console.log(props.pageRefs, 'p title')

    if (hash) {
      pageProps?.find(({ title: pageTitle }) => {
        if (hashSlug(pageTitle) === hash) {
          navigateToSlide(pageTitle, props)
        }
      })
    }
  }, [pageProps, props])

  // Keep anchor in sync
  React.useEffect(() => {
    if (pageInView) window.location.replace(hashSlug(pageInView))
  }, [pageInView])

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

              if (selected) className += ` ${css['selected']}`

              return (
                <li className={className} key={title} onClick={() => navigateToSlide(title, props, setFoldoutOpen)}>
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
            <img src={devconLogoSimple} alt="Devcon logo" />
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

              if (selected) className += ` ${css['selected']}`

              return (
                <li
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
}
