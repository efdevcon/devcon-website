import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import css from './intro.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import road from 'src/assets/images/road.svg'
import SurveyIcon from 'src/assets/icons/survey.svg'

export const Intro = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

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

          <button>
            {intl.formatMessage({ id: 'rtd_take_devcon_survey' })}
            <SurveyIcon />
          </button>
        </div>
      </div>

      <p className={css['hash-tag']}>#ROADTODEVCON</p>

      <div className={css['angle']}></div>
      <img className={css['road']} src={road} />

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
