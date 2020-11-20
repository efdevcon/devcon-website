import React from "react"
import { useSiteMetadata } from "src/hooks/useSiteMetadata"

export function Header() {
  const { title, description } = useSiteMetadata()

  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}
