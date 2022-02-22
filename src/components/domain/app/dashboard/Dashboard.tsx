import React from 'react'
import css from './dashboard.module.scss'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'components/common/collapsed-section'
import { Notification } from '../notifications'
import { Session, SessionCard } from '../session'
import { SliderStickyNotes } from 'components/common/slider/SliderVariations'
import { DropdownVariationDots } from 'components/common/dropdown/Dropdown'
import { Gallery } from 'components/common/gallery'

const galleryEvents = [
  {
    title: 'Continuous Devcon',
    description:
      'Be sure to visit the Cyber Basement to experience the truly immersive co-working space. Kept open late into the night to accomodate your needs.',
  },
  {
    title: 'Continuous Devcon 2',
    description: 'Kept open late into the night to accomodate your needs.',
  },
  {
    title: 'Continuous Devcon 3',
    description:
      'Be sure to visit the Cyber Basement to experience the truly immersive co-working space. Kept open late into the night to accomodate your needs.',
  },
  {
    title: 'Continuous Devcon 4',
    description: 'Kept open late into the night to accomodate your needs.',
  },
]

export const Dashboard = (props: any) => {
  const [openNotifications, setOpenNotifications] = React.useState(true)
  const [openUpcomingSessions, setOpenUpcomingSessions] = React.useState(true)
  const [currentSlide, setCurrentSlide] = React.useState(0)

  return (
    <div className="section">
      <div className="content">
        <div className={css['hero']}>
          <div className={css['image-container']}>
            <Gallery onChange={setCurrentSlide}>
              {/* TODO: Fix images
              <Image fluid={data.allFile.nodes[1].childImageSharp.fluid} objectFit="cover" />
              <Image fluid={data.allFile.nodes[2].childImageSharp.fluid} objectFit="cover" />
              <Image fluid={data.allFile.nodes[0].childImageSharp.fluid} objectFit="cover" />
              <Image fluid={data.allFile.nodes[1].childImageSharp.fluid} objectFit="cover" /> */}
            </Gallery>
          </div>

          <div className={css['text']}>
            <p className={css['title']}>{galleryEvents[currentSlide].title}</p>
            <p className={css['description']}>{galleryEvents[currentSlide].description}</p>
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
                title: 'Food & Drink Menu',
                description: 'View event menu items and dietary information.',
                color: 'pink',
              },
              {
                title: 'Local City Guide',
                description: 'Access Devcon Bogota local guides.',
                color: 'yellow',
              },
              {
                title: 'Side Events',
                description: 'Access all the other events happening around devcon.',
                color: 'green',
              },
              {
                title: 'Speakers',
                description: 'View speakers presenting at Devcon.',
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
    </div>
  )
}
