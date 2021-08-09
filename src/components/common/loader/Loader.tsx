import React from 'react'
import css from './loader.module.scss'
// import { RefObject } from 'react'

type MessageType = 'loading' | 'error' | 'noResults'

type Message = {
  message: string | (() => string)
}

type LoaderProps = {
  asOverlay?: boolean
  //   relativeTo: RefObject<HTMLElement>
  loading?: boolean
  error?: boolean
  noResults?: boolean
  messages: {
    [K in MessageType]?: Message
  }
}

export const Loader = (props: LoaderProps) => {
  let className = css['loading-overlay']

  if (props.asOverlay) className += ` ${css['as-overlay']}`
  if (props.loading) className += ` ${css['loading']}`
  if (props.noResults) className += ` ${css['no-results']}`
  if (props.error) className = `${css['loading-overlay']} ${css['error']}`

  const currentState = (() => {
    if (props.error) return props.messages.error?.message || 'Error :-('
    if (props.loading) return props.messages.loading?.message || 'Loading...'
    if (props.noResults) return props.messages.noResults?.message || 'No results'
  })()

  return (
    <div className={className}>
      <div className={css['message']}>
        <span className={css['text']}>{currentState}</span>
        {props.loading && !props.error && <div className="spinner"></div>}
      </div>

      <div className={css['blur']}></div>
    </div>
  )
}
