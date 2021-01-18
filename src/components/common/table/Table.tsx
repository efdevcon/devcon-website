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
        return (
          <div key={column.title} className={css['column-header']}>
            {column.title}
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
          <div className={css['row']}>
            {props.columns.map(column => {
              const value = item[column.key]

              return <p>{value}</p>
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
