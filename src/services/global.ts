import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { getMessages, flattenMessages } from 'utils/intl'

export const getGlobalData = async (context: any, isApp?: boolean) => {
  const intl = await getMessages(context.locale, isApp)

  if (isApp) {
    return {
      messages: flattenMessages({ 
        global: {
          ...intl.global 
        },
        readmore: intl.readmore
      })
    }
  }

  return {
    messages: intl,
    navigationData: await GetNavigationData(context.locale),
    notification: GetLatestNotification(context.locale) || null,
  }
}
