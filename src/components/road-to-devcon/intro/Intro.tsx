import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import css from './intro.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import road from 'src/assets/images/road.svg'
import IconMedal from 'src/assets/icons/medal.svg'
import InfoIcon from 'src/assets/icons/info.svg'
import dog from 'src/assets/images/dog.svg'
import guy from 'src/assets/images/scouting-guy.svg'
import leslie from 'src/assets/images/leslie.svg'
import dogeHead from 'src/assets/images/doge-head.svg'
import { Checkpoint } from '../checkpoint'
import { Link } from 'src/components/common/link'
import { Modal } from 'src/components/common/modal'
import ArrowLeftIcon from 'src/assets/icons/box_arrow_left.svg'
import ArrowRightIcon from 'src/assets/icons/box_arrow_right.svg'
import CircleArrowRightIcon from 'src/assets/icons/circle_arrow_right.svg'
import { Newsletter } from 'src/components/newsletter'

export const HashTag = (props: { className: string }) => {
  const [hovered, setHovered] = React.useState(false)

  let className = `hover-underline ${css['hash-tag']}`

  if (hovered) className += ` bold`
  if (props.className) className += ` ${props.className}`

  return (
    <a
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href="https://twitter.com/search?q=%23roadtodevcon"
      target="_blank"
      className={className}
    >
      {hovered && <span>😀👋</span>}
      #ROADTODEVCON
    </a>
  )
}

export const Intro = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [showDoge, setShowDoge] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [subscribeModalOpen, setSubscribeModalOpen] = React.useState(false)

  // Important to pass props and ref to the Page component
  return (
    <Page {...props} ref={ref} style={{ overflow: 'visible' }}>
      <div className={css['container']}>
        <div className={css['text']}>
          <h1 className="no-select">{intl.formatMessage({ id: 'rtd' })}</h1>
          <div>
            <p className="no-select">{intl.formatMessage({ id: 'rtd_intro' })}</p>
            <p className={`no-select ${css['no-announcement-date']}`}>
              {intl.formatMessage({ id: 'rtd_intro_no_date' })}.{' '}
              <Link
                className="bold hover-underline"
                to="https://blog.ethereum.org/2021/01/26/the-longer-road-to-devcon/"
              >
                {intl.formatMessage({ id: 'rtd_intro_no_date_learn_more' })}.
              </Link>
            </p>
          </div>

          <button
            className="lg white"
            onClick={() => {
              setModalOpen(true)
            }}
          >
            {props.whatIsDevcon.title}
            <InfoIcon />
          </button>
          <Modal
            open={modalOpen}
            close={() => setModalOpen(false)}
            onWheel={(e: React.SyntheticEvent) => e.nativeEvent.stopImmediatePropagation()}
            onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
          >
            <div className={css['what-is-devcon']}>
              <h4>{props.whatIsDevcon.title} — </h4>
              <div
                className={css['modal-content'] + ' markdown'}
                dangerouslySetInnerHTML={{ __html: props.whatIsDevcon.body }}
              />
              <div className={css['modal-footer']}>
                <a
                  onClick={() => {
                    // const mfdPageTitle = intl.formatMessage({ id: 'rtd_message_from_deva' })
                    props.navigationRef.current.goToSlide(1)

                    setModalOpen(false)
                  }}
                >
                  {intl.formatMessage({ id: 'rtd_message_from_deva' })}
                </a>
              </div>
            </div>
          </Modal>

          <Link
            to="https://esp.ethereum.foundation/en/devcon-grants/"
            className={`${css['anchor-as-button']} button lg white`}
            // onClick={() => setSubscribeModalOpen(true)}
            onMouseOver={() => {
              setShowDoge(true)
            }}
            onMouseLeave={() => {
              setShowDoge(false)
            }}
          >
            {intl.formatMessage({ id: 'rtd_grants_apply' })}
            <IconMedal />
          </Link>

          <Modal
            open={subscribeModalOpen}
            close={() => setSubscribeModalOpen(false)}
            onWheel={(e: React.SyntheticEvent) => e.nativeEvent.stopImmediatePropagation()}
            onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
          >
            <Newsletter />
          </Modal>
        </div>
      </div>

      <HashTag />

      <div className={css['angle']}></div>
      <img className={css['road']} src={road} alt="Road to Devcon" />
      <img className={css['leslie']} src={leslie} alt="Ethereum Leslie" />

      <Checkpoint
        number="01"
        description={intl.formatMessage({ id: 'rtd_checkpoint_1' })}
        action={intl.formatMessage({ id: 'rtd_subscribe_for_updates' })}
        onClick={() => {
          setSubscribeModalOpen(true)
        }}
        markerClassName={css['marker']}
      />

      <div className={css['dog-and-guy']}>
        <div className={css['dog']}>
          <img src={dog} alt="Ethereum dog" />

          {showDoge && (
            <>
              <img className={css['doge']} src={dogeHead} alt="Doge" />
              <p className={css['wow']}>wow</p>
            </>
          )}
        </div>

        <img className={css['guy']} src={guy} alt="Ethereum guy" />
      </div>

      <div className={`no-select ${css['drag-to-continue']}`}>
        <p>
          <span>{intl.formatMessage({ id: 'rtd_drag_to_continue' })}</span>
          <span>{intl.formatMessage({ id: 'rtd_swipe_to_continue' })}</span>
        </p>
        <ArrowLeftIcon />
        <ArrowRightIcon />
        <CircleArrowRightIcon className={`icon ${css['circle-arrow-right-icon']}`} />
      </div>
    </Page>
  )
})
