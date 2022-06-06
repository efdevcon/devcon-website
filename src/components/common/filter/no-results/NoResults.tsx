import React from 'react'
import css from './no-results.module.scss'
import Image from 'next/image'
import noResults from 'assets/images/no-results.png'

export const NoResults = (props: any) => {
  return (
    <div className={css['no-results-container']}>
      <div className={css['no-results-image-container']}>
        <Image alt="" className={css['image']} src={noResults} />

        <p className="font-xxl bold">Sorry No Results Found</p>
        <p>Please try another filter</p>
      </div>
    </div>
  )
}
