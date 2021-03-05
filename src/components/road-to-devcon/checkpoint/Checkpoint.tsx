import React from 'react'
import css from './checkpoint.module.scss'
import marker from 'src/assets/images/marker.svg'
import { Tooltip } from 'src/components/common/tooltip'

type CheckpointProps = {
  number: string
  description: string
  action: string
  checkpointClassName?: string
  markerClassName?: string
}

export const Checkpoint = (props: CheckpointProps) => {
  const checkpointClassName = props.checkpointClassName ?? css['checkpoint']
  const markerClassName = props.markerClassName ?? css['marker']

  return (
    <Tooltip
      content={
        <div className={checkpointClassName}>
          <p>{props.number} ―</p>
          <p>{props.description}</p>
          <p>{props.action}</p>
        </div>
      }
    >
      <img className={markerClassName} src={marker} alt="Road to Devcon checkpoint" />
    </Tooltip>
  )
}
