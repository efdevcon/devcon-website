import React from 'react'
import { CollapsedSection, CollapsedSectionContent, CollapsedSectionHeader } from 'components/common/collapsed-section'
import css from './info.module.scss'
import { AppNav } from 'components/domain/app/navigation'
import { Category } from 'types/Category'
import { CityGuideContent } from 'pages/bogota'
import { FAQ } from 'types/FAQ'
import { ContentSections } from 'types/ContentSection'
import { ContentSectionRow } from 'components/common/sections/ContentSection'

type InfoProps = {
  faqs: Category[]
  cityGuideFaqs: FAQ[]
  sections: ContentSections
}

export const Info = (props: InfoProps) => {
  const cityGuideSections = { ...props.sections }
  delete cityGuideSections['is-bogota-safe']
  delete cityGuideSections['registration-checkin']
  const safetySection = props.sections['is-bogota-safe']
  const registrationSection = props.sections['registration-checkin']
  const venueSection = props.sections['venue-guide']
  const foodSection = props.sections['food-drinks']

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Information',
          },
        ]}
      />
      <div className="section">
        <CollapsedSection className={css['no-border']}>
          <CollapsedSectionHeader className="border-bottom">
            <p className="app-header">FAQ</p>
          </CollapsedSectionHeader>
          <CollapsedSectionContent>
            <div className={css['faq']}>
              {props.faqs.map(({ questions, title }) => {
                return (
                  <CollapsedSection key={title} className={css['no-border']}>
                    <CollapsedSectionHeader className={`${css['subheader']} border-bottom`}>
                      <p className="font-sm-fixed bold">{title}</p>
                    </CollapsedSectionHeader>
                    <CollapsedSectionContent>
                      <div className={css['faq-inner']}>
                        {questions.map(({ body, title }) => {
                          return (
                            <CollapsedSection key={title}>
                              <CollapsedSectionHeader className={`${css['subheader']}`}>
                                <p className="font-sm bold">{title}</p>
                              </CollapsedSectionHeader>
                              <CollapsedSectionContent className={css['faq-inner-content']}>
                                <div
                                  className="markdown font-sm clear-bottom-less"
                                  dangerouslySetInnerHTML={{ __html: body }}
                                />
                              </CollapsedSectionContent>
                            </CollapsedSection>
                          )
                        })}
                      </div>
                    </CollapsedSectionContent>
                  </CollapsedSection>
                )
              })}
            </div>
          </CollapsedSectionContent>
        </CollapsedSection>
        {registrationSection &&
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Registration &amp; Check-in Info</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={registrationSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        }
        {venueSection &&
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Venue Guide</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={venueSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        }
        {foodSection &&
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Food &amp; Drinks</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={foodSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        }
        <CollapsedSection>
          <CollapsedSectionHeader>
            <p className="app-header">City Guide</p>
          </CollapsedSectionHeader>
          <CollapsedSectionContent>
            <CityGuideContent {...props} faqs={props.cityGuideFaqs} sections={cityGuideSections} insideApp />
          </CollapsedSectionContent>
        </CollapsedSection>
        {safetySection &&
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Safety</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={safetySection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        }
      </div>
    </>
  )
}
