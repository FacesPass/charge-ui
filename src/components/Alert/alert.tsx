import React, { useState } from 'react'
import classNames from 'classnames'

export interface IAlertProps {
  type?: 'success' | 'warning' | 'info' | 'error'
  message: string
  onClose?: () => void
  closeable?: boolean
  style?: React.CSSProperties
  className?: string
}

const Alert: React.FC<IAlertProps> = (props) => {
  const { type, message, onClose, closeable, style, className } = props

  const [closed, setClosed] = useState(false)

  const handleClose = (e: React.MouseEvent) => {
    setClosed(true)
  }

  const classes = classNames('charge-alert', className, `alert-${type}`)

  return (
    <div className={classes} style={style} >
      {message}
    </div>
  )
}

export default Alert