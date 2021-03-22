import React, { memo, useContext } from 'react'
import classNames from 'classnames'

import { MenuContext } from './menu'

//定义MenuItem的属性接口
export interface IMenuItemProps {
  index?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = memo((props) => {
  const { index, disabled, className, children, style } = props

  //使用从父组件Menu传递过来的context数据
  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index //如果父组件传过来的index等于这里设置的index就高亮
  })

  const handleClick = () => {
    //父组件有传递选择事件回调函数过来的话就调用
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
})

//设置该组件的默认展示名字
MenuItem.displayName = 'MenuItem'
export default MenuItem