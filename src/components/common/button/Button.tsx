import React from 'react'
import css from './button.module.scss'

export const Button = (props: any) => {
  const buttonRef = React.useRef<HTMLDivElement>()
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  const onMouseMove = (e: React.SyntheticEvent) => {
    if (buttonRef.current === undefined) return

    var rect = e.target.getBoundingClientRect()
    var x = e.clientX - rect.left // x position within the element.
    var y = e.clientY - rect.top // y position within the element.

    setX(x)
    setY(y)
  }

  let style = props.style
  let className = css['button']

  if (props.className) {
    className = `${className} ${props.className}`
  }

  if (x || y) {
    style = {
      ...props.style,
      '--mouse-x': x,
      '--mouse-y': y,
    }
  }

  return (
    <button
      ref={buttonRef}
      {...props}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        setX(0)
        setY(0)
      }}
      style={style}
    >
      <span className={css['background']}></span>
      <span className={css['text']}>{props.children}</span>
    </button>
  )
}
