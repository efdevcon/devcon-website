import React from 'react'
import css from './checkpoint.module.scss'
import marker from 'src/assets/images/marker.svg'
import { Tooltip } from 'src/components/common/tooltip'
import { Link } from 'src/components/common/link'

type CheckpointProps = {
  number: string
  description: string
  action: string
  checkpointClassName?: string
  markerClassName?: string
  onClick?: (...rest: any) => string
  link?: string
}

type ActionProps = {
  markerClassName?: string
  action: string
  onClick?: (...rest: any) => string
  link?: string
}

const Trigger = React.forwardRef((props: ActionProps, ref: any) => {
  const markerClassName = props.markerClassName ?? css['marker']

  const img = (
    <img ref={ref} onClick={props.onClick} className={markerClassName} src={marker} alt="Road to Devcon checkpoint" />
  )

  if (props.link) {
    return <Link to={props.link}>{img}</Link>
  }

  return img
})

export const Checkpoint = (props: CheckpointProps) => {
  const checkpointClassName = props.checkpointClassName ?? css['checkpoint']

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
      <Trigger
        markerClassName={props.markerClassName}
        action={props.action}
        link={props.link}
        onClick={props.onClick}
      />
    </Tooltip>
  )
}
