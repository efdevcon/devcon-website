import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import Img from 'gatsby-image'
import { useIntl } from 'gatsby-plugin-intl'
import { useStaticQuery, graphql } from 'gatsby'
import css from './mfd.module.scss'
import devaSignature from 'src/assets/images/deva_signature.png'

export const MessageFromDeva = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["front-deva.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 500, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `)

  return (
    <Page {...props} ref={ref}>
      <PageContent transparent backgroundText={intl.formatMessage({ id: 'rtd_message_from_deva' })}>
        <div className={css['container']}>
          <Img alt="front_deva" className={css['deva']} fluid={data.allFile.nodes[0].childImageSharp.fluid} />

          <div className={css['message']}>
            <h1>Embarking on the Journey Ahead</h1>

            <p className="bold">Devcon Bogota</p>

            <p>
              Devcon Improvement Proposals (DIPs) provide a mechanism for collecting collaborative community input on
              what should be included at the upcoming Devcon. Devcon Improvement Proposals (DIPs) provide a mechanism
              for collecting collaborative community input on what should be included at the upcoming Devcon. Devcon
              Improvement Proposals (DIPs) provide a mechanism for collecting collaborative community input on what
              should be included at the upcoming Devcon.
            </p>

            <img className={css['signature']} src={devaSignature} alt="Deva signature" />
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
