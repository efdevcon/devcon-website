import React from 'react'
import Content from 'components/common/layouts/content'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { PageHero } from 'components/common/page-hero'
import { usePageContext } from 'context/page-context'
import { useTranslations } from 'next-intl'
import Pencil from 'assets/icons/pencil.svg'
import BulletList from 'assets/icons/bullet_list.svg'
import { PageContentSection } from './page-content-section'
import { Contribute } from '../dips/overview/contribute'
import { Proposals } from '../dips/overview/proposals'
import AllContributorsJson from '../../../../content/dips/contributors.json'
import { Contributor } from 'types/DIP'

export default pageHOC(function DIPsTemplate(props: any) {
  const intl = useTranslations()
  const contributors = AllContributorsJson as Contributor[]

  return (
    <Content theme={themes['teal']}>
      <PageHero
        cta={[
          {
            title: intl('dips_review_dips'),
            to: 'https://forum.devcon.org',
            icon: <BulletList />,
          },
          {
            title: intl('dips_create_proposal'),
            to: 'https://forum.devcon.org',
            icon: <Pencil />,
          },
        ]}
        navigation={[
          {
            title: intl('dips_forum').toUpperCase(),
            to: 'https://forum.devcon.org',
          },
          {
            title: 'GITHUB',
            to: 'https://github.com/efdevcon/DIPs',
          },
          {
            title: intl('dips_contribute').toUpperCase(),
            to: '#contribute',
          },
          {
            title: 'DIPS',
            to: '#proposals',
          },
        ]}
      />

      <PageContentSection>
        <Contribute dipDescription={props.page.body} contributors={contributors} />
        <Proposals dips={props.dips} />
      </PageContentSection>
    </Content>
  )
})
