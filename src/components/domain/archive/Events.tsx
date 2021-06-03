import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { useDevconEvents } from 'src/hooks/useDevconEvents'
import moment from 'moment'
import css from './events.module.scss'
import { Card } from '../../common/card'
import { BlogPost } from 'src/types/BlogPost'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'
import { DevconEvent } from 'src/types/DevconEvent'

interface Props {
    className?: string
}

export const Events = (props: any) => {
    const events = useDevconEvents();
    let className = css['container']
    if (props.className) {
        className += ` ${props.className}`
    }

  return (
    <div className={className}>
        {events.map((i: DevconEvent) => {
            return (
                <div>
                    <p>{i.number} - {i.title}</p>
                    <p>{i.description}</p>
                </div>
            )
        })}
    </div>
  )
}