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
import { useSiteNavigationContext } from 'src/context/site-navigation-context'
import { COPYRIGHT_NOTICE, EMAIL_DEVCON, EMAIL_SPONSORSHIP, LINK_ETHEREUM_FOUNDATION, TITLE } from 'src/utils/constants'

export const Footer = () => {
  const context = useSiteNavigationContext()
  const footerData = context.data.footer
  const intl = useIntl()
  const lang = intl.locale

  return (
    <footer className={`footer ${css['container']}`}>
      <div className={css['top-section']}>
        <div className={css['content']}>
          <div className={css['col-1']}>
            <Link to={`/${lang}/`}>
              <img src={logo} alt={TITLE} />
            </Link>
          </div>

          <div className={css['col-2']}>
            {footerData.highlights.map((link: LinkType, index: number) => {
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
              {footerData.left.map((link: LinkType, index: number) => {
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
              {footerData.right.map((link: LinkType, index: number) => {
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
              <p className="semi-bold">{intl.formatMessage({ id: 'getintouch' })}</p>
              <p className={css['email-1']}>{EMAIL_DEVCON}</p>

              <p className="semi-bold">{intl.formatMessage({ id: 'partnerwithus' })}</p>
              <p className={css['email-2']}>{EMAIL_SPONSORSHIP}</p>

              {/* Visible on some breakpoints, but not all - moves to col-7 on mobile */}
              <div className={css['newsletter']}>
                <Newsletter />
              </div>
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
          <div className={css['col-7']}>
            <Newsletter />
          </div>
        </div>
      </div>

      <div className={css['bottom-section']}>
        <div className={css['content']}>
          <div className={css['col-1']}>{COPYRIGHT_NOTICE}</div>

          <div className={css['col-2']}>
            {footerData.bottom.map((link: LinkType, index: number) => {
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
            <Link external className={css['small-logo']} to={LINK_ETHEREUM_FOUNDATION}>
              <img src={smallLogo} alt={TITLE} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
