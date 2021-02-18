import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import css from './intro.module.scss'
import { useIntl } from 'gatsby-plugin-intl'

export const Intro = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  // Important to pass props and ref to the Page component
  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent
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
        </div>
      </PageContent>
    </Page>
  )
})
