import React, { useContext, FunctionComponentElement, memo } from 'react'
import classNames from 'classnames'

import { IMenuItemProps } from './menuItem'
import { MenuContext } from './menu'

//定义接口
export interface ISubMenuProps {
  index?: number
  title: string
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = memo(props => {
  const { index, title, className, children } = props
  //拿到父组件Menu传过来的Context
  const context = useContext(MenuContext)

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  //判断SubMenu里的子组件只能传入MenuItem
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })

    return (
      <ul className="submenu">
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      {/* SubMenu的标题 */}
      <div className="submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  )
})

SubMenu.displayName = 'SubMenu'
export default SubMenu