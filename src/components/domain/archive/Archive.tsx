import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import css from './archive.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { useStaticQuery, graphql } from 'gatsby'
import { CuratedPlaylists, Playlists } from './playlists'
import { StaffPicks } from './staff-picks'
import { Editions } from './Editions'
import { usePlaylists } from 'src/hooks/usePlaylists'
import { Interests } from './interests'

type ArchiveProps = {}

export const Archive = (props: ArchiveProps) => {
  // StaticImage has a technical limitation of not being able to pass image src via props https://www.gatsbyjs.com/plugins/gatsby-plugin-image/#restrictions-on-using-staticimage
  // Essentially means we have to manually query the images and them pass them to PageHero afterwards - a bit convoluted/messy, but it's the recommended way
  const data = useStaticQuery(graphql`
    query StaffPicksImageQuery {
      allFile(filter: { relativePath: { eq: "vitalik_3x.png" } }) {
        nodes {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `)

  const playlists = usePlaylists()
  const curated = playlists.filter(i => i.categories.includes('Community Curated'))

  return (
    <div className={css['container']}>
      <SEO />
      <Header />
      <PageHero
        scenes={[
          {
            image: data.allFile.nodes[0],
            imageProps: {
              alt: 'Vitalik',
            },
            content: () => {
              return (
                <div className={css['page-hero-scene']}>
                  <div className={css['body']}>
                    <div className="label bold">Staff Pick</div>
                    <p className="font-xl bold">Ethereum in 25 minutes.</p>
                    <p className="font-lg">Take a journey through the Ethereum consensus mechanism.</p>
                  </div>

                  <div className={css['metadata']}>
                    <p>By Vitalik Buterin</p>
                    <p className="bold">20:45</p>
                    <p className="bold">Devcon 2</p>
                  </div>
                </div>
              )
            },
          },
          {
            image: data.allFile.nodes[0],
            imageProps: {
              alt: 'Vitalik',
            },
            content: () => {
              return (
                <div className={css['page-hero-scene']}>
                  <div className={css['body']}>
                    <div className="label bold">Staff Pick</div>
                    <p className="font-xl bold">Ethereum in 15 minutes.</p>
                    <p className="font-lg">Take a slightly faster journey through the Ethereum consensus mechanism</p>
                  </div>

                  <div className={css['metadata']}>
                    <p>By Vitalik Buterin</p>
                    <p className="bold">15:45</p>
                    <p className="bold">Devcon 2</p>
                  </div>
                </div>
              )
            },
          },
          {
            image: data.allFile.nodes[0],
            imageProps: {
              alt: 'Vitalik',
            },
            content: () => {
              return (
                <div className={css['page-hero-scene']}>
                  <div className={css['body']}>
                    <div className="label bold">Staff Pick</div>
                    <p className="font-xl bold">Ethereum in 5 minutes.</p>
                    <p className="font-lg">Take a very quick journey through the Ethereum consensus mechanism.</p>
                  </div>

                  <div className={css['metadata']}>
                    <p>By Vitalik Buterin</p>
                    <p className="bold">5:45</p>
                    <p className="bold">Devcon 2</p>
                  </div>
                </div>
              )
            },
          },
        ]}
        title="Archive"
        titleSubtext="Devcon"
      />

      <Interests />
      {/* <div className={`section ${css['tags']}`}>
        <div className="content">
          <h1>Tagging section</h1>
        </div>
      </div> */}
      <div className={`section ${css['editions']}`}>
        <div className="content">
          <Editions />
        </div>
      </div>
      <div className={css['staff-picks']}>
        <StaffPicks />
      </div>
      <div className={`section ${css['curated-playlists']}`}>
        <div className="content">
          <CuratedPlaylists title="Curated playlists" items={curated} viewMore />
        </div>
      </div>
      <div className={`section ${css['playlists']}`}>
        <div className="content">
          <Playlists />
        </div>
      </div>
      <Footer />
    </div>
  )
}
