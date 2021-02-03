import React from 'react'
import css from './dip.module.scss'
import proposalCss from 'src/components/dip-overview/proposals/proposals.module.scss'
import { Links } from 'src/components/dip-overview/proposals/Proposals'
import { PageHero } from 'src/components/common/page-hero'
import { Link } from 'src/components/common/link'
import { Label } from 'src/components/common/label'
import dipLogo from 'src/assets/images/dip-logo.svg'
import { Table } from 'src/components/common/table'
import { mapToDIP } from 'src/hooks/useDIPs'
import leftPad from 'src/utils/left-pad'
import { DIP as DIPType } from 'src/types/dip'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

const tableColumns = [
  {
    title: 'status',
    key: 'status',
    // className: proposalCss['status-column'],
    render: (item: DIPType) => {
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
          <div className={proposalCss['label-content']}>
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
    // className: proposalCss['themes-column'],
    render: (item: DIPType) => {
      return item.themes ? item.themes.join(', ') : null
    },
  },
  {
    title: 'tags',
    key: 'tags',
    render: (item: DIPType) => {
      return item.tags
        ? item.tags.map(tag => (
            <Label key={tag} type="neutral" className={proposalCss['tag']}>
              <p className="font-xs bold text-uppercase">{tag}</p>
            </Label>
          ))
        : null
    },
  },
  {
    title: 'authors',
    // className: proposalCss['authors-column'],
    key: 'authors',
  },
]

export function DIP(props: { dip: DIPType }) {
  const formattedDIP = React.useMemo(() => {
    return mapToDIP(props.dip)
  }, [props.dip])

  return (
    <div className={css['dip-container']}>
      <PageHero
        type="dip"
        logo={dipLogo}
        renderCustom={() => {
          return (
            <div className={css['nav']}>
              <Link to={formattedDIP.prev_dip} className={css['prev']}>
                <ArrowLeft style={{ fontSize: '0.8em' }} />
              </Link>

              {formattedDIP.next_dip && (
                <Link to={formattedDIP.next_dip} className={css['next']}>
                  <p className="bold">Next DIP</p>
                  <ArrowRight style={{ fontSize: '0.8em' }} />
                </Link>
              )}
            </div>
          )
        }}
      />
      <div className="section">
        <div className="content">
          <div className={css['header']}>
            <div className={css['dip-number']}>
              <p className="h3 bold">DIP</p>
              <p className="h2 bold">{leftPad(formattedDIP.number + '')}</p>
            </div>

            <h1 className={css['title']}>{formattedDIP.title}</h1>

            <Links dip={formattedDIP} />
          </div>
          <Table items={[formattedDIP]} columns={tableColumns} />
          <div dangerouslySetInnerHTML={{ __html: props.dip.html }} className="markdown" />
        </div>
      </div>
    </div>
  )
}
