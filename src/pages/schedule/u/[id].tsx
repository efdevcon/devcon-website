import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { UserAccountRepository } from 'server/repositories/UserAccountRepository'
import { Schedule } from 'components/domain/app/schedule'
import { GetTracks } from 'services/page'
import { GetEvent } from 'services/programming'
import { NoResults } from 'components/common/filter'
import { SEO } from 'components/domain/seo'

export default pageHOC((props: any) => {
  if (!props.userSchedule) {
    return <AppLayout>
      <NoResults text='Sorry Agenda Not found' subtext='Please try another link or go back to the schedule.' />
    </AppLayout>
  }

  if (!props.userSchedule.publicSchedule) {
    return <AppLayout>
      <NoResults text='Agenda is not public' subtext='Please try another link or go back to the schedule.' />
    </AppLayout>
  }

  return (
    <AppLayout>
      <SEO title={`${props.userSchedule.username}'s schedule`} />
      <Schedule {...props} sessions={props.userSchedule.sessions} />
    </AppLayout>
  )
})

export async function getServerSideProps(context: any) {
  const repo = new UserAccountRepository()

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      event: await GetEvent(),
      userId: context.params.id,
      userSchedule: await repo.findPersonalizedAgenda(context.params.id) ?? null,
      tracks: await GetTracks(),
    },
  }
}
