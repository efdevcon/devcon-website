import React from 'react'
import css from './footer.module.scss'
import IconArrowUpward from 'assets/icons/arrow_upward.svg'
import ImageEF from 'assets/images/ef-logo.svg'
import { Link } from 'components/common/link'
import { Link as LinkType } from 'types/Link'
import { Newsletter } from 'components/common/newsletter'
import { usePageContext } from 'context/page-context'
import { EMAIL_DEVCON, LINK_ETHEREUM_FOUNDATION, TITLE } from 'utils/constants'
import HeaderLogoArchive from '../header/HeaderLogo'
import { Copyright } from '../Copyright'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import navigationData from 'components/common/layouts/header/navigationData'
import { Share } from 'components/common/share'
import IconGithub from 'assets/icons/github.svg'
import IconTwitter from 'assets/icons/twitter.svg'
import IconYoutube from 'assets/icons/youtube.svg'

type SocialMediaProps = {
  onShare?: () => void
  url?: string
  className?: string
}

export const SocialMedia = ({ onShare, url, className: extraClassName }: SocialMediaProps) => {
  let className = css['social-media']

  if (extraClassName) className += ` ${extraClassName}`

  return (
    <div className={className}>
      <Link to="https://twitter.com/efdevcon">
        <IconTwitter style={{ cursor: 'pointer' }} />
      </Link>
      <Link to="https://github.com/efdevcon">
        <IconGithub style={{ cursor: 'pointer' }} />
      </Link>
      <Link to="https://www.youtube.com/c/EthereumFoundation/search?query=devcon">
        <IconYoutube style={{ cursor: 'pointer' }} />
      </Link>
      {/* <Share url={url} onShare={onShare} /> */}
    </div>
  )
}

export const Footer = () => {
  const context = usePageContext()
  const intl = useTranslations()
  const router = useRouter()
  const lang = router.locale
  let footerData = navigationData.footer

  // if (footerData) {
  //   footerData = {
  //     ...footerData,
  //     right: [
  //       {
  //         title: 'Watch',
  //         url: '/archive/watch/',
  //         type: 'link',
  //       },
  //       {
  //         title: 'Playlists',
  //         url: '/archive/playlists/',
  //         type: 'link',
  //       },
  //       {
  //         title: 'Road to Devcon',
  //         url: 'https://www.devcon.org/',
  //         type: 'link',
  //       },
  //       {
  //         title: 'Forum',
  //         url: 'https://forum.devcon.org/',
  //         type: 'link',
  //       },
  //       {
  //         title: 'Blog',
  //         url: 'https://blog.ethereum.org/category/devcon/',
  //         type: 'link',
  //       },
  //     ],
  //   }
  // }

  return (
    <footer className={`footer ${css['container']} ${css['archive']}`}>
      <div className={css['top-section']}>
        <div className="section">
          <div className={css['content']}>
            <div className={css['col-1']}>
              <Link to={`/${lang}/`} style={{ maxWidth: '200px', minWidth: '130px', display: 'block' }}>
                <HeaderLogoArchive />
              </Link>

              <SocialMedia />
            </div>

            <div className={css['col-2']}>
              <div>
                <p className="semi-bold">About Devcon —</p>
                <p>Devcon is the Ethereum conference for developers, researchers, thinkers, and makers.</p>
                <p>
                  An intensive introduction for new Ethereum explorers, a global family reunion for those already a part
                  of our ecosystem, and a source of energy and creativity for all.
                </p>
              </div>
            </div>

            <div className={css['col-3']}>
              <ul className={css['list']}>
                {footerData?.right.map((link: LinkType, index: number) => {
                  return (
                    <li className="semi-bold" key={index}>
                      <Link to={link.url} className="plain hover-underline">
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={css['col-4']}>
              <div className={css['contact']}>
                <p className="semi-bold">{intl('getintouch')}</p>
                <p className={css['email-1']}>{EMAIL_DEVCON}</p>

                <div className={css['newsletter']}>
                  <Newsletter id="footer_newsletter_email" />
                </div>
              </div>
            </div>

            <div className={css['col-5']}>
              <div className={css['scroll-up']}>
                <IconArrowUpward
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css['bottom-section']}>
        <div className="section">
          <div className={css['content']}>
            <div className={css['col-1']}>
              <Link external className={css['small-logo']} to={LINK_ETHEREUM_FOUNDATION}>
                <ImageEF />
              </Link>

              <Copyright />
            </div>

            <div className={css['col-3']}>
              <Link
                className="bold font-xs text-uppercase hover-underline"
                to="https://ethereum.org/en/privacy-policy/"
              >
                Privacy policy
              </Link>
              <Link className="bold font-xs text-uppercase hover-underline" to="https://ethereum.org/en/terms-of-use/">
                Terms of use
              </Link>
              <Link className="bold font-xs text-uppercase hover-underline" to="https://ethereum.org/en/cookie-policy/">
                Cookie policy
              </Link>
            </div>

            {/* <div className={css['col-3']}>
              <Link external className={css['small-logo']} to={LINK_ETHEREUM_FOUNDATION}>
                <ImageEF />
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
