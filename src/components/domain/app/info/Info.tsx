import React from 'react'
import { Link, LinkList } from 'src/components/common/link'
import {
  CollapsedSection,
  CollapsedSectionContent,
  CollapsedSectionHeader,
} from 'src/components/common/collapsed-section'
import { InputForm } from 'src/components/common/input-form'
import { Form, FormTextArea, FormInput, FormDropdown } from 'src/components/common/form'
import { Dropdown } from 'src/components/common/dropdown'
import { Button } from 'src/components/common/button'
import css from './info.module.scss'

const ProvideFeedbackForm = () => {
  return (
    <Form
      className={css['feedback-form']}
      onSubmit={console.log}
      defaultValues={{ feedbackCategory: 'general-feedback', name: 'John Doe' }}
    >
      <FormDropdown
        fieldKey="feedbackCategory"
        defaultValue="general-feedback"
        options={[
          {
            text: 'General Feedback',
            value: 'general-feedback',
          },
          {
            text: 'Specific Backfeed',
            value: 'specific-backfeed',
          },
          {
            text: 'Something Else',
            value: 'something-else',
          },
        ]}
      />

      <FormInput fieldKey="name" placeholder="Name" fieldOptions={{ required: true }} />

      <FormInput fieldKey="email" placeholder="Email" fieldOptions={{ required: true }} />

      <FormTextArea fieldKey="message" placeholder="Message" fieldOptions={{ required: true }} />

      <Button className="red">Submit Feedback</Button>
    </Form>
  )
}

export const Info = (props: any) => {
  return (
    <div className="section">
      <div className="content">
        <CollapsedSection>
          <CollapsedSectionHeader title="FAQ" />
          <CollapsedSectionContent>
            <InputForm id="input-form_search_header" placeholder="Filter by Keywords" type="search" />

            <div className={css['faq']}>
              <h4 className="app-header">General</h4>
              <CollapsedSection>
                <CollapsedSectionHeader
                  className={css['subheader']}
                  title="What time will the conference start and end?"
                />
                <CollapsedSectionContent>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                </CollapsedSectionContent>
              </CollapsedSection>
              <CollapsedSection>
                <CollapsedSectionHeader
                  className={css['subheader']}
                  title="What time will the conference start and end?"
                />
                <CollapsedSectionContent>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                </CollapsedSectionContent>
              </CollapsedSection>
              <CollapsedSection>
                <CollapsedSectionHeader
                  className={css['subheader']}
                  title="What time will the conference start and end?"
                />
                <CollapsedSectionContent>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                  <p>What time will the conference start and end?</p>
                </CollapsedSectionContent>
              </CollapsedSection>
            </div>
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
