import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import css from './archive.module.scss'

type ArchiveProps = {}

export const Archive = (props: ArchiveProps) => {
  return (
    <div className={css['container']}>
      <SEO />
      <Header />

      <div className={css['hero']}>
        <h1>Hero</h1>
      </div>
      <div className={`section ${css['tags']}`}>
        <div className="content">
          <h1>Tagging section</h1>
        </div>
      </div>
      <div className={css['staff-picks']}>
        <h1>Staff picks</h1>
      </div>
      <div className={`section ${css['curated-playlists']}`}>
        <div className="content">
          <h1>Curated Playlists</h1>
        </div>
      </div>
      <div className={`section ${css['playlists']}`}>
        <div className="content">
          <h1>Curated Playlists</h1>
        </div>
      </div>

      <Footer />
    </div>
  )
}
