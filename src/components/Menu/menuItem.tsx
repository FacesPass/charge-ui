import React, { useContext, FC } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface IMenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  })

  const handleClickItem = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClickItem}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem