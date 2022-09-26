import { AppLayout } from 'components/domain/app/Layout'
import { SideEvents } from 'components/domain/app/side-events'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import getNotionDatabase from 'components/domain/devcon-week/getNotionDatabase'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <SideEvents {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      scheduleData: await getNotionDatabase(context.locale || 'en', 'cc11ba1c0daa40359710c0958da7739c'),
    },
  }
}
