import React from 'react'
import css from './proposals.module.scss'
import { Label } from 'src/components/common/label'
import { Link } from 'src/components/common/link'
import leftPad from 'src/utils/left-pad'
import { Table, SortVariation } from 'src/components/common/table'
import { DIP } from 'src/types/dip'
import { normalizeUnits } from 'moment'

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
      const a = item1.tags.slice().sort().join('')
      const b = item2.tags.slice().sort().join('')

      return ('' + a.attr).localeCompare(b.attr)
    },
    render: item => {
      return item.tags
        ? item.tags.map(tag => (
            <Label key={tag} type="neutral" className={css['tag']}>
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

type ProposalsProps = {
  dips: Array<DIP>
}

const filterOrder: { [key: string]: number } = {
  draft: 0,
  review: 1,
  accepted: 2,
  withdrawn: 3,
  rejected: 4,
}

const resolveStatuses = (dips: Array<DIP>) => {
  const uniqueStatuses: { [key: string]: string } = {}

  dips.forEach((dip: DIP) => {
    const normalizedStatus: string = dip.status.toLowerCase()

    if (!uniqueStatuses[normalizedStatus]) {
      if (typeof filterOrder[normalizedStatus] === 'undefined') return

      uniqueStatuses[normalizedStatus] = normalizedStatus
    }
  })

  return Object.values(uniqueStatuses).sort((a, b) => {
    const aPriority = filterOrder[a]
    const bPriority = filterOrder[b]

    if (aPriority > bPriority) {
      return 1
    } else if (aPriority < bPriority) {
      return -1
    }

    return 0
  })
}

export const Proposals = (props: ProposalsProps) => {
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)
  const noFilter = !statusFilter

  const filteredDips = React.useMemo(() => {
    return noFilter ? props.dips : props.dips.filter(dip => dip.status.toLowerCase() === statusFilter)
  }, [noFilter, props.dips, statusFilter])

  return (
    <section id="proposals" className={css['container']}>
      <div className={css['top-container']}>
        <h3 className="subsection-header">PROPOSALS</h3>
        <div className={css['filters']}>
          <p onClick={() => setStatusFilter(null)} className={noFilter ? css['active-filter'] : undefined}>
            All
          </p>

          {resolveStatuses(props.dips).map(status => {
            const normalizedStatus = status?.toLowerCase()
            const active = normalizedStatus === statusFilter

            return (
              <p
                key={normalizedStatus}
                onClick={() => setStatusFilter(statusFilter === normalizedStatus ? null : normalizedStatus)}
                className={active ? css['active-filter'] : undefined}
              >
                {normalizedStatus[0].toUpperCase() + normalizedStatus.slice(1)}
              </p>
            )
          })}
        </div>
      </div>

      <Table items={filteredDips} columns={tableColumns} />
    </section>
  )
}
