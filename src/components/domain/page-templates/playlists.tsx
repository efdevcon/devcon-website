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

export const Playlists = () => {
  const playlists = usePlaylists()
  const categories = [...new Set(playlists.map(i => i.categories).flat())]

  return (
    <div className={css['container']}>
      <SEO />
      <Header withStrip />

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

      <div className="section">
        <div className="content">
          {categories.map(category => {
            return (
              <div key={category}>
                <CuratedPlaylists title={category} items={playlists.filter(i => i.categories.includes(category))} />
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
