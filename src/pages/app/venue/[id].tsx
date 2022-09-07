import { AppLayout } from 'components/domain/app/Layout'
import { Room } from 'components/domain/app/venue'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetRooms, GetSessionsByRoom } from 'services/programming'
import { DEFAULT_APP_PAGE, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { getMessages } from 'utils/intl'
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
    return { params: { id: i.id }, locale: 'en' }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const id = context.params.id
  const intl = await getMessages(context.locale)
  const room = (await GetRooms()).find(i => i.id === id)
  if (!room) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      room,
      sessions: await GetSessionsByRoom(id),
    },
  }
}
