import React, { useMemo, useState } from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import css from './ask.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import { Search } from 'src/components/faq/search'
import { FAQ } from 'src/components/faq'
import { Checkpoint } from '../checkpoint'
import { scrollLock } from 'src/components/layouts/horizontal-layout/HorizontalLayout'
import { graphql, useStaticQuery } from 'gatsby'

export const Ask = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["ask_background.webp"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `)

  const bg = data.allFile.nodes[0]?.childImageSharp?.fluid?.src ?? 'src/assets/images/ask_background.webp'
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']} style={{ backgroundImage: `url(${bg})` }}></div>
      <PageContent
        transparent
        backgroundText={intl.formatMessage({ id: 'rtd_frequently_asked_questions' })}
        links={[]}
        bottomLinks={[{ url: 'https://forum.devcon.org/', title: intl.formatMessage({ id: 'dips_visit_forum' }) }]}
      >
        <div className={css['container']}>
          <div className={css['header']}>
            <h3 className="subsection-header">FAQ</h3>
            <Search onSearch={e => setSearchFilter(e)} />
          </div>
          <div className={css['content']} {...scrollLock}>
            <FAQ data={props.faqs} filter={searchFilter} />
          </div>
        </div>

        <Checkpoint
          number="03"
          description={intl.formatMessage({ id: 'rtd_checkpoint_3' })}
          action={intl.formatMessage({ id: 'rtd_share' })}
          markerClassName={css['marker']}
        />
      </PageContent>
    </Page>
  )
})
