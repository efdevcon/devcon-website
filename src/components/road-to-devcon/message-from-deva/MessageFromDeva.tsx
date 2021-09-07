import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import Img from 'gatsby-image'
import { useIntl } from 'gatsby-plugin-intl'
import { useStaticQuery, graphql } from 'gatsby'
import css from './mfd.module.scss'
import { ScrollGradient } from 'src/components/common/scroll-gradient'
import devaSignature from 'src/assets/images/deva_signature.png'

export const MessageFromDeva = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["lying-deva.png", "sitting-deva.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 600, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
          <Img alt="Lying Deva" className={css['lying-deva']} fluid={data.allFile.nodes[0].childImageSharp.fluid} />
          <Img alt="Sitting Deva" className={css['sitting-deva']} fluid={data.allFile.nodes[1].childImageSharp.fluid} />

          <ScrollGradient height="30px">
            <div className={css['message']}>
              <h2>{intl.formatMessage({ id: 'rtd_embarking' })}</h2>

              <p className="bold">Devcon {intl.formatMessage({ id: 'rtd_bogota' })}</p>

              <div
                className={css['content'] + ' markdown'}
                dangerouslySetInnerHTML={{ __html: props.messageFromDeva }}
              />

              <img className={css['signature']} src={devaSignature} alt="Deva signature" />
            </div>
          </ScrollGradient>
        </div>
      </PageContent>
    </Page>
  )
})
