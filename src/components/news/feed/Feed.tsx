import React from 'react'
import css from './feed.module.scss'
import IconTwitter from 'src/assets/icons/twitter.svg'
import IconArrowDownward from 'src/assets/icons/arrow_downward.svg'
import { Link } from 'src/components/common/link'

const itemsPerPage = 5

type Props = {
  title: string
  items: Array<any>
}

export const Feed = ({ title, items }: Props) => {
  const [page] = React.useState(0)
  const offset = page * itemsPerPage
  const itemsInView = items.slice(offset, offset + itemsPerPage)

  const formattedItems = itemsInView.map((item, index) => {
    let number: string = (index + 1).toString()

    // Left pad with 0
    if (parseInt(number, 10) < 10) {
      number = '0' + number
    }

    return (
      <div className={css['item']} key={index}>
        <div className={css['list-number']}>{number}</div>
        <div className={css['item-body']}>
          <div className={css['date-handle']}>
            <p className={css['date']}>{item.metadata[0]}</p>
            <p className={css['handle']}>{item.metadata.slice(1).join(',')}</p>
          </div>
          <h4 className={css['title']}>
            <Link to={item.linkUrl} external>
              {item.title}
            </Link>
          </h4>
        </div>
        <IconTwitter className={`${css['icon']} icon`} />
      </div>
    )
  })

  return (
    <div className={css['feed']}>
      <h3 className={css['header']}>{title}</h3>

      <div className={css['body']}>{formattedItems}</div>

      <div className={css['load-more']}>
        <p>Load More</p>
        <IconArrowDownward />
      </div>
    </div>
  )
}
