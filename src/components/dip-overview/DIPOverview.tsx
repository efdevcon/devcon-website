import React from 'react'
import { Contribute } from './contribute'
import { PageHero } from 'src/components/common/page-hero'
import dipLogo from 'src/assets/images/dip-logo.svg'
import Pencil from 'src/assets/icons/pencil.svg'
import BulletList from 'src/assets/icons/bullet_list.svg'
import { Proposals } from './proposals'
import { DIP, Contributor } from 'src/types/dip'
import { useIntl } from 'gatsby-plugin-intl'

type DIPProps = {
  dips: Array<DIP>
  contributors: Array<Contributor>
  dipDescription: string
}

export function DIPOverview({ dips, contributors, dipDescription }: DIPProps) {
  const intl = useIntl()

  return (
    <>
      <PageHero
        title="DIPs"
        logo={dipLogo}
        type="contribute"
        cta={[
          {
            title: intl.formatMessage({ id: 'dips_review_dips' }),
            to: 'https://forum.devcon.org',
            icon: <BulletList />,
          },
          {
            title: intl.formatMessage({ id: 'dips_create_proposal' }),
            to: 'https://forum.devcon.org',
            icon: <Pencil />,
          },
        ]}
        navigation={[
          {
            title: intl.formatMessage({ id: 'dips_forum' }).toUpperCase(),
            to: 'https://forum.devcon.org',
          },
          {
            title: 'GITHUB',
            to: 'https://github.com/efdevcon/DIPs',
          },
          {
            title: intl.formatMessage({ id: 'dips_contribute' }).toUpperCase(),
            to: '#contribute',
          },
          {
            title: 'DIPS',
            to: '#proposals',
          },
        ]}
      />
      <div className="section">
        <div className="content">
          <Contribute dipDescription={dipDescription} contributors={contributors} />
          <Proposals dips={dips} />
        </div>
      </div>
    </>
  )
}
