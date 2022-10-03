import React, { useState } from 'react'
import { CollapsedSection, CollapsedSectionContent, CollapsedSectionHeader } from 'components/common/collapsed-section'
import css from './info.module.scss'
import { AppNav } from 'components/domain/app/navigation'
import { Category } from 'types/Category'
import { CityGuideContent } from 'pages/bogota'
import { FAQ } from 'types/FAQ'
import { ContentSections } from 'types/ContentSection'
import { ContentSectionRow } from 'components/common/sections/ContentSection'
import { Search } from 'components/common/filter/Filter'
import { CodeOfConduct, TermsOfService } from 'components/common/layouts/footer/Legal'
import { ModalLink } from 'components/common/layouts/footer/Footer'
import { Link } from 'components/common/link'
import { useRouter } from 'next/router'
import { PageIntroduction } from 'components/domain/app/home/Home'
import DevaSmallBackground from 'assets/images/deva-small-background.png'

type InfoProps = {
  faqs: Category[]
  cityGuideFaqs: FAQ[]
  sections: ContentSections
}

export const Info = (props: InfoProps) => {
  const router = useRouter()
  const [openFaq, setOpenFaq] = React.useState({} as { [key: string]: boolean })
  const [openTabs, setOpenTabs] = React.useState<any>(
    router.asPath.split('#')[1] ? { [router.asPath.split('#')[1]]: true } : {}
  )
  const [search, setSearch] = useState('')
  const cityGuideSections = { ...props.sections }
  delete cityGuideSections['is-bogota-safe']
  delete cityGuideSections['registration-checkin']
  const safetySection = props.sections['is-bogota-safe']
  const registrationSection = props.sections['registration-checkin']
  const venueSection = props.sections['venue-guide']
  const foodSection = props.sections['food-drinks']

  const filteredFaq = search
    ? props.faqs.filter(category => {
        if (category.title.toLowerCase().includes(search.toLowerCase())) return true

        return category.questions.some(
          q => q.title.toLowerCase().includes(search) || q.body.toLowerCase().includes(search)
        )
      })
    : props.faqs

  function onSearch(nextVal: any) {
    setSearch(nextVal)

    if (!nextVal) {
      setOpenFaq({})
    } else {
      filteredFaq.forEach(category =>
        setOpenFaq(openFaq => {
          return {
            ...openFaq,
            [category.title]: true,
          }
        })
      )
    }
  }

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
        <PageIntroduction
          // title="Welcome to the Devcon Passport"
          bodyLeftTitle="Deva Help Desk"
          bodyLeftText="Hey there, I'm Deva your personal guide at Devcon Bogota! Below you can find all the information you are looking for related to having an amazing Devcon Experience."
          backgroundAlt="Devcon passport logo"
          background={DevaSmallBackground}
          ctaText="If you did not find particular information you are looking for feel free to tweet at me!"
          button={{
            text: '@EFDevcon',
            url: 'https://twitter.com/efdevcon',
          }}
        />

        <CollapsedSection className={css['no-border']}>
          <CollapsedSectionHeader className="border-bottom">
            <p className="app-header">FAQ</p>
          </CollapsedSectionHeader>
          <CollapsedSectionContent>
            <div className={css['filter']}>
              <Search className={css['search']} placeholder="Search FAQ" onChange={onSearch} value={search} />
            </div>
            <div className={css['faq']}>
              {filteredFaq.map(({ questions, title }) => {
                return (
                  <CollapsedSection
                    key={title}
                    className={css['no-border']}
                    open={openFaq[title]}
                    setOpen={() => {
                      const isOpen = openFaq[title]
                      const nextOpenState = {
                        ...openFaq,
                        [title]: true,
                      }

                      if (isOpen) {
                        delete nextOpenState[title]
                      }

                      setOpenFaq(nextOpenState)
                    }}
                  >
                    <CollapsedSectionHeader className={`${css['subheader']} border-bottom`}>
                      <p className="font-sm-fixed bold">{title}</p>
                    </CollapsedSectionHeader>
                    <CollapsedSectionContent dontAnimate>
                      <div className={css['faq-inner']}>
                        {questions
                          .filter(q => q.title.toLowerCase().includes(search) || q.body.toLowerCase().includes(search))
                          .map(({ body, title }) => {
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
        {registrationSection && (
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Registration &amp; Check-in Info</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={registrationSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        )}
        {venueSection && (
          <CollapsedSection
            open={openTabs['venue']}
            setOpen={() => {
              const isOpen = openTabs['venue']

              const nextOpenState = {
                ...openTabs,
                ['venue']: true,
              }

              if (isOpen) {
                delete nextOpenState['venue']
              }

              setOpenTabs(nextOpenState)
            }}
          >
            <CollapsedSectionHeader>
              <p className="app-header">Venue Guide</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={venueSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        )}
        {foodSection && (
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Food &amp; Drinks</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={foodSection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        )}
        <CollapsedSection>
          <CollapsedSectionHeader>
            <p className="app-header">City Guide</p>
          </CollapsedSectionHeader>
          <CollapsedSectionContent>
            <CityGuideContent {...props} faqs={props.cityGuideFaqs} sections={cityGuideSections} insideApp />
          </CollapsedSectionContent>
        </CollapsedSection>
        {safetySection && (
          <CollapsedSection>
            <CollapsedSectionHeader>
              <p className="app-header">Safety</p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent>
              <ContentSectionRow section={safetySection} />
            </CollapsedSectionContent>
          </CollapsedSection>
        )}
        <CollapsedSection>
          <CollapsedSectionHeader>
            <p className="app-header">App Feedback</p>
          </CollapsedSectionHeader>
          <CollapsedSectionContent>
            <p className={`${css['github']} clear-bottom`}>
              If you have any (technical) issues, feedback or questions about the App, please connect with us on{' '}
              <Link to="https://github.com/efdevcon/devcon-website/">Github</Link>.
            </p>
          </CollapsedSectionContent>
        </CollapsedSection>

        <ModalLink title="Code of Conduct" linkClassName={`${css['modal-link']} app-header`}>
          <CodeOfConduct />
        </ModalLink>
        <ModalLink title="Terms of Service" linkClassName={`${css['modal-link']} app-header`}>
          <TermsOfService />
        </ModalLink>
      </div>
    </>
  )
}
