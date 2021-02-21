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

type PageRefs = {
  [key: string]: Ref<HTMLDivElement>
}

type NavigationProps = {
  pages: React.ReactNode
  pageRefs: PageRefs
  setScrollX: any
}

const isTouchDevice = matchMedia('(hover: none)').matches

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
          <img src={ethLogo} />
        </div>

        {/* Need a layer with a filled in background so we avoid content overlapping when menu slides in */}
        <div className={css['backdrop']} />

        <div className={css['foldout']}>
          <div className={css['header']}>
            <img src={devconLogoSimple} />
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
                    if (isTouchDevice) {
                      props.pageTrackRef.current.scrollLeft = props.pageRefs.current[title].offsetLeft
                    } else {
                      props.setScrollX(props.pageRefs.current[title].offsetLeft)
                    }
                  }}
                >
                  {title}
                </li>
              )
            })}
          </ul>

          <div className={css['nav-footer']}>
            <p>SOCIAL MEDIA ICONS</p>
            <p>Subscribe to newsletter</p>
            <p>Enter email address</p>
            <p>Subscribe</p>
            {intl.formatMessage({ id: 'rtd_footer' })}
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
                    if (isTouchDevice) {
                      props.pageTrackRef.current.scrollLeft = props.pageRefs.current[title].offsetLeft
                    } else {
                      props.setScrollX(props.pageRefs.current[title].offsetLeft)
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
