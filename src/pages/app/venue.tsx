import { AppLayout } from 'components/domain/app/Layout'
import { Venue } from 'components/domain/app/venue'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetFloors, GetRooms } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
    return <AppLayout>
        <Venue {...props} />
    </AppLayout>
})

export async function getStaticProps(context: any) {
    const intl = await getMessages(context.locale)
    const rooms = await GetRooms()
    const floors = await GetFloors()

    return {
        props: {
            messages: intl,
            navigationData: await GetNavigationData(context.locale),
            notification: GetLatestNotification(context.locale),
            page: DEFAULT_APP_PAGE,
            rooms,
            floors
        }
    }
}
