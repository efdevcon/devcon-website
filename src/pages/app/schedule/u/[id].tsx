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

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <>
        {props.sessions.length === 0 && <NoResults text='Sorry Agenda Not found' subtext='Please try another link or go back to the schedule.' />}
        {props.sessions.length > 0 && <Schedule {...props} />}
      </>
    </AppLayout>
  )
})

export async function getServerSideProps(context: any) {
  const repo = new UserAccountRepository()

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      userId: context.params.id,
      event: await GetEvent(),
      sessions: await repo.findPersonalizedAgenda(context.params.id),
      tracks: await GetTracks(),
    },
  }
}
