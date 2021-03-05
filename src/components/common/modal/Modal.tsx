import React from 'react'
import { createPortal } from 'react-dom'
import css from './modal.module.scss'
import IconClose from 'src/assets/icons/cross.svg'

type ModalProps = {
  open: boolean
  className?: string
  close: () => void
  children: React.ReactNode
}

export const Modal = (props: ModalProps) => {
  if (!props.open) return false

  let contentClass = css['content']

  if (props.className) contentClass += ` ${props.className}`

  return createPortal(
    <div className={css['modal']} onClick={props.close}>
      <div
        className={contentClass}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <IconClose onClick={props.close} className={`icon ${css['close']}`} />
        {props.children}
      </div>
    </div>,
    document.body
  )
}
