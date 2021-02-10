import React from 'react'
import { Contribute } from './contribute'
import { PageHero } from 'src/components/common/page-hero'
import dipLogo from 'src/assets/images/dip-logo.svg'
import Pencil from 'src/assets/icons/pencil.svg'
import BulletList from 'src/assets/icons/bullet_list.svg'
import { Proposals } from './proposals'
import { DIP, Contributor } from 'src/types/dip'

type DIPProps = {
  dips: Array<DIP>
  contributors: Array<Contributor>
  dipDescription: string
}

export function DIPOverview({ dips, contributors, dipDescription }: DIPProps) {
  return (
    <>
      <PageHero
        title="DIPs"
        logo={dipLogo}
        type="contribute"
        cta={[
          {
            title: 'Review DIPs',
            to: 'https://forum.devcon.org',
            icon: <BulletList />,
          },
          {
            title: 'Create Proposal',
            to: 'https://forum.devcon.org',
            icon: <Pencil />,
          },
        ]}
        navigation={[
          {
            title: 'FORUM',
            to: 'https://forum.devcon.org',
          },
          {
            title: 'GITHUB',
            to: 'https://github.com/efdevcon/DIPs',
          },
          {
            title: 'CONTRIBUTE',
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
