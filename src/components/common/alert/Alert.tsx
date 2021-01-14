import React, { useState } from 'react'
import css from './alert.module.scss'
import { useIntl } from 'gatsby-plugin-intl'

import IconCircleCheck from 'src/assets/icons/circle_check.svg'
import IconCircleExclamation from 'src/assets/icons/circle_exclamation.svg'
import IconTriangleExclamation from 'src/assets/icons/triangle_exclamation.svg'
import IconCross from 'src/assets/icons/cross.svg'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'light'
  title?: string
  message?: string
  dismissable?: boolean
}

export function Alert(props: AlertProps) {
  const intl = useIntl()
  const [visible, setVisible] = useState(true)

  const RenderTitle = () => {
    if (props.title) return props.title

    switch (props.type) {
      case 'success':
        return intl.formatMessage({ id: 'success' })
      case 'error':
        return intl.formatMessage({ id: 'error' })
      case 'warning':
        return intl.formatMessage({ id: 'warning' })
      case 'info':
        return intl.formatMessage({ id: 'info' })
      default:
        return intl.formatMessage({ id: 'alert' })
    }
  }

  const RenderIcon = () => {
    switch (props.type) {
      case 'success':
        return <IconCircleCheck />
      case 'warning':
        return <IconTriangleExclamation />
      default:
        return <IconCircleExclamation />
    }
  }

  if (!visible) return <></>

  return (
    <div className={css[props.type]}>
      <div>{RenderIcon()}</div>
      <div className={css.message}>
        {props.dismissable && (
          <div className={css.right}>
            <span role="button" className={css.dismiss} onClick={() => setVisible(false)}>
              <IconCross />
            </span>
          </div>
        )}
        <p className={css.title}>{RenderTitle()}</p>
        {props.message && <p>{props.message}</p>}
      </div>
    </div>
  )
}
