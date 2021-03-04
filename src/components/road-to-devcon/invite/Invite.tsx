import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './invite.module.scss'
import { Share } from 'src/components/common/share'
import { GifScroller } from './GifScroller'

export const Invite = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <GifScroller />
      <p className={css['hash-tag']}>#ROADTODEVCON</p>
      <div className={css['container']}>
        <div className={css['text']}>
          {/* <div className={css['title']}> */}
          <div className={css['backdrop']}>
            <p className="bold">LET'S CELEBRATE TOGETHER AT</p>
            <h1>DEVCON</h1>
          </div>

          <h2>BOGOTA</h2>
          {/* </div> */}

          <span>
            <Share />
          </span>
        </div>
      </div>
    </Page>
  )
})
