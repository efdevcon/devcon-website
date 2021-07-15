import React from 'react'
// import Slider from 'react-slick'
import css from './curated.module.scss'
import { BasicCard } from 'src/components/common/card'
import { LinkButton } from 'src/components/common/link-button'
import { Playlist } from 'src/types/Playlist'
import { Link } from 'src/components/common/link'
import ArrowRight from 'src/assets/icons/arrow_right.svg'
import { Slider, useSlider } from 'src/components/common/slider'

type PlaylistProps = {
  title: string
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

  const sliderProps = useSlider(sliderSettings)

  return (
    <div className={css['curated-playlists']}>
      <Slider
        sliderProps={sliderProps}
        className={css['slider']}
        title={props.title}
        // custom={
        //   props.viewMore
        //     ? () => {
        //         return (
        //           <div className={css['view-more']}>
        //             <LinkButton to={'/archive/playlists'} className={`${css['button']} sm`}>
        //               View more <ArrowRight />
        //             </LinkButton>

        //             <Link to="/archive/playlists" className={css['view-more-mobile']}>
        //               View More
        //             </Link>
        //           </div>
        //         )
        //       }
        //     : undefined
        // }
      >
        {props.items.map((i: Playlist) => {
          let className = `${css['video-card']} ${css['big']}`

          if (sliderProps[1].canSlide) className += ` ${css['slide']}`

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
                    <span className={css['opaque']}>BY</span> {i.curators.join(', ').toUpperCase()}
                  </p>
                )}
              </div>
            </BasicCard>
          )
        })}
      </Slider>

      <LinkButton to={'/archive/playlists'} className={`${css['button']} sm`}>
        View more <ArrowRight />
      </LinkButton>
    </div>
  )
}
