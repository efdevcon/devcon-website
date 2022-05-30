import React from 'react'
import css from './sts.module.scss'
import { useDrag } from 'react-use-gesture'
import useDimensions from 'react-cool-dimensions'

type SwipeToScrollProps = {
  noBounds?: boolean
  stopped?: boolean
  focusRef?: React.RefObject<HTMLElement>
  children: React.ReactChild | React.ReactChild[]
}

const SwipeToScroll = (props: SwipeToScrollProps) => {
  const el = React.useRef<any>()
  const [maxScrolled, setMaxScrolled] = React.useState(0)
  const lastX = React.useRef(0)
  // const focusCompleted = React.useRef(false)

  const reset = () => {
    if (lastX.current && el.current) {
      lastX.current = 0
      el.current.style.transform = `translateX(0px)`
    }
  }

  // When element changes size, record its max scroll boundary (don't want to be able to drag beyond it!)
  const { observe } = useDimensions({
    onResize: ({ width }) => {
      reset()

      if (el.current && el.current.scrollWidth) {
        const maxScroll = el.current.scrollWidth - width
        setMaxScrolled(maxScroll)

        // Scroll to focusable element if defined
        // if (!focusCompleted.current && props.focusRef && props.focusRef.current) {
        //   const focusElement = props.focusRef.current
        //   const offsetLeft = focusElement.offsetLeft
        //   lastX.current = Math.min(offsetLeft, maxScroll)
        //   el.current.style.transition = 'all 0.7s ease-out'
        //   el.current.style.transform = `translateX(${-lastX.current}px)`
        //   el.current.addEventListener('transitionend', () => {
        //     el.current.style.transition = 'none'
        //   })
        //   focusCompleted.current = true
        // }
      }
    },
  })

  // When window changes size, reset
  React.useEffect(() => {
    const resizeListener = reset

    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [props.stopped])

  const bind = useDrag(({ down, delta }) => {
    if (props.stopped) return

    lastX.current = Math.min(Math.max(0, lastX.current - delta[0]), maxScrolled)
    el.current.style.transform = `translateX(-${lastX.current}px)`

    if (down) {
      el.current.style.cursor = 'grabbing'
    } else {
      el.current.style.cursor = 'auto'
    }
  })

  let className = css['container']

  if (props.noBounds) {
    className += ` ${css['no-bounds']}`
  }

  return (
    <div {...bind()} className={className} data-type="swipe-to-scroll-container">
      <div
        ref={element => {
          el.current = element
          observe(element)
        }}
        className={css['swipe-to-scroll']}
      >
        {props.children}
      </div>
    </div>
  )
}

export default SwipeToScroll
