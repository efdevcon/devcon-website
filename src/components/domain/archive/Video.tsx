import React from 'react'
import { PageHero } from 'src/components/common/page-hero'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import archiveCss from './archive.module.scss'
import css from './video.module.scss'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { VideoCard } from 'src/components/domain/archive/playlists'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { Playlist } from 'src/types/Playlist'
import ShuffleIcon from 'src/assets/icons/shuffle.svg'
import PlaylistIcon from 'src/assets/icons/playlist.svg'

type VideoProps = {
  video: ArchiveVideo
  playlists: Playlist[]
}

const Suggested = ({ video, playlists }: VideoProps) => {
  const playlist = playlists[0]
  const nVideos = playlist.videos.length

  return (
    <div className={css['suggested']}>
      <Tabs tabContentClassName={css['tab-content']}>
        {video.related && <Tab title="Related">Some tab content</Tab>}

        <Tab title="In playlist">
          <div className={css['description']}>
            <div className="label">{nVideos} talks</div>
            <h2 className="title">{playlist.title}</h2>
            <p className="text-uppercase">
              By <span className="bold">{playlist.curators.join(', ')}</span>
            </p>
            <div className={css['icons']}>
              <PlaylistIcon />
              <ShuffleIcon />
            </div>
          </div>
          <div className={css['list']}>
            {playlist.videos.map((i: any, index: number) => {
              return <VideoCard key={index} horizontal video={i} compact />
            })}
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

const Labels = ({ tags, playlists }: any) => {
  const hasPlaylists = playlists.length > 0
  const hasTags = tags.length > 0

  if (!hasTags && !hasPlaylists) return null

  return (
    <div className={css['labels-container']}>
      {hasTags && (
        <div className={css['group']}>
          <p className="font-xs">Related Tags:</p>
          <div className={css['labels']}>
            {tags.map((tag: any) => {
              return (
                <div key={tag} className="label bold sm">
                  {tag}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {hasPlaylists && (
        <div className={css['group']}>
          <p className="font-xs">Playlists:</p>
          <div className={css['labels']}>
            {playlists.map((playlist: any) => {
              return (
                <div key={playlist.title} className="label bold sm">
                  {playlist.title}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const Video = (props: VideoProps) => {
  const video = props.video

  return (
    <div className={archiveCss['container']}>
      <SEO />
      <Header />

      <PageHero asBackground />

      <div className="section">
        <div className="content">
          <div className={css['container']}>
            <div className={css['video']}>
              <div className={css['player']}>
                <div className="aspect">
                  <iframe
                    src={video.youtubeUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>

              <div className={css['tabs-video']}>
                <Tabs>
                  <Tab title="Details">
                    <div className={css['content']}>
                      <h1 className="font-xxl title">{video.title}</h1>

                      <div className={css['descriptors']}>
                        <p className={css['descriptor']}>
                          <span>Speaker:</span> {video.speakers.join(',')}
                        </p>
                        <p className={css['descriptor']}>
                          <span>Type:</span> {video.type}
                        </p>
                        <p className={css['descriptor']}>
                          <span>Expertise:</span> {video.expertise}
                        </p>
                        <p className={css['descriptor']}>
                          <span>Event:</span> Devcon {video.edition}
                        </p>
                      </div>

                      <div className={css['description']}>
                        <div className={css['text']}>{video.description}</div>
                      </div>
                    </div>

                    <Labels tags={video.tags} playlists={props.playlists} />

                    <div className={css['speakers']}>
                      {/* <p className="text-uppercase font-sm">About the speakers</p> */}
                      <div className={css['speaker']}>
                        <img className={css['thumbnail']} src="https://i3.ytimg.com/vi/66SaEDzlmP4/maxresdefault.jpg" />

                        <div className={css['text']}>
                          <div className={css['title']}>
                            <p className="bold">Vitalik Buterin</p>
                            <p className="font-xs"> Researcher</p>
                          </div>
                          <p className="font-sm">
                            Machine learning is being adopted more and more broadly in technology. Such success is
                            largely due to a combination of algorithmic breakthroughs, computation resource
                            improvements, and the access to a large amount of diverse training data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {video.resources && <Tab title="Resources">Resources</Tab>}
                </Tabs>
              </div>
            </div>
            <Suggested video={video} playlists={props.playlists} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
