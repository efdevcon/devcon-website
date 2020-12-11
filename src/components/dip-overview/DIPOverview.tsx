import { Link } from 'gatsby'
import React from 'react'
import { useDIPs } from 'src/hooks/useDIPs'

export function DIPOverview() {
  const dips = useDIPs()

  return (
    <div>
      <h3>DIP Overview</h3>

      <ul>
        {dips.map(i => (
          <li key={i.number}>
            <Link to={`${i.slug}`}>#{i.number} - {i.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
