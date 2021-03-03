import React from 'react'
import { Page } from 'src/components/layouts/horizontal-layout'
import css from './intro.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import road from 'src/assets/images/road.svg'
import SurveyIcon from 'src/assets/icons/survey.svg'
import dog from 'src/assets/images/dog.svg'
import guy from 'src/assets/images/scouting-guy.svg'
import leslie from 'src/assets/images/leslie.svg'
import marker from 'src/assets/images/marker.svg'
// import Dog from './Dog'
import dogeHead from 'src/assets/images/doge-head.svg'
import { Tooltip } from 'src/components/common/tooltip'

type CheckpointProps = {
  number: string
  description: string
  action: string
}

export const Checkpoint = (props: CheckpointProps) => {
  return (
    <Tooltip
      content={
        <div className={css['checkpoint']}>
          <p>{props.number} ―</p>
          <p>{props.description}</p>
          <p>{props.action}</p>
        </div>
      }
    >
      <img className={css['marker']} src={marker} />
    </Tooltip>
  )
}

export const Intro = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [showDoge, setShowDoge] = React.useState(false)

  // Important to pass props and ref to the Page component
  return (
    <Page {...props} ref={ref}>
      <div className={css['container']}>
        <div className={css['text']}>
          <h1>{intl.formatMessage({ id: 'rtd' })}</h1>

          <p>
            Join us on the adventurous journey ahead to Devcon 6 in Bogota, Colombia. Devcon is the annual premier
            conference for all Ethereum developers, researchers, thinkers, and makers.
          </p>

          <button
            className="lg"
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
      <img className={css['road']} src={road} />
      <img className={css['leslie']} src={leslie} />
      <Checkpoint
        number="01"
        description={intl.formatMessage({ id: 'rtd_checkpoint_1' })}
        action={intl.formatMessage({ id: 'rtd_take_survey' })}
      />

      <div className={css['dog-and-guy']}>
        <div className={css['dog']}>
          <img src={dog} />

          {showDoge && (
            <>
              <img className={css['doge']} src={dogeHead} />
              <p className={css['wow']}>wow</p>
            </>
          )}
        </div>
        {/* <Dog className={css['dog']} /> */}
        <img className={css['guy']} src={guy} />
      </div>

      <div className={css['drag-to-continue']}>
        <p>
          <span>{intl.formatMessage({ id: 'rtd_drag_to_continue' })}</span>
          <span>{intl.formatMessage({ id: 'rtd_swipe_to_continue' })}</span>→
        </p>
      </div>

      {/* <PageContent
        backgroundText="Message from Deva"
        links={[
          { url: 'https://github.com', title: 'GITHUB', icon: 'abc' },
          { url: 'https://ethereum.org', title: 'ETHEREUM.ORG', icon: 'abc' },
        ]}
        bottomLinks={[{ url: 'https://github.com', title: 'GITHUB' }]}
      >
        <div style={{ height: '100%', width: '100%', background: 'white' }}>
          <h2>Structured page example</h2>
          <p>
            Simply render "PageContent" as a child of "Page", and it will provide the basic structural elements for the
            page. It is still possible to render custom things on the rest of the page - like the background image in on
            this page.
          </p>
          <div className={css['background']}></div>
        </div>
      </PageContent>*/}
    </Page>
  )
})
