import React, { useState } from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import css from './ask.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import { Search } from 'src/components/faq/search'
import { FAQ } from 'src/components/faq'

export const Ask = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [searchFilter, setSearchFilter] = useState('')

  // Important to pass props and ref to the Page component
  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent
        backgroundText={intl.formatMessage({ id: 'rtd_frequently_asked_questions' })}
        links={[]}
        bottomLinks={[{ url: 'https://github.com', title: 'Visit Forums' }]}
      >
        <div className={css['container']}>
          <div className={css['header']}>
            <h3 className="subsection-header">FAQ</h3>
            <Search onSearch={e => setSearchFilter(e)} />
          </div>
          <div className={css['content']}>
            <FAQ data={props.faqs} filter={searchFilter} />
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
