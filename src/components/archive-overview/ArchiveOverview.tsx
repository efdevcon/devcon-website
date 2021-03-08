import React, { useEffect, useState } from 'react'
import css from './archive.module.scss'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

interface ArchiveProps {
  videos: Array<ArchiveVideo>
  defaultVideo?: string
  filter?: string
}

export function ArchiveOverview(props: ArchiveProps) {
  const initialVideo = props.defaultVideo ?? props.videos[0]?.url ?? ''
  const [selectedVideo, setSelectedVideo] = useState(initialVideo)
  const [videos, setVideos] = useState(props.videos)

  useEffect(() => {
    if (props.filter && !Number.isNaN(props.filter)) {
      const filtered = props.videos.filter(i => i.category?.toLowerCase() === props.filter?.toLowerCase())
      setVideos(filtered)
    } else {
      setVideos(props.videos)
    }
  }, [props.filter, props.videos])

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
