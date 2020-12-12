import React from 'react'
import css from './footer.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import IconArrowUpward from 'src/assets/icons/arrow_upward.svg'
import IconGithub from 'src/assets/icons/github.svg'
import IconShare from 'src/assets/icons/share.svg'
import IconTwitter from 'src/assets/icons/twitter.svg'
import IconYoutube from 'src/assets/icons/youtube.svg'
import logo from 'src/assets/images/test-asset.svg'
import smallLogo from 'src/assets/images/footer-logo.svg'

type Props = {}

export const Footer = (props: Props) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allMarkdownRemark(filter: { frontmatter: { parent: { eq: "footer" } } }) {
        nodes {
          id
          frontmatter {
            parent
          }
        }
      }
    }
  `)

  console.log(data, 'footer query test')

  return (
    <div className={`footer ${css['container']}`}>
      <div className={css['top-section']}>
        <div className={css['col-1']}>
          <img src={logo} />
        </div>
        <div className={css['col-2']}>
          <h2>Program</h2>
          <h2>Tickets</h2>
          <h2>Bogota</h2>
          <h2>Archive</h2>

          <div className={css['social-media']}>
            <IconTwitter />
            <IconGithub />
            <IconYoutube />
            <IconShare />
          </div>
        </div>

        <div className={css['col-3']}>
          <ul className={css['list']}>
            <li className="bold">About</li>
            <li className="bold">Program</li>
            <li className="bold">Speakers</li>
            <li className="bold">UX Awards</li>
            <li className="bold">Venue</li>
            <li className="bold">Bogota</li>
            <li className="bold">Tickets</li>
            <li className="bold">COVID-19</li>
          </ul>
        </div>
        <div className={css['col-4']}>
          <ul className={css['list']}>
            <li className="bold">News</li>
            <li className="bold">Community</li>
            <li className="bold">Sponsors</li>
            <li className="bold">DIP Process</li>
            <li className="bold">Forum</li>
            <li className="bold">Blog</li>
          </ul>
        </div>
        <div className={css['col-5']}>
          <div className={css['list']}>
            <p className="bold">Get in touch</p>
            <p>devcon@ethereum.org</p>

            <p className="bold">Partner with us</p>
            <p>sponsorships@ethereum.org</p>
          </div>
        </div>

        <div className={css['col-6']}>
          <div className={css['scroll-up']}>
            <IconArrowUpward />
          </div>
        </div>
      </div>

      <div className={css['bottom-section']}>
        <div className={css['col-1']}>© 2021 — Ethereum Foundation. All Rights Reserved.</div>

        <div className={css['col-2']}>
          <div className={css['left']}>
            <p>FAQ</p>
            <p>Code of conduct</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Terms of Use</p>
            <p>Ethereum Foundation</p>
          </div>

          <img src={smallLogo} />
        </div>
      </div>
    </div>
  )
}
