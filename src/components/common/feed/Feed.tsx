import React from 'react'
import css from './feed.module.scss'
import IconTwitter from 'src/assets/icons/twitter.svg'
import { Link } from 'src/components/common/link'
import { Dropdown } from 'src/components/common/dropdown'
import { Filter, useFilter } from 'src/components/common/filter'
import { FilterOptions } from 'src/components/common/filter/Filter'
import { DropdownProps } from 'src/components/common/dropdown/Dropdown'
import moment from 'moment'

// Pagination <-- TODO
// const itemsPerPage = 5
// const [page] = React.useState(0)
// const offset = page * itemsPerPage
// const itemsInView = items.slice(offset, offset + itemsPerPage)
//  <div className={css['load-more']}>
//   <p>Load More</p>
//   <IconArrowDownward />
// </div>

type FeedItem = {
  date?: Date
  author?: string
  url: string
  title: string
  description?: string
  tags?: string[]
}

type Props = {
  inline?: boolean
  title: string
  items: Array<FeedItem>
  filterOptions?: FilterOptions
  sortOptions?: {
    options: DropdownProps['options']
    sort: (items: any[], sortBy: string) => any[]
  }
}

const Icon = ({ item }: { item: FeedItem }) => {
  if (item.url.includes('twitter')) {
    return <IconTwitter className={`icon ${css['icon']}`} />
  }

  return null
}

export const Feed = ({ inline, title, items, filterOptions, sortOptions }: Props) => {
  const [sortBy, setSortBy] = React.useState(sortOptions?.options[0].value)
  const [filteredData, filterState] = useFilter(filterOptions)
  const filteredItems = filterOptions ? filteredData : items
  const sortedItems = sortOptions ? sortOptions.sort(filteredItems, sortBy) : filteredItems

  const formattedItems = sortedItems.map((item: FeedItem, index) => {
    return (
      <Link to={item.url} key={item.url}>
        <div className={css['item-body']}>
          <div className={css['metadata']}>
            <p className={css['date']}>{moment.utc(item.date).format('MMM D, YYYY')}</p>
            <p className={css['author']}>{item.author}</p>
            {/* <Icon item={item} className={css['icon-desktop']} /> */}
          </div>
          <div className={css['text']}>
            <p className={`${css['title']} title`}>{item.title}</p>

            {/* {item.description && <p className={css['description']}>{item.description}</p>} */}

            <p className={css['description']}>
              A lot of people will travel to DevConVI. This will impose a number of risks to these people: flight
              Delays, baggage loss, theft, and others. We will build a decentralized travel insurance for DevConVI
              participants.
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className={css['tags']}>
                {item.tags.map(tag => {
                  return (
                    <div key={tag} className="label bold">
                      {tag}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <Icon item={item} />
        </div>
      </Link>
    )
  })

  return (
    <div className={`${css['feed']} ${inline ? css['inline'] : ''}`}>
      <div className={css['header']}>
        <h3 className={css['header']}>{title}</h3>
        <div className={css['right']}>
          {filterState && <Filter collapsed {...filterState} />}

          {sortOptions && <Dropdown options={sortOptions.options} value={sortBy} onChange={setSortBy} />}
        </div>
      </div>

      <div className={css['body']}>{formattedItems}</div>
    </div>
  )
}
