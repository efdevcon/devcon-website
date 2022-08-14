import React from 'react'
import css from './dashboard.module.scss'
import { CollapsedSection, CollapsedSectionContent, CollapsedSectionHeader } from 'components/common/collapsed-section'
import { Notification } from '../notifications'
import { Session, SessionCard } from '../session'
import { SliderStickyNotes } from 'components/common/slider/SliderVariations'
import { DropdownVariationDots } from 'components/common/dropdown/Dropdown'
import Image from 'next/image'
import image1 from 'assets/images/side-events-hero.png'
import image2 from 'assets/images/neo-matrix.png'
import { AppNav } from 'components/domain/app/navigation'
import { Card } from 'components/common/card'
import { Slider, useSlider } from 'components/common/slider'

const galleryEvents = [
  {
    title: 'Continuous Devcon',
    description:
      'Be sure to visit the Cyber Basement to experience the truly immersive co-working space. Kept open late into the night to accomodate your needs.',
    image: image1,
  },
  {
    title: 'Continuous Devcon 2',
    description: 'Kept open late into the night to accomodate your needs.',
    image: image2,
  },
  {
    title: 'Continuous Devcon 3',
    description:
      'Be sure to visit the Cyber Basement to experience the truly immersive co-working space. Kept open late into the night to accomodate your needs.',
    image: image1,
  },
  {
    title: 'Continuous Devcon 4',
    description: 'Kept open late into the night to accomodate your needs.',
    image: image2,
  },
]

export const Dashboard = (props: any) => {
  const [openNotifications, setOpenNotifications] = React.useState(true)
  const [openUpcomingSessions, setOpenUpcomingSessions] = React.useState(true)

  const sliderSettings = {
    infinite: false,
    touchThreshold: 100,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    // slidesToScroll: 3,
    swipeToSlide: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
        },
      },
    ],
  }

  const sliderProps = useSlider(sliderSettings)

  return (
    <>
      <AppNav />
      <div className="section no-overflow">
        <div className={css['hero']}>
          <div className={css['cards']}>
            <Slider sliderProps={sliderProps} onlySlider>
              {galleryEvents.map((event, i: number) => {
                let className = css['card']

                if (i === galleryEvents.length - 1) className += ` ${css['last']}`

                return (
                  <Card
                    className={className}
                    slide={sliderProps[1].canSlide}
                    key={event.title}
                    title={event.title}
                    description={event.description}
                    imageUrl={image1}
                    expandLink
                    // linkUrl={blog.permaLink} // Linking to blog domain temporarily until blog page is done (static-phase)
                    // metadata={[moment(blog.date).format('ll'), blog.author]}
                    allowDrag
                  />
                )
              })}
            </Slider>
          </div>
        </div>

        <CollapsedSection
          className={css['latest-notification']}
          open={openNotifications}
          setOpen={() => setOpenNotifications(!openNotifications)}
        >
          <CollapsedSectionHeader title="Latest Notification" />
          <CollapsedSectionContent>
            <Notification />
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection open={openUpcomingSessions} setOpen={() => setOpenUpcomingSessions(!openUpcomingSessions)}>
          <CollapsedSectionHeader title="Upcoming Sessions" />
          <CollapsedSectionContent>
            <SessionCard session={props.sessions[0]} />
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection>
          <CollapsedSectionHeader title="Schedule Overview" />
          <CollapsedSectionContent>
            <Notification />
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection>
          <CollapsedSectionHeader title="Suggested Sessions" />
          <CollapsedSectionContent>
            <Notification />
          </CollapsedSectionContent>
        </CollapsedSection>

        <div className={css['quicklinks']}>
          <div className={css['title-container']}>
            <p className="app-header bold">Quicklinks</p>

            <div className={css['dropdown']}>
              <DropdownVariationDots
                value="Another thing2"
                onChange={() => {}}
                options={[
                  {
                    text: 'Menu Item 1',
                    value: 'Another thing2',
                    onClick: (close: any) => close(),
                  },
                  {
                    text: 'Menu Item 2',
                    value: 'Another thing3',
                    onClick: (close: any) => close(),
                  },
                  {
                    text: 'Menu Item 3',
                    value: 'Another thing4',
                    onClick: (close: any) => close(),
                  },
                  {
                    text: 'Menu Item 4',
                    value: 'Another thing5',
                    onClick: (close: any) => close(),
                  },
                ]}
              />
            </div>
          </div>

          <SliderStickyNotes
            cards={[
              {
                title: 'Schedule',
                description: 'View & manage your devcon schedule.',
                url: '/app/schedule',
                color: 'pink',
              },
              {
                title: 'Guides',
                description: 'Access Devcon Bogota local guides.',
                url: '/app/guides',
                color: 'yellow',
              },
              {
                title: 'Venue Map',
                description: 'Find your way around the Conference.',
                url: '/app/venue',
                color: 'green',
              },
              {
                title: 'Speakers',
                description: 'View speakers presenting at Devcon.',
                url: '/app/speakers',
                color: 'blue',
              },
            ]}
          />
        </div>

        <CollapsedSection>
          <CollapsedSectionHeader title="Side Events" />
          <CollapsedSectionContent>
            <Notification />
          </CollapsedSectionContent>
        </CollapsedSection>
      </div>
    </>
  )
}
