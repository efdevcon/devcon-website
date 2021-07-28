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
// import ShuffleIcon from 'src/assets/icons/shuffle.svg'
// import PlaylistIcon from 'src/assets/icons/playlist.svg'
import { Link } from 'src/components/common/link'
import { useLocation } from '@reach/router'
import { getVideoId } from 'src/utils/video'
import queryString from 'query-string'
import moment from 'moment'
import { UserProfile } from 'src/types/UserProfile'
import { Avatar } from './Avatar'

type VideoProps = {
  video: ArchiveVideo
  relatedVideos: ArchiveVideo[]
  playlists: Playlist[]
}

const List = ({ video, playlist, videos }: { video: ArchiveVideo; playlist?: Playlist; videos: ArchiveVideo[] }) => {
  return (
    <div className={css['list']}>
      {videos.map((playlistVideo: ArchiveVideo, index: number) => {
        const isCurrentlyWatching = video.title === playlistVideo.title

        let className = ''

        if (isCurrentlyWatching) className = css['selected']

        return <VideoCard compact playlist={playlist} key={index} video={playlistVideo} className={className} />
      })}
    </div>
  )
}

const Suggested = ({ video, relatedVideos, playlists }: VideoProps) => {
  const location = useLocation()
  const playlist = (() => {
    const queryParams = queryString.parse(location.search)

    if (queryParams && queryParams.playlist) {
      return playlists.find(pl => queryParams.playlist === pl.title)
    } else {
      return null
    }
  })()

  if (!playlist && relatedVideos.length === 0) return null

  return (
    <div className={css['suggested']}>
      <Tabs tabContentClassName={css['tab-content']}>
        {playlist && playlist.videos.length > 0 && (
          <Tab title="Playlist">
            <div className={css['description']}>
              <div className="label">{playlist.videos.length} talks</div>
              <h2 className="title">{playlist.title}</h2>
              {playlist.curators && playlist.curators.length > 0 && (
                <p className="text-uppercase">
                  By <span className="bold">{playlist.curators.join(', ')}</span>
                </p>
              )}
              {/* <div className={css['icons']}>
                <PlaylistIcon />
                <ShuffleIcon />
              </div> */}
            </div>

            <List video={video} playlist={playlist} videos={playlist.videos} />
          </Tab>
        )}

        {relatedVideos && relatedVideos.length > 0 && (
          <Tab title="Related">
            <List video={video} videos={relatedVideos} />
          </Tab>
        )}
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
          <p className="font-xs bold">Categories</p>
          <div className={css['labels']}>
            {tags.map((tag: any) => {
              return (
                <Link
                  to={`/archive/watch?tags=${encodeURIComponent(tag)}`}
                  key={tag}
                  className="label label-hover white bold scale"
                >
                  {tag}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {hasPlaylists && (
        <div className={css['group']}>
          <p className="font-xs bold">Playlists</p>
          <div className={css['labels']}>
            {playlists.map((playlist: any) => {
              return (
                <Link to={playlist.slug} key={playlist.title} className="label label-hover white bold scale">
                  {playlist.title}
                </Link>
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
      <Header withStrip />

      <PageHero path={[{ text: 'Watch', url: '/archive/watch' }, { text: props.video.title }]}>
        <div className={css['container']}>
          <div className={css['video']}>
            <div className={css['player']}>
              <div className="aspect">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoId(props.video.youtubeUrl)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className={css['tabs-video']}>
              <Tabs>
                <Tab title="Details">
                  <div className={css['content']}>
                    <h1 className="font-xxl title">{video.title}</h1>

                    <div className={css['descriptors']}>
                      {video.duration && (
                        <p className={css['descriptor']}>
                          <span>Duration:</span> {moment.utc(video.duration * 1000).format('HH:mm:ss')}
                        </p>
                      )}
                      <p className={css['descriptor']}>
                        <span>Speaker:</span> {video.speakers.join(', ')}
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
                    {video.profiles.map((i: UserProfile) => {
                      return (
                        <div key={i.name} className={css['speaker']}>
                          <Avatar profile={i} className={css['thumbnail']} />
                          <div className={css['text']}>
                            <div className={css['title']}>
                              <p className="bold">{i.name}</p>
                              <p className="font-xs"> {i.role}</p>
                            </div>
                            <p className="font-sm">{i.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Tab>

                {video.resources && <Tab title="Resources">Resources</Tab>}
              </Tabs>
            </div>
          </div>

          <Suggested video={video} playlists={props.playlists} relatedVideos={props.relatedVideos} />
        </div>
      </PageHero>

      <Footer />
    </div>
  )
}
