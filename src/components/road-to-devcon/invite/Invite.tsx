import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './invite.module.scss'
import ShareIcon from 'src/assets/icons/share.svg'
import { Share } from 'src/components/common/share'
import { GifScroller } from './GifScroller'
import partyImg from 'src/assets/images/party.png'

export const Invite = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <GifScroller />
      <a href="https://twitter.com/search?q=%23roadtodevcon" target="_blank" className={css['hash-tag']}>
        #ROADTODEVCON
      </a>
      <div className={css['container']}>
        <div className={css['text']}>
          <div className={css['backdrop']}>
            <p className="bold text-uppercase">{intl.formatMessage({ id: 'rtd_celebrate_together' })}</p>
            <h1>
              DEVCON <img className={css['party']} src={partyImg} alt="party" />
            </h1>
          </div>

          <h2 className="text-uppercase">{intl.formatMessage({ id: 'rtd_bogota' })}</h2>

          <span>
            <Share
              renderTrigger={toggleShare => {
                return (
                  <button className={`white ${css['share']}`} onClick={toggleShare}>
                    <span className="text-uppercase">{intl.formatMessage({ id: 'rtd_share' })} </span> <ShareIcon />
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
