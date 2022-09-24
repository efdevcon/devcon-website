import { AppLayout } from 'components/domain/app/Layout'
import { Venue } from 'components/domain/app/venue'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetFloors, GetRooms, GetSessions } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { useRouter } from 'next/router'
import { Room as RoomType } from 'types/Room'
import { Room } from 'components/domain/app/venue'

export default pageHOC(({ sessions, ...props }: any) => {
  const { query } = useRouter()
  const roomID = query.room
  const room = props.rooms.find((room: RoomType) => room.id === roomID)

  return (
    <AppLayout>
      <>{room ? <Room room={room} sessions={sessions} {...props} /> : <Venue {...props} />}</>
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  const rooms = await GetRooms()
  const floors = await GetFloors()

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      rooms,
      floors,
      sessions: await GetSessions(),
    },
  }
}
