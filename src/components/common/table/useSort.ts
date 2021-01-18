import React from 'react';

export enum SortVariation {
  number,
  date,
  basic
}

type Sort = {
  column: string
  
}

export const presetSortingMethods = {
  number: (columnKey: string) => (a: any, b: any) => a[columnKey] - b[columnKey],
  date: (columnKey: string) => (a: any, b: any) => {
    const dateA = new Date(a[columnKey])
    const dateB = new Date(b[columnKey])

    return dateA === dateB ? 0 : dateA > dateB ? 1 : -1
  },
  basic: (columnKey: string) => (a: any, b: any) =>
    a[columnKey] === b[columnKey] ? 0 : a[columnKey] > b[columnKey] ? 1 : -1,
}

const useSort = (items: any) => {
  const [sort, setSort] = React.useState()

  const expandedSetSort = (column: string) => {
    const alreadySortedByColumn = sort?.column === column;

    if (alreadySortedByColumn) {
      setSort({
        ...sort,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {

    }
  }

  const sortedItems = React.useMemo(() => {
    if (sort) {
      // Custom sorting function
      if (typeof sort === 'function') {
        return items.sort(sort.method);
      }

      // If sort wasn't a function, it should reference a preset sorting method:
      const createSortingMethod = presetSortingMethods[sort.method] || presetSortingMethods.basic;
      // Have to instantiate the sorting method with the column key so it knows what to sort by
      const sortingMethod = createSortingMethod(sort.column);

      return items.sort(sortingMethod)
    }

    return items
  }, [items, sort])

  return [
    sortedItems,
    expandedSetSort
  ];
}

export default useSort;
