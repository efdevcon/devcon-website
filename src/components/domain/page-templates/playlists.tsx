import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import IconSearch from 'src/assets/icons/search.svg'
import css from './playlists.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { InputForm } from 'src/components/common/input-form'
import { usePlaylists } from 'src/hooks/usePlaylists'
import { CuratedPlaylists } from '../archive/playlists'
import { ARCHIVE_DESCRIPTION, ARCHIVE_IMAGE_URL, ARCHIVE_TITLE } from 'src/utils/constants'

export const Playlists = () => {
  const playlists = usePlaylists()
  const categories = [...new Set(playlists.map(i => i.categories).flat())]

  return (
    <div className={css['container']}>
      <SEO 
        title={ARCHIVE_TITLE}
        description={ARCHIVE_DESCRIPTION} 
        imageUrl={ARCHIVE_IMAGE_URL} />
      <Header withStrip={false} />

      <PageHero
        title="Playlists"
        titleSubtext="Devcon"
        description="Devcon collections to help you dive deep into specific topic areas."
      />

      <div className="section">
        <div className="content">
          <div className={css['search-sort']}>
            <InputForm className={css['search']} placeholder="Search" icon={IconSearch} />
          </div>
        </div>
      </div>

      {categories.map((category, i) => {
        const first = i === 0

        let className = 'padding-bottom'

        if (first) className = 'padding-bottom margin-top'

        return (
          <div key={category} className={className}>
            <CuratedPlaylists title={category} items={playlists.filter(i => i.categories.includes(category))} />
          </div>
        )
      })}

      <Footer />
    </div>
  )
}
