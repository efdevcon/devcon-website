import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { getMessages } from 'utils/intl'

export const getGlobalData = async (context: any, isApp?: boolean) => {
  const intl = await getMessages(context.locale)

  if (isApp) {
    return {}
  }

  return {
    messages: intl,
    navigationData: await GetNavigationData(context.locale),
    notification: GetLatestNotification(context.locale) || null,
  }
}
