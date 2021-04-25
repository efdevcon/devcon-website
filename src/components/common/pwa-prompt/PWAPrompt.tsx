import React, { useEffect } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import css from './pwa.module.scss'
import { Modal } from 'src/components/common/modal'
import IconPlus from 'src/assets/icons/plus.svg'

const getIsPWAPossible = () => {
  return true
}

export const PWAPrompt = (props: any) => {
  const [open, setOpen] = React.useState(getIsPWAPossible())
  const intl = useIntl()

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["pwa_prompt.png"] } }) {
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
    <Modal open={open} close={() => setOpen(!open)} className={css['container']}>
      <div className={css['content']}>
        <div className={css['tag']}>
          <p className="font-xs bold">DEVCON WEB APP</p>
        </div>
        {/* Should tag be added to design system? */}
        <div className={css['info']}>
          <p className={`${css['cta']} font-xl`}>
            <span className="bold">Devcon.org</span> is now an App! Install on your smartphone.
          </p>

          <div className={css['description']}>
            <button className="squared light-blue sm">
              <IconPlus />
            </button>
            <p className="font-xs bold text-uppercase">
              open your browser menu and “Add to Home Screen” to use app that works offline.
            </p>
          </div>
        </div>
      </div>
      <Img alt="Devcon wizard" className={css['background']} fluid={data.allFile.nodes[0].childImageSharp.fluid} />
    </Modal>
  )
}
