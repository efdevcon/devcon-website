import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import DefaultLayout from "src/components/layouts/default"

export default function Index() {
  const intl = useIntl()

  return (
    <DefaultLayout>
      <p>{intl.formatMessage({ id: "hello" })}</p>
    </DefaultLayout>
  )
}
