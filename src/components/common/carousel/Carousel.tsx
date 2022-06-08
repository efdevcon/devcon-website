import React from 'react'
import css from './carousel.module.scss'

type CarouselProps = {
  title?: string
  images: {
    src: StaticImageData
    alt: string
  }[]
}

export function Carousel(props: CarouselProps) {
  return (
    <div className={css['container']}>
      <h3>{props.title}</h3>

      <div className={css['images']}>
        {props.images.map((image, index) => {
          return <img key={index + 'first'} src={image.src.src} alt={image.alt} />
        })}
        {props.images.map((image, index) => {
          return <img key={index + 'second'} src={image.src.src} alt={image.alt} />
        })}
      </div>

      {/* TO-DO: Use next/image - couldn't get it working; goal is to set a fixed height and having width be decided by the intrinsic size of the image /*}
      {/* <div className={css['images']}>
        {props.images.map((image, index) => {
          return <Image key={index + 'first'} layout="fixed" src={image.src} alt={image.alt} />
        })}
        {props.images.map((image, index) => {
          return <Image key={index + 'second'} layout="fixed" src={image.src} alt={image.alt} />
        })}
      </div> */}
    </div>
  )
}
