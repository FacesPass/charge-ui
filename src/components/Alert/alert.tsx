import React, { useState } from 'react'
import classNames from 'classnames'

export interface IAlertProps {
  type?: 'success' | 'warning' | 'info' | 'error'
  message: string
  description?: React.ReactNode
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  closeable?: boolean
  closeText?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const Alert: React.FC<IAlertProps> = (props) => {
  const { type, message, onClose, closeable, closeText, style, className, description, ...others } = props

  const [closed, setClosed] = useState(false)

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true)
    //可选链操作符，没有这个函数就会返回undefined
    onClose?.(e)
  }

  const isClosable = closeText ? true : closeable

  const renderClose = () => isClosable ?
    (<button
      type="button"
      onClick={handleClose}
      className="charge-alert-close-btn"
      tabIndex={0}
    >
      {
        closeText ? (
          <span className="charge-close-text">{closeText}</span>
        ) : 'x'
      }
    </button>
    ) : null


  const classes = classNames('charge-alert', className, `charge-alert-${type}`)

  return (
    <div className={classNames(classes, { 'charge-alert-closed': closed })} style={style}>
      <div className="charge-alert-content">
        <div className="charge-alert-message">{message}</div>
        <div className="charge-alert-description">{description}</div>
      </div>

      {renderClose()}
    </div>
  )
}

Alert.defaultProps = {
  type: 'info'
}

export default Alert