import React from 'react'
import { PageHero } from 'src/components/common/page-hero'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import css from './archive.module.scss'

type VideoProps = {}

export const Video = (props: VideoProps) => {
  return (
    <div className={css['container']}>
      <SEO />
      <Header />

      <PageHero />

      <div className="section">
        <div className="content">
          <div className="aspect">
            <iframe
              src="https://www.youtube.com/embed/lCcwn6bGUtU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
