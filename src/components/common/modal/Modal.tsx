import React from 'react'
import { createPortal } from 'react-dom'
import css from './modal.module.scss'
import IconClose from 'src/assets/icons/cross.svg'

type ModalProps = {
  open: boolean
  className?: string
  close: () => void
  children: React.ReactNode
  [key: string]: any
}

export const Modal = ({ close, ...props }: ModalProps) => {
  if (!props.open) return false

  let contentClass = css['content']

  if (props.className) contentClass += ` ${props.className}`

  return createPortal(
    <div className={css['modal']} onClick={close}>
      <div
        onClick={e => {
          e.stopPropagation()
        }}
        {...props}
        className={contentClass}
      >
        <IconClose onClick={close} className={`icon ${css['close']}`} />
        {props.children}
      </div>
    </div>,
    document.body
  )
}
