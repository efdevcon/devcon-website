import React from 'react'
import css from './proposals.module.scss'
import { Label } from 'src/components/common/label'
import { Link } from 'src/components/common/link'
import leftPad from 'src/utils/left-pad'
import { Table, SortVariation, TableColumn } from 'src/components/common/table'
import { DIP } from 'src/types/dip'
import GithubIcon from 'src/assets/icons/github.svg'
import TooltipIcon from 'src/assets/icons/tooltip.svg'
import { Share } from 'src/components/common/share'
import { useIntl } from 'gatsby-plugin-intl'

export const Links = ({ dip }: { dip: DIP }) => {
  return (
    <div className={css['links']}>
      {dip.discussion && (
        <Link to={dip.discussion}>
          <TooltipIcon />
        </Link>
      )}
      {dip.github && (
        <Link to={dip.github}>
          <GithubIcon />
        </Link>
      )}
      <Share url={dip.github} /*commented out until DIP page is deployed: url={`https://devcon.org${dip.slug}`}*/ />
    </div>
  )
}

const tableColumns: Array<TableColumn> = [
  {
    title: '#',
    key: 'number',
    className: css['index-column'],
    sort: SortVariation.basic,
    render: item => {
      return (
        <p className={`${css['index']} h3`}>
          <Link to={item.github} /*commented out until DIP page is deployed: to={item.slug}*/>
            {leftPad(item.number)}
          </Link>
        </p>
      )
    },
  },
  {
    intl: 'dips_name',
    key: 'title',
    className: css['name-column'],
    sort: SortVariation.basic,
    render: item => {
      return <Link to={item.github} /*commented out until DIP page is deployed: to={item.slug}*/>{item.title}</Link>
    },
  },
  {
    intl: 'dips_summary',
    className: css['summary-column'],
    key: 'summary',
  },
  {
    intl: 'dips_status',
    key: 'status',
    className: css['status-column'],
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
    intl: 'dips_themes',
    key: 'themes',
    className: css['themes-column'],
    sort: SortVariation.basic,
    render: item => {
      return item.themes ? item.themes.join(', ') : null
    },
  },
  {
    intl: 'dips_tags',
    key: 'tags',
    className: css['tag-column'],
    sort: (item1, item2) => {
      const a = item1.tags
        .map(item => item.trim().toLowerCase())
        .sort()
        .join('')
      const b = item2.tags
        .map(item => item.trim().toLowerCase())
        .sort()
        .join('')

      return a.localeCompare(b)
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
    intl: 'dips_authors',
    className: css['authors-column'],
    key: 'authors',
    // Authors have no standard format so this is a tricky one
    // render: item => {
    //   console.log(item.authors, 'authors')

    //   if (!item.authors) return null

    //   return (
    //     <li>
    //       {item.authors.map(
    //         author =>
    //           console.log(author, 'author') || (
    //             <li key={author} className="font-xs bold text-uppercase">
    //               {author}
    //             </li>
    //           )
    //       )}
    //     </li>
    //   )

    //   return item.authors ? item.authors.map(author => <p className="font-xs bold text-uppercase">{author}</p>) : null
    // },
  },
  {
    intl: 'dips_links',
    key: 'links',
    className: css['links-column'],
    render: item => {
      return <Links dip={item} />
    },
  },
  // RTD: remove expand colum/link
  // {
  //   intl: 'dips_expand',
  //   key: 'link',
  //   className: css['expand-column'],
  //   render: item => {
  //     return (
  //       <Link to={item.slug}>
  //         <ArrowRight />
  //       </Link>
  //     )
  //   },
  // },
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
  const intl = useIntl()

  // Pushing an extra column into the table to make room for a link back to the page
  const dipsWithLink = React.useMemo(() => {
    return props.dips.map(dip => {
      return {
        ...dip,
        link: dip.github,
      }
    })
  }, [props.dips])

  const filteredDips = React.useMemo(() => {
    return noFilter ? dipsWithLink : dipsWithLink.filter(dip => dip.status.toLowerCase() === statusFilter)
  }, [noFilter, dipsWithLink, statusFilter])

  return (
    <section id="proposals" className={css['container']}>
      <div className={css['top-container']}>
        <h3 className="subsection-header">{intl.formatMessage({ id: 'dips_proposals' })}</h3>
        <div className={css['filters']}>
          <p onClick={() => setStatusFilter(null)} className={noFilter ? css['active-filter'] : undefined}>
            {intl.formatMessage({ id: 'dips_all' })}
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

      <Table itemKey="number" items={filteredDips} columns={tableColumns} />
    </section>
  )
}
