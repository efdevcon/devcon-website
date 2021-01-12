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
import { Link } from 'src/components/common/link'
import { Link as LinkType } from 'src/types/Link'
import { Newsletter } from 'src/components/newsletter'

type Props = {
  data: any
  className?: string
}

export const Footer = (props: Props) => {
  const { leftLinks, rightLinks, bottomLinks, highlightedLinks } = props.data.nodes[0].frontmatter

  // Should probably make a hook to fetch current language (used in multiple separate places)
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'

  const newsletter = (
    <>
      <p className="semi-bold">Subscribe to our newsletter</p>
      <p>Stay up to date on the latest devcon news and updates.</p>
      <Newsletter />
    </>
  )

  return (
    <footer className={`${props.className} ${css['container']}`}>
      <div className={css['top-section']}>
        <div className={css['content']}>
          <div className={css['col-1']}>
            <Link to={`/${lang}/`}>
              <img src={logo} alt="Devcon" />
            </Link>
          </div>

          <div className={css['col-2']}>
            {highlightedLinks.map((link: LinkType, index: number) => {
              return (
                <h2 key={index}>
                  <Link to={link.url} className="plain">
                    {link.title}
                  </Link>
                </h2>
              )
            })}

            <div className={css['social-media']}>
              <IconTwitter style={{ cursor: 'pointer' }} />
              <IconGithub style={{ cursor: 'pointer' }} />
              <IconYoutube style={{ cursor: 'pointer' }} />
              <IconShare style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className={css['col-3']}>
            <ul className={css['list']}>
              {leftLinks.map((link: LinkType, index: number) => {
                return (
                  <li className="semi-bold" key={index}>
                    <Link to={link.url} className="plain">
                      {link.title}
                    </Link>
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
                    <Link to={link.url} className="plain">
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={css['col-5']}>
            <div className={css['contact']}>
              <p className="semi-bold">Get in touch</p>
              <p className={css['email-1']}>devcon@ethereum.org</p>

              <p className="semi-bold">Partner with us</p>
              <p className={css['email-2']}>sponsorships@ethereum.org</p>

              {/* Visible on some breakpoints, but not all - moves to col-7 on mobile */}
              <div className={css['newsletter']}>{newsletter}</div>
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

          {/* Only visible on mobile */}
          <div className={css['col-7']}>{newsletter}</div>
        </div>
      </div>

      <div className={css['bottom-section']}>
        <div className={css['content']}>
          <div className={css['col-1']}>© 2021 — Ethereum Foundation. All Rights Reserved.</div>

          <div className={css['col-2']}>
            {bottomLinks.map((link: LinkType, index: number) => {
              return (
                <p className="semi-bold" key={index}>
                  <Link to={link.url} external={link.type === 'url'} className="plain">
                    {link.title}
                  </Link>
                </p>
              )
            })}
          </div>

          <div className={css['col-3']}>
            <Link external className={css['small-logo']} to="https://ethereum.foundation">
              <img src={smallLogo} alt="Devcon" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
