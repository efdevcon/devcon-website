import React from 'react'
import css from './about.module.scss'
import DevconLogo from 'assets/images/devcon-logo-simple.svg'
import { Button } from 'components/common/button'
import Image from 'next/image'
import TriangleWithImages from 'assets/images/about-triangles.png'
import { Link } from 'components/common/link'

const About = () => {
  return (
    <div className={`section ${css['container']}`}>
      <div className={`${css['body']} clear-top clear-bottom border-bottom margin-bottom expand`}>
        <div className={css['left']}>
          <DevconLogo />

          <p className={`${css['highlighted']} h2`}>
            Devcon is an intensive introduction for new Ethereum explorers, a global family reunion for those already a
            part of our ecosystem, and a source of energy and creativity for all.
          </p>

          <p>
            We host Devcon to educate and empower the community to build and use decentralized systems. And it is a
            conference for builders of all kinds: developers, designers, researchers, client implementers, test
            engineers, infrastructure operators, community organizers, social economists, artists, and more
          </p>

          <p className="font-lg">Devcon week will take place on October 7-16 in Bogota, Colombia.</p>

          <Link to="/bogota">
            <Button className="red lg">Bogota City Guide →</Button>
          </Link>
        </div>
        <div className={css['right']}>
          <div className={css['image-container']}>
            <Image
              src={TriangleWithImages}
              objectFit="contain"
              layout="fill"
              objectPosition="right"
              alt="Devcon images"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
