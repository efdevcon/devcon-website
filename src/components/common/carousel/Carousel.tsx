import React from 'react'
import css from './carousel.module.scss'

import Image1 from './images/image1.jpg'
import Image2 from './images/image2.jpg'
import Image3 from './images/image3.jpg'
import Image4 from './images/image4.jpg'
import Image5 from './images/image5.jpg'

export function Carousel() {

  return (
    <div className={css['container']}>
      <h3>Bogota Colombia</h3>

      <ul className={css['images']}>
        {/* <li><img src={Image1} alt="Bogota" /></li>
        <li><img src={Image2} alt="Bogota" /></li>
        <li><img src={Image3} alt="Bogota" /></li> */}
        <li><img src={Image4} alt="Bogota" /></li>
        <li><img src={Image5} alt="Bogota" /></li>
      </ul>
    </div>
  )
}