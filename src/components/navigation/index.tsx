import React from "react"
import { useSiteNavigation } from "src/hooks/useSiteNavigation"
import { PageContentType } from "src/types/baseContentType"

export function Navigation() {
  const pages = useSiteNavigation()

  return (
    <ul>
      {pages.map((i: PageContentType) => (
        <li key={i.id}>{i.title}</li>
      ))}
    </ul>
  )
}
