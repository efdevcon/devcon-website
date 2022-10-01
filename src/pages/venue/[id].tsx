import { AppLayout } from 'components/domain/app/Layout'
import { Room } from 'components/domain/app/venue'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetEvent, GetRooms, GetSessionsByRoom } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Room {...props} />
    </AppLayout>
  )
})

export async function getStaticPaths() {
  const rooms = await GetRooms()
  const paths = rooms.map(i => {
    return { params: { id: i.id } }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const id = context.params.id
  const room = (await GetRooms()).find(i => i.id === id)

  if (!room) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      event: await GetEvent(),
      room,
      sessions: await GetSessionsByRoom(id),
    },
  }
}
