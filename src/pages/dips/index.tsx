import React from 'react'
import Page from 'components/common/layouts/page'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { PageHero } from 'components/common/page-hero'
import { usePageContext } from 'context/page-context'
import { useTranslations } from 'next-intl'
import Pencil from 'assets/icons/pencil.svg'
import BulletList from 'assets/icons/bullet_list.svg'
// import { PageContentSection } from 'components/common/layouts/content/PageContentSection'
import { Contribute } from 'components/domain/dips/overview/contribute'
import { Proposals } from 'components/domain/dips/overview/proposals'
import AllContributorsJson from 'content/dips/contributors.json'
import { Contributor } from 'types/DIP'
import { getGlobalData } from 'services/global'
import { GetPage, GetDIPs } from 'services/page'
import { Tags } from 'components/common/tags'

export default pageHOC(function DIPsTemplate(props: any) {
  const pageContext = usePageContext()
  const intl = useTranslations()
  const contributors = AllContributorsJson as Contributor[]

  return (
    <Page theme={themes['teal']}>
      <PageHero
        path={[{ text: <span className="bold">Get Involved</span> }, { text: 'DIPs' }]}
        // cta={[
        //   {
        //     title: intl('dips_review_dips'),
        //     to: 'https://forum.devcon.org',
        //     icon: <BulletList />,
        //   },
        //   {
        //     title: intl('dips_create_proposal'),
        //     to: 'https://forum.devcon.org',
        //     icon: <Pencil />,
        //   },
        // ]}
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

      <div className="section">
        <Contribute dipDescription={props.page.body} contributors={contributors} />
        <Proposals dips={props.dips} />

        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/dips', context.locale)

  return {
    props: {
      ...globalData,
      dips: await GetDIPs(context.locale),
      page,
    },
  }
}
