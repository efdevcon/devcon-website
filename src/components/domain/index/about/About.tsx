import React from 'react'
import css from './about.module.scss'
import DevconLogo from 'assets/images/devcon-logo-bogota-text.svg'
import { Button } from 'components/common/button'
import Image from 'next/image'
import TriangleWithImages from 'assets/images/about-triangles.png'
import { Link } from 'components/common/link'

const About = () => {
  return (
    <div className={`section ${css['container']}`}>
      <div className={`${css['body']} clear-top  expand`}>
        <div className={css['left']}>
          <DevconLogo />

          <p className="h2 highlighted">
            Devcon is an intensive introduction for new Ethereum explorers, a global family reunion for those already a
            part of our ecosystem, and a source of energy and creativity for all.
          </p>

          <p>
            We host Devcon to educate and empower the community to build and use decentralized systems. And it is a
            conference for builders of all kinds: developers, designers, researchers, client implementers, test
            engineers, infrastructure operators, community organizers, social economists, artists, and more
          </p>

          <p>
            <span className={css['grey']}>
              <span className={css['crossed-out']}>2020</span> / <span className={css['crossed-out']}>2021</span> /
            </span>
            &nbsp;
            <span className="bold">2022</span> 🦄🎉
            <br />
            <span className="bold">Devcon Oct 11-14 📌 Agora Bogotá Convention Center</span>
            <br />
            <span className="font-sm">Devcon week will take place on October 7-16 in Bogota, Colombia.</span>
          </p>

          <Link to="/bogota">
            <Button className="red lg">Bogota City Guide →</Button>
          </Link>
        </div>
        <div className={css['right']}>
          <div className={css['image-container']}>
            <Image src={TriangleWithImages} objectFit="cover" layout="fill" objectPosition="left" alt="Devcon images" />
          </div>
        </div>
      </div>
      <div className="clear-bottom margin-bottom border-bottom"></div>
    </div>
  )
}

export default About
