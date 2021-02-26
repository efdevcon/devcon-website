import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import css from './navigation.module.scss'
import IconMenu from 'src/assets/icons/menu.svg'
import IconClose from 'src/assets/icons/cross.svg'
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

export const Navigation = (props: NavigationProps) => {
  const [foldoutOpen, setFoldoutOpen] = React.useState(false)
  const pageTitles: string[] | null | undefined = React.Children.map(props.pages, page => page.props.title)
  const intl = useIntl()

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

        <div className={css['logo']}>
          <img src={ethLogo} alt="Ethereum logo" />
        </div>

        {/* Need a layer with a filled in background so we avoid content overlapping when menu slides in */}
        <div className={css['backdrop']} />

        <div className={css['foldout']}>
          <div className={css['header']}>
            <img src={devconLogoSimple} alt="Devcon logo" />
            <IconRoad className="abc" />
          </div>

          <ul className={css['nav']}>
            {pageTitles?.map((title, index) => {
              return (
                <li
                  className="text-uppercase font-secondary"
                  key={title}
                  data-index={leftPad(index + 1 + '')}
                  onClick={() => {
                    const offsetLeft = props.pageRefs.current[title].offsetLeft

                    if (isTouchDevice) {
                      props.pageTrackRef.current.scrollLeft = offsetLeft
                    } else {
                      props.pageTrackRef.current.style.transform = `translateX(-${offsetLeft}px)`

                      props.lastX.current = offsetLeft
                    }
                  }}
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
            <SocialMedia />
            <Newsletter />
            <div className={css['info']}>
              <p className="bold">{intl.formatMessage({ id: 'rtd_footer' })}</p>
              <p>{COPYRIGHT_NOTICE}</p>
            </div>
          </div>
        </div>

        <div className={css['inline-nav']}>
          <IconRoad className="abc" />

          <ul className={css['inline-nav-list']}>
            {pageTitles?.map((title, index) => {
              return (
                <li
                  key={title}
                  data-index={leftPad(index + 1 + '')}
                  onClick={() => {
                    const offsetLeft = props.pageRefs.current[title].offsetLeft

                    if (isTouchDevice) {
                      props.pageTrackRef.current.scrollLeft = offsetLeft
                    } else {
                      props.pageTrackRef.current.style.transform = `translateX(-${offsetLeft}px)`

                      props.lastX.current = offsetLeft
                    }
                  }}
                >
                  {leftPad(index + 1 + '')}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className={css['drag-to-continue']}>{intl.formatMessage({ id: 'drag_to_continue' })} →</div>
    </>
  )
}
