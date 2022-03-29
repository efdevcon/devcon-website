import React from 'react'
// import Image from 'next/image'
import css from './carousel.module.scss'
import Image1 from './images/image1.jpg'
import Image2 from './images/image2.jpg'
import Image3 from './images/image3.jpg'
import Image4 from './images/image4.jpg'
import Image5 from './images/image5.jpg'
import Image6 from './images/image6.jpg'

export function Carousel() {
  return (
    <div className={css['container']}>
      <h3>Bogota Colombia</h3>
      {/* TO-DO: Use next/image - couldn't get it working; goal is to set a fixed height and having width be decided by the intrinsic size of the image /*}
      {/* <div className={css['images']}>
        <Image alt={`Bogota`} src={Image1} height="100%" />
        <Image alt={`Bogota`} src={Image2} height="100%" />
        <Image alt={`Bogota`} src={Image3} height="100%" />
        <Image alt={`Bogota`} src={Image4} height="100%" />
        <Image alt={`Bogota`} src={Image5} height="100%" />
        <Image alt={`Bogota`} src={Image6} height="100%" />
        <Image alt={`Bogota`} src={Image1} height="100%" />
        <Image alt={`Bogota`} src={Image2} height="100%" />
        <Image alt={`Bogota`} src={Image3} height="100%" />
        <Image alt={`Bogota`} src={Image4} height="100%" />
        <Image alt={`Bogota`} src={Image5} height="100%" />
        <Image alt={`Bogota`} src={Image6} height="100%" />
      </div> */}

      <div className={css['images']}>
        <img src={Image1.src} alt="Bogota" />
        <img src={Image2.src} alt="Bogota" />
        <img src={Image3.src} alt="Bogota" />
        <img src={Image4.src} alt="Bogota" />
        <img src={Image5.src} alt="Bogota" />
        <img src={Image6.src} alt="Bogota" />
        <img src={Image1.src} alt="Bogota" />
        <img src={Image2.src} alt="Bogota" />
        <img src={Image3.src} alt="Bogota" />
        <img src={Image4.src} alt="Bogota" />
        <img src={Image5.src} alt="Bogota" />
        <img src={Image6.src} alt="Bogota" />
      </div>
    </div>
  )
}
