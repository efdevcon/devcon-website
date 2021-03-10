import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './invite.module.scss'
import ShareIcon from 'src/assets/icons/share.svg'
import { Share } from 'src/components/common/share'
import { GifScroller } from './GifScroller'
import partyImg from 'src/assets/images/party.png'

export const Invite = React.forwardRef((props: any, ref) => {
  return (
    <Page {...props} ref={ref}>
      <GifScroller />
      <p className={css['hash-tag']}>#ROADTODEVCON</p>
      <div className={css['container']}>
        <div className={css['text']}>
          <div className={css['backdrop']}>
            <p className="bold">LET'S CELEBRATE TOGETHER AT</p>
            <h1>
              DEVCON <img className={css['party']} src={partyImg} alt="party" />
            </h1>
          </div>

          <h2>BOGOTA</h2>

          <span>
            <Share
              renderTrigger={toggleShare => {
                return (
                  <button className={`white ${css['share']}`} onClick={toggleShare}>
                    <span>SHARE THE ROAD TO DEVCON </span> <ShareIcon />
                  </button>
                )
              }}
            />
          </span>
        </div>
      </div>
    </Page>
  )
})
