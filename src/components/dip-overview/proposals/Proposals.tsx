import React from 'react'
import css from './proposals.module.scss'
import { Label } from 'src/components/common/label'
import { Link } from 'src/components/common/link'
import { useDIPs } from 'src/hooks/useDIPs'
import leftPad from 'src/utils/left-pad'
import { Table, SortVariation } from 'src/components/common/table'

const tableColumns = [
  {
    title: '#',
    key: 'number',
    className: css['index-column'],
    sort: SortVariation.basic,
    render: item => {
      return <p className={`${css['index']} h3`}>{leftPad(item.number)}</p>
    },
  },
  {
    title: 'name',
    key: 'title',
    className: css['name-column'],
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
    render: item => {
      let labelType

      switch (item.status.toLowerCase()) {
        case 'withdrawn':
        case 'rejected':
          labelType = 'error'

          break
        case 'active':
        case 'accepted':
          labelType = 'success'

          break
      }

      return (
        <Label type={labelType}>
          <div className={css['label-content']}>
            <span>&#8226;</span>
            <p>{item.status.toUpperCase()}</p>
          </div>
        </Label>
      )
    },
  },
  {
    title: 'themes',
    key: 'themes',
    sort: SortVariation.basic,
    render: item => {
      return item.themes ? item.themes.join(', ') : null
    },
  },
  {
    title: 'tags',
    key: 'tags',
    sort: (item1, item2) => {
      return -1
    },
    render: item => {
      return item.tags
        ? item.tags.map(tag => (
            <Label type="neutral" className={css['tag']}>
              <p className="font-xs bold text-uppercase">{tag}</p>
            </Label>
          ))
        : null
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

type ProposalsProps = {}

export const Proposals = (props: ProposalsProps) => {
  const dips = useDIPs()

  return (
    <section id="proposals" className={css['container']}>
      <h3 className="subsection-header">PROPOSALS</h3>

      <Table items={dips} columns={tableColumns} />
    </section>
  )
}
