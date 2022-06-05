import React from 'react'
// import Image from 'next/image'
import css from './carousel.module.scss'
import Bogota1 from './images/Bogota0.jpg'
import Bogota2 from './images/Bogota2.jpg'
import Bogota3 from './images/Bogota8.jpg'
import Bogota4 from './images/Bogota5.jpg'
// import Bogota5 from './images/Bogota5.jpg'
// import Bogota6 from './images/Bogota6.jpg'

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
        <img src={Bogota1.src} alt="Bogota" />
        <img src={Bogota3.src} alt="Bogota" />
        <img src={Bogota2.src} alt="Bogota" />
        <img src={Bogota4.src} alt="Bogota" />
        <img src={Bogota1.src} alt="Bogota" />
        <img src={Bogota3.src} alt="Bogota" />
        <img src={Bogota2.src} alt="Bogota" />
        <img src={Bogota4.src} alt="Bogota" />
      </div>
    </div>
  )
}
