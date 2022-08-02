import { AppLayout } from 'components/domain/app/Layout'
import { Venue } from 'components/domain/app/venue'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetFloors, GetRooms } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Venue {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  const rooms = await GetRooms()
  const floors = await GetFloors()

  return {
    props: {
      ...(await getGlobalData(context.locale)),
      page: DEFAULT_APP_PAGE,
      rooms,
      floors,
    },
  }
}
