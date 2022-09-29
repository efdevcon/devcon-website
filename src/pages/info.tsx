import { Info } from 'components/domain/app/info'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetSessions, GetSpeakers } from 'services/programming'
import { GetPage, GetCategories, GetContentSections, GetFAQ } from 'services/page'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Info {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const globalAppData = await getGlobalData(context, true)
  // const pageFAQ = await GetPage('/faq', context.locale)
  // const pageBogota = await GetPage('/bogota', context.locale)
  const sections = await GetContentSections(
    ['things-to-do', 'why-devcon-in-bogota', 'is-bogota-safe', 'what-areas-to-stay', 'registration-checkin', 'venue-guide'],
    context.locale
  )

  return {
    props: {
      ...globalAppData,
      messages: globalData.messages,
      faqs: await GetCategories(context.locale),
      cityGuideFaqs: await GetFAQ(context.locale),
      sections,
      page: DEFAULT_APP_PAGE,
    },
  }
}
