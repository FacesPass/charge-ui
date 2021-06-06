import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, style, theme, ...others } = props

  //icon-primary
  const classes = classNames('charge-icon', className, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} style={style} {...others} />
  )
}


export default Icon