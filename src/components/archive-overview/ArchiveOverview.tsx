import React, { useEffect, useState } from 'react'
import css from './archive.module.scss'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

interface ArchiveProps {
  videos: Array<ArchiveVideo>
  filter?: string
}

export function ArchiveOverview(props: ArchiveProps) {
  const [selectedVideo, setSelectedVideo] = useState('')
  const [allVideos, setAllVideos] = useState(props.videos)
  const [videos, setVideos] = useState(props.videos)

  useEffect(() => {
    let ordered = props.videos
    for (let i = ordered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ordered[i], ordered[j]] = [ordered[j], ordered[i]]
    }
    const initialVideo = ordered[0]?.url ?? ''

    setVideos(ordered)
    setSelectedVideo(initialVideo)
  }, [props.videos])

  useEffect(() => {
    if (props.filter && props.filter !== 'All') {
      const filtered = allVideos
        .filter(i => i.category?.toLowerCase() === props.filter?.toLowerCase())
        .sort((a, b) => a.title.localeCompare(b.title))

      setVideos(filtered)
    } else {
      setVideos(allVideos)
    }
  }, [props.filter])

  return (
    <div className={css['container']}>
      <div className={css['player']}>
        <div className={css['wrapper']}>
          <iframe
            title="Road to Devon video player"
            className={css['video-iframe']}
            src={selectedVideo}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
        </div>
      </div>
      <div className={css['list']}>
        {videos &&
          videos.map((video: ArchiveVideo) => {
            return (
              <div key={video.id} className={css['item']} onClick={() => setSelectedVideo(video.url)}>
                <span className={css['devcon']}>Devcon {video.devcon}</span>
                <span className={css['title']}>{video.title}</span>

                <span className={css['speakers']}>{video.speakers}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
