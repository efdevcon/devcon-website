import { AppLayout } from 'components/domain/app/Layout'
import { Notifications } from 'components/domain/app/notifications'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetSessions, GetSpeakers } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
    return <AppLayout>
        <Notifications {...props} />
    </AppLayout>
})

export async function getStaticProps(context: any) {
    const intl = await getMessages(context.locale)

    return {
        props: {
            messages: intl,
            navigationData: await GetNavigationData(context.locale),
            notification: GetLatestNotification(context.locale),
            page: DEFAULT_APP_PAGE,
            sessions: await GetSessions(),
            speakers: await GetSpeakers()
        }
    }
}
