import React from 'react'
import { useCallback } from 'react'
import { useGesture } from 'react-use-gesture'
import css from './horizontal-scroller.module.scss'

// Dragging shouldn't lead to a click
const usePreventClickWhileDragging = (elementRef: any, threshold = 10) => {
  const preventClick = React.useRef(false)
  const deltaX = React.useRef(0)
  const initialX = React.useRef(0)

  // Have to add events directly to the DOM node itself
  React.useEffect(() => {
    const handleDown = (e: Event) => {
      preventClick.current = false

      initialX.current = e.clientX
    }
    const handleMove = (e: Event) => {
      preventClick.current = true

      deltaX.current = Math.abs(initialX.current - e.clientX)
    }
    const handleClick = (e: Event) => {
      if (preventClick.current && deltaX.current > threshold) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    elementRef.current.addEventListener('mousedown', handleDown)
    elementRef.current.addEventListener('mousemove', handleMove)
    elementRef.current.addEventListener('click', handleClick)

    // Have to keep the reference alive to remove event listeners
    const el = elementRef.current

    return () => {
      el.removeEventListener('mousedown', handleDown)
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('click', handleClick)
    }
  }, [elementRef, threshold])
}

export const HorizontalScroller = (props: any) => {
  const elementRef = React.useRef<any>(null)
  const elementWidth = React.useRef(0)
  const scrollWidth = React.useRef(0)
  const scrolledBy = React.useRef(0)
  // const [gradientVisibleLeft, setGradientVisibleLeft] = React.useState(false)
  const [gradientVisibleRight, setGradientVisibleRight] = React.useState(false)

  usePreventClickWhileDragging(elementRef)

  const syncGradients = useCallback(() => {
    const contentOverflowing = scrollWidth.current > elementWidth.current

    if (contentOverflowing) {
      const isScrolledToEnd = scrolledBy.current + elementWidth.current >= scrollWidth.current
      // const isScrolled = scrolledBy.current > 0

      if (isScrolledToEnd) {
        setGradientVisibleRight(false)
      } else {
        setGradientVisibleRight(true)
      }

      // if (isScrolled) {
      //   setGradientVisibleLeft(true)
      // } else {
      //   setGradientVisibleLeft(false)
      // }
    }
  }, [])

  const bind = useGesture(
    {
      onDrag: state => {
        const [deltaX] = state.delta
        const nextX = Math.min(scrollWidth.current - elementWidth.current, Math.max(0, scrolledBy.current - deltaX))

        scrolledBy.current = nextX

        elementRef.current.style.transform = `translateX(-${nextX}px)`
        elementRef.current.style.transition = 'none'
        elementRef.current.style.cursor = 'grabbing'
        // elementRef.current.style['touch-action'] = 'none'

        syncGradients()
      },
      onDragEnd: () => {
        elementRef.current.style.transition = ''
        elementRef.current.style.cursor = ''
        // elementRef.current.style['touch-action'] = ''
      },
    },
    { drag: { useTouch: true, threshold: 20 } }
  )

  React.useEffect(() => {
    if (window.ResizeObserver) {
      const el = elementRef.current

      if (!el) return

      const observer = new window.ResizeObserver(entries => {
        const entry = entries[0]

        scrollWidth.current = el.scrollWidth

        if (entry.borderBoxSize) {
          const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize

          elementWidth.current = borderBoxSize.inlineSize
        } else {
          elementWidth.current = el.offsetWidth
        }

        scrolledBy.current = 0

        elementRef.current.style.transform = `translateX(0px)`

        syncGradients()
      })

      observer.observe(el)

      return () => {
        observer.unobserve(el)
      }
    }
  }, [])

  let className = css['horizontal-scroller']
  let gradientsClassName = css['gradients']

  if (typeof window !== 'undefined' && !window.ResizeObserver) className += ` ${css['no-resize-observer']}`
  if (gradientVisibleRight) gradientsClassName += ` ${css['gradient-right']}`
  // if (gradientVisibleLeft) gradientsClassName += ` ${css['gradient-left']}`

  return (
    <div className={gradientsClassName}>
      <div className={className} {...bind()} ref={elementRef} data-type="horizontal-scroller">
        {props.children}
      </div>
    </div>
  )
}
