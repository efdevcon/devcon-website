import React from 'react';

export enum SortVariation {
  number = 'number',
  date = 'date',
  basic = 'basic'
}

// Generic sorting methods
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

const useSort = (items: any, columns: any) => {
  const [columnIndex, setColumnIndex] = React.useState<number>(0);
  const [sortDirection, setSortDirection] = React.useState<string>('asc');

  const setSort = (nextColumnIndex: number) => {
    const alreadySortedByColumn = columnIndex === nextColumnIndex;

    if (alreadySortedByColumn) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setColumnIndex(0)
        setSortDirection('asc')
      }
    } else {
      setColumnIndex(nextColumnIndex);
      setSortDirection('asc');
    }
  }

  const sortedItems = React.useMemo(() => {
    const sort = () => {
      const shouldSort = typeof columnIndex === 'number';

      if (shouldSort) {
        const column = columns[columnIndex];
  
        if (typeof column.sort === 'function') {
          return items.sort(column.sort);
        } else {
          // If sort wasn't custom, it should reference a preset sorting method:
          const createSortingMethod = presetSortingMethods[column.sort] || presetSortingMethods.basic;
          // Have to instantiate the sorting method with the column key so it knows what to sort by
          const sortingMethod = createSortingMethod(column.key);
    
          return items.sort(sortingMethod)
        }
      }
  
      return items;
    }

    const sortedItems = sort();

    if (sortDirection === 'desc') return sortedItems.reverse();

    return sortedItems;
  }, [sortDirection, columnIndex, items, columns])

  return [
    sortedItems,
    columnIndex,
    setSort,
    sortDirection
  ];
}

export default useSort;
