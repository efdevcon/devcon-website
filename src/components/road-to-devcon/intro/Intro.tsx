import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import css from './intro.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import road from 'src/assets/images/road.svg'
import SurveyIcon from 'src/assets/icons/survey.svg'
import InfoIcon from 'src/assets/icons/info.svg'
import dog from 'src/assets/images/dog.svg'
import guy from 'src/assets/images/scouting-guy.svg'
import leslie from 'src/assets/images/leslie.svg'
import dogeHead from 'src/assets/images/doge-head.svg'
import { Checkpoint } from '../checkpoint'
import { Modal } from 'src/components/common/modal'
import { navigateToSlide } from 'src/components/layouts/horizontal-layout/Navigation'

export const Intro = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [showDoge, setShowDoge] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)

  // Important to pass props and ref to the Page component
  return (
    <Page {...props} ref={ref}>
      <div className={css['container']}>
        <div className={css['text']}>
          <h1>{intl.formatMessage({ id: 'rtd' })}</h1>

          <p>{intl.formatMessage({ id: 'rtd_intro' })}</p>

          <button
            className="lg white"
            onClick={() => {
              setModalOpen(true)
            }}
          >
            {props.whatIsDevcon.frontmatter.title}
            <InfoIcon />
          </button>

          <Modal
            open={modalOpen}
            close={() => setModalOpen(false)}
            onWheel={e => e.nativeEvent.stopImmediatePropagation()}
          >
            <div className={css['what-is-devcon']}>
              <h4>{props.whatIsDevcon.frontmatter.title} — </h4>
              <div
                className={css['modal-content'] + ' markdown'}
                dangerouslySetInnerHTML={{ __html: props.whatIsDevcon.html }}
              />
              <div className={css['modal-footer']}>
                <a
                  onClick={() => {
                    const mfdPageTitle = intl.formatMessage({ id: 'rtd_message_from_deva' })

                    navigateToSlide(mfdPageTitle, props)
                    setModalOpen(false)
                  }}
                >
                  {intl.formatMessage({ id: 'rtd_message_from_deva' })}
                </a>
              </div>
            </div>
          </Modal>

          <button
            className="lg white"
            onMouseOver={() => {
              setShowDoge(true)
            }}
            onMouseLeave={() => {
              setShowDoge(false)
            }}
          >
            {intl.formatMessage({ id: 'rtd_take_survey' })}
            <SurveyIcon />
          </button>
        </div>
      </div>

      <p className={css['hash-tag']}>#ROADTODEVCON</p>

      <div className={css['angle']}></div>
      <img className={css['road']} src={road} alt="Road to Devcon" />
      <img className={css['leslie']} src={leslie} alt="Ethereum Leslie" />

      <Checkpoint
        number="01"
        description={intl.formatMessage({ id: 'rtd_checkpoint_1' })}
        action={intl.formatMessage({ id: 'rtd_take_survey' })}
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

      <div className={css['drag-to-continue']}>
        <p>
          <span>{intl.formatMessage({ id: 'rtd_drag_to_continue' })}</span>
          <span>{intl.formatMessage({ id: 'rtd_swipe_to_continue' })}</span>→
        </p>
      </div>
    </Page>
  )
})
