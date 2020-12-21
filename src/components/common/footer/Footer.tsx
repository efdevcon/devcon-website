import React from 'react'
import css from './footer.module.scss'
import IconArrowUpward from 'src/assets/icons/arrow_upward.svg'
import IconGithub from 'src/assets/icons/github.svg'
import IconShare from 'src/assets/icons/share.svg'
import IconTwitter from 'src/assets/icons/twitter.svg'
import IconYoutube from 'src/assets/icons/youtube.svg'
import logo from 'src/assets/images/test-asset.svg'
import smallLogo from 'src/assets/images/footer-logo.svg'
import { useIntl } from 'gatsby-plugin-intl'
import { Link } from 'gatsby'
import { Link as LinkType } from 'src/types/Link'
import useFooterData from './useFooterData'
import { LinkComponent } from './Link'

type Props = {}

export const Footer = (props: Props) => {
  const data = useFooterData()

  const { leftLinks, rightLinks, bottomLinks, highlightedLinks } = data.allMarkdownRemark.nodes[0].frontmatter

  // Should probably make a hook to fetch current language (used in multiple separate places)
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'

  return (
    <div className={`footer ${css['container']}`}>
      <div className={css['top-section']}>
        <div className={css['col-1']}>
          <Link to={`/${lang}/`}>
            <img src={logo} alt="Devcon" />
          </Link>
        </div>

        <div className={css['col-2']}>
          {highlightedLinks.map((link: LinkType, index: number) => {
            return (
              <h2 key={index}>
                <LinkComponent link={link} lang={lang} className="plain" />
              </h2>
            )
          })}

          <div className={css['social-media']}>
            <IconTwitter />
            <IconGithub />
            <IconYoutube />
            <IconShare />
          </div>
        </div>

        <div className={css['col-3']}>
          <ul className={css['list']}>
            {leftLinks.map((link: LinkType, index: number) => {
              return (
                <li className="semi-bold" key={index}>
                  <LinkComponent link={link} lang={lang} className="plain" />
                </li>
              )
            })}
          </ul>
        </div>

        <div className={css['col-4']}>
          <ul className={css['list']}>
            {rightLinks.map((link: LinkType, index: number) => {
              return (
                <li className="semi-bold" key={index}>
                  <LinkComponent link={link} lang={lang} className="plain" />
                </li>
              )
            })}
          </ul>
        </div>

        <div className={css['col-5']}>
          <div className={css['contact']}>
            <p className="semi-bold">Get in touch</p>
            <p className={css['email']}>devcon@ethereum.org</p>

            <p className="semi-bold">Partner with us</p>
            <p className={css['email']}>sponsorships@ethereum.org</p>
          </div>
        </div>

        <div className={css['col-6']}>
          <div className={css['scroll-up']}>
            <IconArrowUpward
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      <div className={css['bottom-section']}>
        <div className={css['col-1']}>© 2021 — Ethereum Foundation. All Rights Reserved.</div>

        <div className={css['col-2']}>
          {bottomLinks.map((link: LinkType, index: number) => {
            return (
              <p className="semi-bold" key={index}>
                <LinkComponent link={link} lang={lang} className="plain" />
              </p>
            )
          })}
        </div>

        <div className={css['col-3']}>
          <a className={css['small-logo']} href="https://ethereum.foundation">
            <img src={smallLogo} alt="Devcon" />
          </a>
        </div>
      </div>
    </div>
  )
}
