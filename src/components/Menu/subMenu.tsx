import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { IMenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  style?: React.CSSProperties
}


const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, style, children } = props

  const context = useContext(MenuContext)
  const defaultSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? defaultSubMenus.includes(index) : false

  const [menuOpen, setMenuOpen] = useState(isOpend)

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  //点击打开SubMenu
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any
  //鼠标移入展开SubMenu
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'submenu-horizontal': context.mode === 'horizontal',
      'open-submenu': menuOpen
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childrenElement = child as FunctionComponentElement<IMenuItemProps>
      if (childrenElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childrenElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('警告⚠ ：SubMenu里的children只能是MenuItem组件')
      }
    })

    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} style={style} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu