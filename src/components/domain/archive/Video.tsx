import React from 'react'
import { PageHero } from 'src/components/common/page-hero'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import archiveCss from './archive.module.scss'
import css from './video.module.scss'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { useMostPopular } from 'src/hooks/useMostPopular'
import { VideoCard } from 'src/components/domain/archive/playlists'

type VideoProps = {}

const Suggested = ({ video }: any) => {
  const dummy = useMostPopular()

  return (
    <div className={css['suggested']}>
      <Tabs>
        {video.related && <Tab title="Related">Some tab content</Tab>}

        <Tab title="In playlist">
          <div className={css['description']}>
            <div className="label">15 talks</div>
            <h2 className="title">Buidl Guidl</h2>
            <p>By Austin Griffith, Kevin Owocki</p>
          </div>
          <div className={css['list']}>
            {dummy.videos.map((i: any, index: number) => {
              return <VideoCard key={index} horizontal size="sm" video={i} />
            })}
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

const Labels = ({ video }: any) => {
  const hasPlaylists = video.playlists && video.playlists.length > 0
  const hasTags = video.tags && video.tags.length > 0

  video.tags = ['test', 'two', 'three']
  video.playlists = ['test', 'two', 'three']

  if (!hasTags) return null

  return (
    <div className={css['labels-container']}>
      {hasTags && (
        <div className={css['group']}>
          <p className="font-xs">Related Tags:</p>
          <div className={css['labels']}>
            {video.tags.map((tag: any) => {
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
            {video.playlists.map((playlist: any) => {
              return (
                <div key={playlist} className="label bold sm">
                  {playlist}
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
  const dummy = useMostPopular()

  const video = dummy.videos[0]

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
                      <h1 className="font-xxl">{video.title}</h1>

                      <div className={css['descriptors']}>
                        <p className={css['descriptor']}>
                          <span>Speaker:</span> {video.speakers.join(',')}
                        </p>
                      </div>
                      <div className={css['descriptors']}>
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

                      <Labels video={video} />

                      <div className={css['description']}>
                        <div className={css['text']}>{video.description}</div>
                      </div>
                    </div>

                    <p className="text-uppercase font-sm">About the speakers</p>

                    <div className={css['speakers']}>
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
            <Suggested video={video} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
