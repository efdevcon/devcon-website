import React, { ComponentType } from 'react'
import { NavigationData } from 'types/NavigationData'
import { Notification } from 'types/Notification'
import { Page } from 'types/Page'
import { PageContext } from './page-context'
import { SEO } from 'components/domain/seo'

type Props = {
  data: any
  navigationData: NavigationData
  notification: Notification
  page: Page
}

export const pageHOC =
  (PageContent: ComponentType<Props>, mapDataToContext?: (props: Props) => { [key: string]: any }) =>
  (props: Props) => {
    const context = {
      data: props.data,
      navigation: props.navigationData,
      notification: props.notification,
      ...(mapDataToContext && mapDataToContext(props)),
      current: props.page,
    }

    return (
      <PageContext.Provider value={context}>
        <SEO />
        <PageContent {...props} />
      </PageContext.Provider>
    )
  }
