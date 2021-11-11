import React from 'react'
import { Link, LinkList } from 'src/components/common/link'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'src/components/common/collapsed-section'
import { InputForm } from 'src/components/common/input-form'
import { Dropdown } from 'src/components/common/dropdown'
import css from './info.module.scss'

const ProvideFeedbackForm = () => {
  const [feedbackCategory, setFeedbackCategory] = React.useState('general-feedback')

  return (
    <div>
      <p>Subject</p>
      <Dropdown
        value={feedbackCategory}
        onChange={setFeedbackCategory}
        options={[
          {
            text: 'General Feedback',
            value: 'general-feedback',
          },
        ]}
      />

      <InputForm id="input-form_search_header" type="search" />
      <InputForm id="input-form_search_header" type="search" />
      <InputForm id="input-form_search_header" type="search" />
    </div>
  )
}

export const Info = (props: any) => {
  return (
    <div className="section">
      <div className="content">
        <CollapsedSection>
          <CollapsedSectionHeader title="FAQ" />
          <CollapsedSectionContent>
            <p>Nothing here</p>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Registration / Check-in Info" />
          <CollapsedSectionContent>
            <p>
              Machine learning is being adopted more and more broadly in technology. Such success is largely due to a
              combination of algorithmic breakthroughs, computation resource improvements, and the access to a large
              amount of diverse training data. The collection of data can raise concerns about siloing, security, and
              user privacy.
            </p>

            <p className="bold margin-top">Additional Links</p>
            <LinkList className="margin-bottom">
              <Link to="https://devcon.org">EF Ecosystem Support Program</Link>
              <Link to="https://devcon.org">Grantee Roundup August 2021</Link>
              <Link to="https://devcon.org">Grantee Roundup July 2021</Link>
            </LinkList>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Health and Safety Guides" />
          <CollapsedSectionContent>
            <p>Nothing here</p>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Venue Guide" />
          <CollapsedSectionContent>
            <p>Nothing here</p>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Local Guides" />
          <CollapsedSectionContent>
            <p>Nothing here</p>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Food & Drink" />
          <CollapsedSectionContent>
            <p>Nothing here</p>
          </CollapsedSectionContent>
        </CollapsedSection>
        <CollapsedSection>
          <CollapsedSectionHeader title="Provide Feedback" />
          <CollapsedSectionContent>
            <ProvideFeedbackForm />
          </CollapsedSectionContent>
        </CollapsedSection>
      </div>
    </div>
  )
}
