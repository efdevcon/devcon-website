import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import css from './archive.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { useStaticQuery, graphql } from 'gatsby'
import { CuratedPlaylists, Playlists, StaffPicks } from './playlists'
// import { StaffPicks } from './staff-picks'
// import { StaffPicks } from './playlists'
import { Editions } from './Editions'
import { usePlaylists } from 'src/hooks/usePlaylists'
import { useStaffPicks } from 'src/hooks/useStaffPicks'
import { Interests } from './interests'
import { Link } from 'src/components/common/link'
import WatchIcon from 'src/assets/icons/local_play.svg'
import { videoResolver } from 'src/gatsby/create-schema-customization/resolvers/archive'

type ArchiveProps = {}

export const Archive = (props: ArchiveProps) => {
  // StaticImage has a technical limitation of not being able to pass image src via props https://www.gatsbyjs.com/plugins/gatsby-plugin-image/#restrictions-on-using-staticimage
  // Essentially means we have to manually query the images and them pass them to PageHero afterwards - a bit convoluted/messy, but it's the recommended way
  // const data = useStaticQuery(graphql`
  //   query StaffPicksImageQuery {
  //     allFile(filter: { relativePath: { eq: "vitalik_3x.png" } }) {
  //       nodes {
  //         childImageSharp {
  //           gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
  //         }
  //       }
  //     }
  //   }
  // `)

  const playlists = usePlaylists()
  const staffpicks = useStaffPicks()
  const curated = playlists.filter(i => i.categories.includes('Community Curated'))

  return (
    <div className={css['container']}>
      <SEO />
      <Header withStrip />
      <PageHero
        scenes={staffpicks.videos.map(video => {
          return {
            image: `https://i3.ytimg.com/vi/${video.youtubeUrl.split('/').pop()}/maxresdefault.jpg`,
            imageProps: {
              alt: 'Staff pick',
            },
            callToAction: () => {
              return (
                <Link to={video.slug} className={`button red ${css['call-to-action']}`}>
                  <span className={css['watch-now']}>Watch Now</span>
                  <WatchIcon className={`icon ${css['watch-now-icon']}`} />
                </Link>
              )
            },
            content: () => {
              return (
                <div className={css['page-hero-scene']}>
                  <div className={css['body']}>
                    <div className="label bold">Staff Pick</div>
                    <p className="font-xl bold">{video.title}</p>
                    <p className={`${css['description']} font-lg`}>{video.description}</p>
                  </div>

                  <div className={css['metadata']}>
                    {video.speakers.length > 0 && (
                      <p>
                        By <span className="bold">{video.speakers.join(', ')}</span>
                      </p>
                    )}
                    <p className="bold">Devcon {video.edition}</p>
                  </div>
                </div>
              )
            },
          }
        })}
        title="Archive"
        titleSubtext="Devcon"
      />

      <div className={css['content']}>
        <Interests />

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
    </div>
  )
}
