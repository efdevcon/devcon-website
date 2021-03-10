import React, { Ref } from 'react'
import css from './horizontal-layout.module.scss'
import { Navigation } from './navigation'
import leftPad from 'src/utils/left-pad'
import { Link } from 'src/components/common/link'
import IconGithub from 'src/assets/icons/github.svg'
import IconGlobe from 'src/assets/icons/globe.svg'
import IconDiscussion from 'src/assets/icons/discussion.svg'
import { useIntl } from 'gatsby-plugin-intl'

type PageProps = {
  title: string
  index?: string
  children: React.ReactNode
}

type LinkType = {
  title: string
  url: string
  icon?: 'github' | 'forum' | 'web'
}

type PageContentProps = {
  backgroundText?: string
  links?: LinkType[]
  renderTopRight?: () => React.ReactNode
  bottomLinks?: LinkType[]
  title?: string
  index?: string
  children: React.ReactNode
  transparent?: boolean
  inverted?: boolean
  applyScrollLock?: boolean
}

let recentlyScrolled = false
let scrollTimeout: NodeJS.Timeout
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

const elementIsScrollable = (e: React.SyntheticEvent) => {
  return e.currentTarget.scrollHeight > e.currentTarget.clientHeight
}

export const scrollLock = {
  onScroll: (e: React.SyntheticEvent) => {
    // Disable scrolling if we recently scrolled scrolled the layout
    // if (recentlyScrolled) e.preventDefault()
  },
  onWheel: (e: React.SyntheticEvent) => {
    // Disable global scrolling if we haven't scrolled the layout recently
    // if (!recentlyScrolled ) e.nativeEvent.stopImmediatePropagation()

    if (elementIsScrollable(e)) e.nativeEvent.stopImmediatePropagation()
  },
}

export const Page = React.forwardRef((props: PageProps, ref: Ref<any>) => {
  return (
    <div className={css['page']} ref={ref}>
      {React.Children.map(props.children, Child => {
        return React.cloneElement(Child, {
          title: props.title,
          index: props.index,
        })
      })}
    </div>
  )
})

export const PageContent = (props: PageContentProps) => {
  const intl = useIntl()

  const renderIcon = (type: string) => {
    if (!type) return <></>

    switch (type) {
      case 'github':
        return (
          <span className={`${css['icon-link']}`}>
            <IconGithub />
          </span>
        )
      case 'forum':
        return (
          <span className={`${css['icon-link']}`}>
            <IconDiscussion />
          </span>
        )
      case 'web':
        return (
          <span className={`${css['icon-link']}`}>
            <IconGlobe />
          </span>
        )
    }
  }

  const backgroundTextClassName =
    props.backgroundText === intl.formatMessage({ id: 'rtd_community_events' })
      ? 'background-text-solid'
      : 'background-text-gradient'

  const bottomLinksClassName =
    props.backgroundText === intl.formatMessage({ id: 'rtd_frequently_asked_questions' })
      ? 'bottom-links-white'
      : 'bottom-links'

  const pageTitleClassName = props.inverted ? 'page-title-inverted' : 'page-title'

  const scrollProps = props.applyScrollLock ? scrollLock : {}

  return (
    <div className={css['layer']}>
      <div className={css['header']}>
        <h3 className={`${css[pageTitleClassName]} no-select`} data-index={props.index}>
          {props.title}
        </h3>

        {props.backgroundText && (
          <h2 className={`${css[backgroundTextClassName]} no-select`}>
            {props.backgroundText.split(' ').map((word, index) => {
              return <span key={index}>{word}</span>
            })}
          </h2>
        )}

        {props.renderTopRight && <div className={`${css['top-right']} no-select`}>{props.renderTopRight()}</div>}

        {props.links && (
          <div className={`${css['links']} no-select`}>
            {props.links.map((link: LinkType) => {
              return (
                <h3 key={link.url}>
                  <Link to={link.url} className={css['link-class']}>
                    {link.icon && renderIcon(link.icon)}
                    <span className={css['text']}>{link.title}</span>
                  </Link>
                </h3>
              )
            })}
          </div>
        )}
      </div>

      <div
        className={props.transparent ? `${css['content']} ${css['transparent']}` : css['content']}
        {...scrollProps}
        // onMouseDown={e => e.stopPropagation()}
      >
        {props.children}
      </div>

      <div className={`${css[bottomLinksClassName]} no-select`}>
        {props.bottomLinks &&
          props.bottomLinks.map((link: LinkType) => {
            return (
              <p key={link.url}>
                <Link to={link.url} indicateExternal>
                  {link.icon && renderIcon(link.icon)}
                  {link.title}
                </Link>
              </p>
            )
          })}
      </div>
    </div>
  )
}

export const HorizontalLayout = (props: any) => {
  const dragging = React.useRef<boolean>(false)
  const trackRef = React.useRef<HTMLDivElement>()
  const pageRefs = React.useRef<any>({})
  const navigationRef = React.useRef<any>()
  const lastX = React.useRef(0)
  const movementX = React.useRef(0)
  const pages = props.children
  const pageWidth = React.useRef(0)
  const trackWidth = React.useRef(0)

  // Resync when track changes size to ensure we're never scrolled outside the visible area
  React.useEffect(() => {
    if (isTouchDevice) return
    if (!trackRef.current) return

    if (window.ResizeObserver) {
      const el = trackRef.current

      const observer = new window.ResizeObserver(entries => {
        const entry = entries[0]
        const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize
        pageWidth.current = borderBoxSize.inlineSize
        trackWidth.current = el.scrollWidth
        navigationRef.current.goToSlide('syncCurrent')
      })

      observer.observe(el)

      return () => {
        observer.unobserve(el)
      }
    }
  }, [])

  const onDragStart = (e: React.SyntheticEvent) => {
    if (e.target.nodeName === 'INPUT') return

    e.preventDefault()
    document.activeElement.blur()

    dragging.current = true
    movementX.current = 0
  }

  const onDragEnd = () => {
    if (!dragging.current) return
    if (!trackRef.current) return
    if (isTouchDevice) return

    dragging.current = false
    trackRef.current.style.transition = ''
    trackRef.current.style.cursor = ''

    if (Math.abs(movementX.current) > pageWidth.current / 2) {
      // If we drag more than half a slides width, we're already on the next slide, so we just have to resync at that point
      navigationRef.current.goToSlide('syncCurrent')
    } else if (movementX.current > 100) {
      navigationRef.current.goToSlide('prev')
    } else if (movementX.current < -100) {
      navigationRef.current.goToSlide('next')
    } else {
      navigationRef.current.goToSlide('syncCurrent')
    }

    movementX.current = 0
  }

  const onDragMove = (e: React.SyntheticEvent) => {
    if (!trackRef.current) return
    if (isTouchDevice) return
    if (!dragging.current) return
    e.preventDefault()

    const speed = 1.5
    const nextX = Math.min(trackWidth.current - pageWidth.current, Math.max(0, lastX.current - e.movementX * speed))

    movementX.current += e.movementX * speed

    // Animate element directly for performance - resync state when drag ends.
    trackRef.current.style.transform = `translateX(-${nextX}px)`
    // Disable transition (enabled for smoother scrolling), because it works poorly when dragging
    trackRef.current.style.transition = 'none'
    trackRef.current.style.cursor = 'grabbing'

    lastX.current = nextX
  }

  return (
    <div className={css['layout-container']}>
      <Navigation
        ref={navigationRef}
        links={props.links}
        lastX={lastX}
        pages={pages}
        pageTrackRef={trackRef}
        pageRefs={pageRefs}
      />

      <div
        ref={trackRef}
        onMouseDown={onDragStart}
        onTouchDown={onDragStart}
        onMouseLeave={onDragEnd}
        onMouseUp={onDragEnd}
        onTouchUp={onDragEnd}
        onTouchMove={onDragMove}
        onMouseMove={onDragMove}
        className={css['page-track']}
      >
        {React.Children.map(pages, (Page, index) => {
          return React.cloneElement(Page, {
            ref: (ref: HTMLDivElement) => {
              pageRefs.current[Page.props.title] = ref
            },
            navigationRef,
            index: leftPad(index + ''),
          })
        })}
      </div>
    </div>
  )
}
