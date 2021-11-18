import React from 'react'
import css from './dashboard.module.scss'
import Image from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'src/components/common/collapsed-section'
import { Notification } from '../notifications'
import { Session, SessionCard } from '../session'
import { SliderStickyNotes } from 'src/components/common/slider/SliderVariations'
import { DropdownVariationDots } from 'src/components/common/dropdown/Dropdown'

export const Dashboard = (props: any) => {
  const [openNotifications, setOpenNotifications] = React.useState(true)
  const [openUpcomingSessions, setOpenUpcomingSessions] = React.useState(true)

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["neo-matrix.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 800, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  `)

  return (
    <div className="section">
      <div className="content">
        <div className={css['hero']}>
          <Image fluid={data.allFile.nodes[0].childImageSharp.fluid} objectFit="cover" />
        </div>

        <CollapsedSection open={openNotifications} setOpen={() => setOpenNotifications(!openNotifications)}>
          <CollapsedSectionHeader title="Latest Notification" />
          <CollapsedSectionContent>
            <Notification />
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection open={openUpcomingSessions} setOpen={() => setOpenUpcomingSessions(!openUpcomingSessions)}>
          <CollapsedSectionHeader title="Upcoming Sessions" />
          <CollapsedSectionContent>
            <SessionCard />
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
