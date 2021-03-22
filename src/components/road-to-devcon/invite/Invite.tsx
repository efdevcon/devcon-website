import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './invite.module.scss'
import ShareIcon from 'src/assets/icons/share.svg'
import { Share } from 'src/components/common/share'
import { GifScroller } from './GifScroller'
import partyImg from 'src/assets/images/party.png'
import { HashTag } from 'src/components/road-to-devcon/intro'
import { Modal } from 'src/components/common/modal'
import { Newsletter } from 'src/components/newsletter'
import { Confetti } from 'src/components/common/confetti'

const Subscribe = (props: any) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const intl = useIntl()

  const toggle = () => {
    if (!modalOpen) props.confettiRef.current.start()

    setModalOpen(!modalOpen)
  }

  return (
    <>
      <button className={`white ${css['share']}`} onClick={toggle}>
        <span className="text-uppercase">{intl.formatMessage({ id: 'newsletter_title' })} </span>
      </button>

      <Modal
        open={modalOpen}
        close={toggle}
        // onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
        onWheel={(e: React.SyntheticEvent) => e.nativeEvent.stopImmediatePropagation()}
      >
        <Newsletter />
      </Modal>
    </>
  )
}

export const Invite = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const confettiRef = React.useRef()

  return (
    <Page {...props} ref={ref}>
      <Confetti ref={confettiRef} />

      <GifScroller />

      <HashTag className={css['hash-tag']} />

      <div className={css['container']}>
        <div className={css['text']}>
          <div className={css['backdrop']}>
            <p className="bold text-uppercase">{intl.formatMessage({ id: 'rtd_celebrate_together' })}</p>
            <h1 onClick={() => confettiRef.current.start()}>
              DEVCON <img className={css['party']} src={partyImg} alt="party" />
            </h1>
          </div>

          <h2 className="text-uppercase">{intl.formatMessage({ id: 'rtd_bogota' })}</h2>

          <div className={css['buttons']}>
            <Share
              renderTrigger={toggleShare => {
                const onClick = () => {
                  toggleShare()
                  confettiRef.current.start()
                }

                return (
                  <button className={`white ${css['share']}`} onClick={onClick}>
                    <span className="text-uppercase">{intl.formatMessage({ id: 'rtd_share' })} </span> <ShareIcon />
                  </button>
                )
              }}
            />

            <Subscribe confettiRef={confettiRef} />
          </div>
        </div>
      </div>
    </Page>
  )
})
