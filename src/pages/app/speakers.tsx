import { AppLayout } from 'components/domain/app/Layout'
import { Speakers } from 'components/domain/app/speakers'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetEventDays, GetSpeakers, GetTracks } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
    return <AppLayout>
        <Speakers {...props} />
    </AppLayout>
})

export async function getStaticProps(context: any) {
    return {
        props: {
            messages: await getMessages(context.locale),
            navigationData: await GetNavigationData(context.locale),
            notification: GetLatestNotification(context.locale),
            page: DEFAULT_APP_PAGE,
            speakers: await GetSpeakers(),
            tracks: await GetTracks(),
            eventDays: await GetEventDays()
        }
    }
}
