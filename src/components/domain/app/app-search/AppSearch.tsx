import React from 'react'
import IconSearch from 'src/assets/icons/search.svg'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import { InputForm } from 'src/components/common/input-form'
import { Filter, FilterFoldout, NoResults, useFilter } from 'src/components/common/filter'
import {
  CollapsedSection,
  CollapsedSectionHeader,
  CollapsedSectionContent,
} from 'src/components/common/collapsed-section'
import { Button } from 'src/components/common/button'
import css from './app-search.module.scss'

type AppSearchProps = {
  search: {
    onChange: (args: any) => void
    placeholder: string
  }
  sortState: any
  filterStates: any[]
  noResults?: boolean
}

export const AppSearch = (props: AppSearchProps) => {
  return (
    <>
      <div className={css['filter']}>
        <InputForm
          className={css['search']}
          placeholder={props.search.placeholder}
          onChange={props.search.onChange}
          icon={IconSearch}
        />
        <div style={{ position: 'relative' }}>
          <Sort {...props.sortState} />

          <FilterFoldout>
            {(_, setOpen) => {
              const clearFilters = () => {
                props.filterStates.forEach(({ filterState }: any) => {
                  filterState?.clearFilter()
                })
              }

              const filterIsSelected = props.filterStates.some(({ filterState }: any) => {
                return filterState ? Object.keys(filterState.activeFilter).length : 0
              })

              return (
                <>
                  {props.filterStates.map(({ filterState, title }: any, index: any) => {
                    const nFiltersSelected = filterState ? Object.keys(filterState.activeFilter).length : 0

                    return (
                      <CollapsedSection key={index}>
                        <CollapsedSectionHeader title={title}>
                          {nFiltersSelected > 0 && (
                            <div className={css['n-filters-indicator']}>
                              <div className="label sm error">{nFiltersSelected}</div>
                            </div>
                          )}
                        </CollapsedSectionHeader>
                        <CollapsedSectionContent>
                          <div className={css['filter-container']}>
                            <Filter {...filterState} />
                          </div>
                        </CollapsedSectionContent>
                      </CollapsedSection>
                    )
                  })}

                  {filterIsSelected && (
                    <div className={css['filter-actions']}>
                      <button className={`plain ${css['clear']} hover-underline`} onClick={clearFilters}>
                        Clear all
                      </button>

                      <Button className="red" onClick={() => setOpen(false)}>
                        Confirm
                      </Button>
                    </div>
                  )}
                </>
              )
            }}
          </FilterFoldout>
        </div>
      </div>

      {props.noResults && <NoResults />}
    </>
  )
}

/*
  <AppSearch
    sort={[
      {

      },
      {

      }
    ]}
    filters={[
      {

      },
      {

      }
    ]}
  >
    <AppSearchResults>


    </AppSearchResults>
  </AppSearch>

*/
