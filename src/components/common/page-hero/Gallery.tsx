import React from 'react'
import Slider from 'react-slick'

type GalleryProps = {
  scenes: {
    render: () => React.ReactNode
  }[]
}

export const Gallery = (props: GalleryProps) => {
  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    // slidesToShow: Math.min(nItems, 5.1), // 4 = number of items
    arrows: false,
    dots: true,
    touchThreshold: 100,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       // slidesToShow: Math.min(nItems, 3.1),
    //       slidesToScroll: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: Math.min(nItems, 1.1),
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }

  return (
    <Slider {...sliderSettings}>
      {props.scenes.map((scene, i) => {
        return <React.Fragment key={scene.id || i}>{scene.render()}</React.Fragment>
      })}
    </Slider>
  )
}
