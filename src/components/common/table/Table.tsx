import React from 'react'
import useSort, { SortVariation } from './useSort'
import css from './table.module.scss'
import ArrowAsc from 'src/assets/icons/arrow_asc.svg'
import ArrowDesc from 'src/assets/icons/arrow_desc.svg'

type HeaderProps = {
  columns: TableColumn[]
  setSortedBy: Function
  sortedBy: number
  sortDirection: string
}
type RowProps = {
  columns: TableColumn[]
  items: any[]
}
type TableColumn = {
  title: string
  key: string
  className?: string
  render?: Function
  sort?: SortVariation | Function
}
type TableProps = {
  columns: TableColumn[]
  items: any[]
  [key: string]: any
}

const TableHeader = (props: HeaderProps) => {
  return (
    <div className={css['header']}>
      {props.columns.map((column, index) => {
        let className = `${css['cell']} ${css['column-header']}`

        if (column.className) className = `${column.className} ${className}`
        if (column.sort) className += ` ${css['sort']}`

        const sortIsActive = props.sortedBy === index

        if (sortIsActive) {
          className += ` ${css[props.sortDirection]}`
        }

        const shouldRenderAsc = !sortIsActive || props.sortDirection === 'asc'
        const shouldRenderDesc = !sortIsActive || props.sortDirection === 'desc'

        return (
          <div
            key={column.key}
            className={className}
            style={{
              userSelect: 'none', // Prevents accidental text selection when double-clicking
            }}
            onClick={e => {
              if (column.sort) props.setSortedBy(index)
            }}
          >
            <p>{column.title.toUpperCase()}</p>
            {column.sort && (
              <div className={css['sort']}>
                {shouldRenderAsc && <ArrowAsc />}
                {shouldRenderDesc && <ArrowDesc />}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const TableRows = (props: RowProps) => {
  return (
    <>
      {props.items.map(item => {
        return (
          <div key={item.key} className={css['row']}>
            {props.columns.map(column => {
              const value = item[column.key]

              let className = css['cell']

              if (column.className) className = `${column.className} ${className}`

              return (
                <div key={column.title} className={className}>
                  {column.render ? column.render(item, column) : <p>{value}</p>}
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export const Table = (props: TableProps) => {
  const [sortedItems, sortedBy, setSortedBy, sortDirection] = useSort(props.items, props.columns)

  return (
    <div className={css['container']}>
      <TableHeader
        columns={props.columns}
        setSortedBy={setSortedBy}
        sortedBy={sortedBy}
        sortDirection={sortDirection}
      />
      <TableRows columns={props.columns} items={sortedItems} />
    </div>
  )
}
