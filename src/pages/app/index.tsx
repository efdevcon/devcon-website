import { Home } from 'components/domain/app/home'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import useGetElementHeight from 'hooks/useGetElementHeight'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Home {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await getGlobalData(context.locale)),
      page: DEFAULT_APP_PAGE,
    },
  }
}
