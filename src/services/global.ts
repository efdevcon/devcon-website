import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { getMessages } from 'utils/intl'

export const getGlobalData = async (context: any) => {
  const intl = await getMessages(context.locale)

  return {
    messages: intl,
    navigationData: await GetNavigationData(context.locale),
    notification: GetLatestNotification(context.locale),
  }
}