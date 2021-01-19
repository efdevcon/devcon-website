import React from 'react'
import useSort, { SortVariation } from './useSort'
import css from './table.module.scss'

type HeaderProps = {
  columns: TableColumn[]
  setSort: Function
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
      {/* <div
        key="index"
        className={css['column-header']}
        onClick={() =>
          props.setSort({
            column: 'index',
            sort: presetSortingMethods.number,
          })
        }
      >
        #
      </div> */}

      {props.columns.map(column => {
        let className = css['column-header']

        if (column.className) className = `${column.className} ${className}`

        return (
          <div key={column.title} className={className}>
            <p>
              {column.title.toUpperCase()}
              {column.sort && ':SORT'}
            </p>
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

              let className = css['column-header']

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
  const [sortedItems, setSort] = useSort(props.items)

  return (
    <div className={css['container']}>
      <TableHeader columns={props.columns} setSort={setSort} />
      <TableRows columns={props.columns} items={sortedItems} />
    </div>
  )
}
