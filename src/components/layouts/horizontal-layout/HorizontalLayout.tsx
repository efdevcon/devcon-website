import React, { Ref } from 'react'
import css from './horizontal-layout.module.scss'
import { Navigation } from './navigation'
import leftPad from 'src/utils/left-pad'
import { Link } from 'src/components/common/link'
import IconGithub from 'src/assets/icons/github.svg'
import IconGlobe from 'src/assets/icons/globe.svg'
import IconDiscussion from 'src/assets/icons/discussion.svg'
import { useIntl } from 'gatsby-plugin-intl'
import { useDrag, useGesture } from 'react-use-gesture'

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

export const scrollLock = {
  onWheel: (e: React.SyntheticEvent) => {
    const scrollable = e.currentTarget.scrollHeight > e.currentTarget.clientHeight

    if (scrollable) e.nativeEvent.stopImmediatePropagation()
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

      <div className={props.transparent ? `${css['content']} ${css['transparent']}` : css['content']} {...scrollProps}>
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
  const trackRef = React.useRef<HTMLDivElement>()
  const pageRefs = React.useRef<any>({})
  const navigationRef = React.useRef<any>()
  const lastX = React.useRef(0)
  const pages = props.children
  const pageWidth = React.useRef(0)
  const trackWidth = React.useRef(0)

  React.useEffect(() => {
    const element = document.getElementById('page-track')

    element.addEventListener('touchstart', e => {
      // is not near edge of view, exit
      if (e.pageX > 25 && e.pageX < window.innerWidth - 25) return

      // prevent swipe to navigate back gesture
      e.preventDefault()
    })
  }, [])

  // Resync when track changes size to ensure we're never scrolled outside the visible area
  React.useEffect(() => {
    if (!trackRef.current) return

    if (window.ResizeObserver) {
      const el = trackRef.current

      const observer = new window.ResizeObserver(entries => {
        const entry = entries[0]

        if (entry.contentBoxSize) {
          const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize
          pageWidth.current = borderBoxSize.inlineSize
          trackWidth.current = el.scrollWidth
        } else {
          pageWidth.current = entry.contentRect.width
          trackWidth.current = el.scrollWidth
        }

        // The resync happens on component mount, which clashes with the anchor navigating to a slide - we let the anchor do it's thing here
        const anchorWillSync = window.location.hash && !window.__anchor_handled

        if (!anchorWillSync) {
          navigationRef.current.goToSlide('syncCurrent')
        }
      })

      observer.observe(el)

      return () => {
        observer.unobserve(el)
      }
    }
  }, [])

  // Drag/hover handlers
  const bind = useGesture(
    {
      onDragStart: ({ event }) => {
        // event.preventDefault();
        // alert(updateChecker)
      },
      onDrag: state => {
        const [deltaX] = state.delta
        const nextX = Math.min(trackWidth.current - pageWidth.current, Math.max(0, lastX.current - deltaX))

        lastX.current = nextX

        trackRef.current.style.transform = `translateX(-${nextX}px)`
        trackRef.current.style.transition = 'none'
        trackRef.current.style.cursor = 'grabbing'
      },
      onDragEnd: state => {
        trackRef.current.style.transition = ''
        trackRef.current.style.cursor = ''

        const [movementX] = state.movement

        const threshold: number = Math.min(pageWidth.current / 10, 100)

        if (Math.abs(movementX) > pageWidth.current / 2) {
          // If we drag more than half a slides width, we're already on the next slide, so we just have to resync at that point
          navigationRef.current.goToSlide('syncCurrent')
        } else if (movementX > threshold) {
          navigationRef.current.goToSlide('prev')
        } else if (movementX < -threshold) {
          navigationRef.current.goToSlide('next')
        } else {
          navigationRef.current.goToSlide('syncCurrent')
        }
      },
    },
    { drag: { useTouch: true, threshold: 20 } }
  )

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
      <div ref={trackRef} {...bind()} id="page-track" className={css['page-track']}>
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
