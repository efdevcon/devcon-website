import React from 'react'
// import { Link } from 'src/components/common/link'
// import { useDIPs } from 'src/hooks/useDIPs'
import { Table, SortVariation } from 'src/components/common/table'

const items = [
  {
    name: 'Testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    summary: 'Test',
    status: 'TEst',
    themes: 'Test',
    tags: ['a', 'c', 'b'],
    authors: ['b', 'a', 'C'],
    links: [],
  },
  {
    name: 'Testa',
    summary: 'Test',
    status: 'TEst',
    themes: 'Test',
    tags: ['a', 'c', 'b'],
    authors: ['b', 'a', 'C'],
    links: [],
  },
]

export function DIPOverview() {
  // const dips = useDIPs()

  return (
    <div className="section">
      <div className="content">
        <Table
          items={items}
          columns={[
            {
              title: 'name',
              key: 'name',
              sort: SortVariation.basic,
            },
            {
              title: 'summary',
              key: 'summary',
            },
            {
              title: 'status',
              key: 'status',
              sort: SortVariation.basic,
            },
            {
              title: 'themes',
              key: 'themes',
              sort: SortVariation.basic,
            },
            {
              title: 'tags',
              key: 'tags',
              sort: (item1, item2) => {
                return -1
              },
            },
            {
              title: 'authors',
              key: 'authors',
            },
            {
              title: 'links',
              key: 'links',
            },
          ]}
        />

        {/* <ul>
        {dips.map(i => (
          <li key={i.number}>
            <Link to={`${i.slug}`}>
              #{i.number} - {i.title}
            </Link>
          </li>
        ))}
      </ul> */}
      </div>
    </div>
  )
}
