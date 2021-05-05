import React from 'react'
import css from './poaps.module.scss'

interface POAPsProps {
  address: string
}

export const POAPs = (props: POAPsProps) => {
  return (
    <div className={css['container']}>
      <h3>POAPs</h3>
      <img className={css['poap']} src='https://storage.googleapis.com/poapmedia/road-to-devcon-attendee-survey-2021-logo-1615859956840.png' alt='RTD Quest 1' />
    </div>
  )
}
