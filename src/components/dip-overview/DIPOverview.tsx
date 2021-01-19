import React from 'react'
import { Label } from 'src/components/common/label'
import { useDIPs } from 'src/hooks/useDIPs'
import { Table, SortVariation } from 'src/components/common/table'
import css from './dip-overview.module.scss'
import { table } from 'console'

const items = [
  {
    name: 'Testaaaaaaaaaa aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa a',
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

const tableColumns = [
  {
    title: '#',
    key: 'number',
    className: css['index-column'],
  },
  {
    title: 'name',
    key: 'title',
    // className: css['name-column'],
    sort: SortVariation.basic,
  },
  {
    title: 'summary',
    className: css['summary-column'],
    key: 'summary',
  },
  {
    title: 'status',
    key: 'status',
    sort: SortVariation.basic,
    render: () => {
      return (
        <Label type="success">
          <div className={css['label-content']}>
            <span>&#8226;</span>
            <p>ACCEPTED</p>
          </div>
        </Label>
      )
    },
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
]

const formatDIPs = dips => {
  return dips.map(dip => {
    return {
      ...dip,
    }
  })
}

export function DIPOverview() {
  const dips = useDIPs()

  console.log(dips, 'dipsserr')

  return (
    <div className="section">
      <div className="content">
        <Table items={dips} columns={tableColumns} />

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
