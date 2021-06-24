import React from 'react'
import Slider from 'react-slick'
import css from './curated.module.scss'
import { BasicCard } from 'src/components/common/card'
import { LinkButton } from 'src/components/common/link-button'
import { Playlist } from 'src/types/Playlist'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

type PlaylistProps = {
  title?: string
  viewMore?: boolean
  items: Array<Playlist>
}

export const CuratedPlaylists = (props: PlaylistProps) => {
  const nItems = props.items.length

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(nItems, 4.1),
    arrows: false,
    touchThreshold: 100,
    slidesToScroll: 4,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(nItems, 2.1),
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(nItems, 1.1),
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={css['curated-playlists']}>
      <div className={css['header']}>
        {props.title && <h2 className="spaced title">{props.title}</h2>}
        {props.viewMore && (
          <LinkButton to={'/archive/playlists'} className={css['button']}>
            View more <ArrowRight />
          </LinkButton>
        )}
      </div>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((i: Playlist) => {
            let className = `${css['video-card']} ${css['slide']} ${css['big']}`

            return (
              <BasicCard key={i.id} className={className} allowDrag linkUrl={i.slug} expandLink>
                <div className="aspect square">
                  <img
                    src={i.imageUrl}
                    alt={`${i.title} Devcon playlist`}
                    placeholder="blurred"
                    className={css['image']}
                  />
                </div>
                <div className={css['body']}>
                  <div className="label">{i.videoCount ?? 0} talks</div>
                  <h4 className="title">{i.title}</h4>
                  {i.curators && i.curators.length > 0 && (
                    <p className="bold font-xs">
                      <span className={css['opaque']}>BY</span> {i.curators?.join(', ').toUpperCase()}
                    </p>
                  )}
                </div>
              </BasicCard>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
