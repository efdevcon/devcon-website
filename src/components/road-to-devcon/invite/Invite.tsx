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
      <div className={css['container']}>
        <div className={css['text']}>
          <div className={css['top']}>
            <p>LET'S CELEBRATE TOGETHER AT</p>
            <h1>DEVCON</h1>
          </div>

          <h2>BOGOTA</h2>

          <span>
            <Share />
          </span>
        </div>
      </div>
    </Page>
  )
})
