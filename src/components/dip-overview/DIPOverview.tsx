import React from 'react'
import { Contribute } from './contribute'
import { PageHero } from 'src/components/common/page-hero'
import dipLogo from 'src/assets/images/dip-logo.svg'
// import css from './dip-overview.module.scss'
import Pencil from 'src/assets/icons/pencil.svg'
import BulletList from 'src/assets/icons/bullet_list.svg'
import { Proposals } from './proposals'
import { useDIPs } from 'src/hooks/useDIPs'

export function DIPOverview() {
  const { dips, contributors } = useDIPs()

  return (
    <>
      <PageHero
        title="DIPs"
        logo={dipLogo}
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
          <Contribute contributors={contributors} />
          <Proposals dips={dips} />
        </div>
      </div>
    </>
  )
}
