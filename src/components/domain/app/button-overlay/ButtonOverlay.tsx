import React from 'react'
import css from './button-overlay.module.scss'

type ButtonOverlayProps = {
  children?: React.ReactChild
  onClick: () => void
  text?: string
}

export const ButtonOverlay = (props: ButtonOverlayProps) => {
  return (
    <div data-type="button-overlay" onClick={props.onClick} className={`${css['container']} section`}>
      <div className={css['shift-end']}>
        <div className={css['content']}>
          {props.children}
          <span className={css['text']}>{props.text}</span>
        </div>
      </div>
    </div>
  )
}
