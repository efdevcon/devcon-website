import React, { useState } from 'react'
import { useDevconEditions } from 'src/hooks/useDevconEditions'
import moment from 'moment'
import css from './editions.module.scss'
import { DevconEdition } from 'src/types/DevconEdition'
import { Button } from 'src/components/common/button'
import OnDemandVideoIcon from 'src/assets/icons/on_demand_video.svg'
import PlaylistIcon from 'src/assets/icons/playlist.svg'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { HorizontalScroller } from 'src/components/common/horizontal-scroller'

interface Props {
  className?: string
}

export const SlideGrid = (props: any) => {
  const [next, setNext] = React.useState(0)
  const [animatingOut, setAnimatingOut] = React.useState<any>(undefined)

  const setNextWrapper = (fn: () => number) => {
    if (animatingOut) return

    setAnimatingOut({ onDone: () => setNext(fn) })
  }

  React.useEffect(() => {
    if (animatingOut) {
      let timeout = setTimeout(() => {
        animatingOut.onDone()
        setAnimatingOut(undefined)
      }, 800)

      return () => clearTimeout(timeout)
    }
  }, [animatingOut])

  return (
    <div className={`${css['grid']} ${css[`constellation-${next}`]} ${animatingOut ? css['animating-out'] : ''}`}>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>
      <div>
        <GatsbyImage image={getImage(props.images[next])} objectFit="cover" />
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
      </div>

      <div className={css['nav-prev']} onClick={() => setNextWrapper(next => next - 1)}>
        <div
          data-direction="left"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
        prev
      </div>
      <div className={css['nav-next']} onClick={() => setNextWrapper(next => next + 1)}>
        <div
          data-direction="right"
          className={`${css['revealer']} ${animatingOut ? css['revealer-hide-x'] : css['revealer-show-x']}`}
        ></div>
        next
      </div>
    </div>
  )
}

export const Editionss = () => {
  const editions = useDevconEditions()

  return (
    <div className="section padding-bottom">
      <div className="content">
        <SlideGrid images={editions.map(edition => edition.image)} />
      </div>
    </div>
  )
}

export const Editions = (props: Props) => {
  const editions = useDevconEditions()
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0)
  let className = `padding-top padding-bottom border-top ${css['container']}`
  if (props.className) {
    className += ` ${props.className}`
  }

  const selectedEdition = editions[selectedEditionIndex]

  return (
    <div className="section">
      <div className="content">
        <div className={className}>
          <HorizontalScroller>
            <div className={css['numbers']}>
              {editions.map((i: DevconEdition, index: number) => {
                let className = css['edition']
                if (i.number === selectedEdition.number) className += ` ${css['selected']}`

                return (
                  <div key={i.number} className={className}>
                    <p className={css['conference']}>Devcon Editions</p>
                    <p className={css['number']} onClick={() => setSelectedEditionIndex(index)}>
                      {i.number}
                    </p>
                  </div>
                )
              })}
            </div>
          </HorizontalScroller>

          <div className={css['image-container']}>
            <div className="aspect square">
              {editions.map((i: DevconEdition, index: number) => {
                const nConstellations = 3
                const gridConstellation = (index % nConstellations) + 1
                let className = `${css['constellation-' + gridConstellation]} ${css['images']}`

                if (index === selectedEditionIndex) className += ` ${css['selected']}`

                return (
                  <div className={className} key={index}>
                    <div className={css['image-wrapper']}>
                      <GatsbyImage image={getImage(i.image1)} objectFit="cover" placeholder="black" alt={i.title} />
                    </div>

                    <div className={css['image-wrapper']}>
                      <GatsbyImage image={getImage(i.image2)} objectFit="cover" placeholder="black" alt={i.title} />
                    </div>

                    <div className={css['image-wrapper']}>
                      <GatsbyImage image={getImage(i.image3)} objectFit="cover" placeholder="black" alt={i.title} />
                    </div>

                    <div className={`${css['image-wrapper']} ${css['title']}`}>
                      <GatsbyImage image={getImage(i.imageTitle)} objectFit="contain" alt={i.title} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={css['info']} key={selectedEdition.title}>
            <div className={css['title']}>
              <p className="title">{selectedEdition.title}</p>
              <p className="subtitle">{selectedEdition.location}</p>
              {selectedEdition.startDate && selectedEdition.endDate ? (
                <p>
                  {moment(selectedEdition.startDate).format('MMM DD')} -{' '}
                  {moment(selectedEdition.endDate).format('MMM DD')} {moment(selectedEdition.endDate).format('YYYY')}
                </p>
              ) : (
                <p>Date: TBD</p>
              )}
            </div>
            <div className={css['description']}>
              <p>{selectedEdition.description}</p>
            </div>
            <div className={css['buttons-container']}>
              <div className={css['buttons']}>
                <Button to="/archive/watch?edition=5" className={`${css['button']} red ghost sm`}>
                  Watch <OnDemandVideoIcon />
                </Button>

                {selectedEdition.links.map(i => {
                  return (
                    <Button key={i.title} to={i.url} className={`${css['button']} white ghost sm`}>
                      {i.title}
                      {i.title.toLowerCase() === 'playlist' && (
                        <PlaylistIcon style={{ fontSize: '0.9em', marginTop: '2px' }} />
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
