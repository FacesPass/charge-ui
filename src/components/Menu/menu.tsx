import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type onSelect = (selectIndex: string) => void

export interface IMenuProps {
  defaultIndex?: string  //默认的下标 0
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: onSelect
  defaultOpenSubMenus?: string[]
}

export interface IMenuContext {
  index?: string,
  onSelect?: onSelect,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]  //默认展开的subMenu的下标
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  //点击每一个item时设置active，并触发select回调
  const handleClick = (index: string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  //将context数据透传给子组件
  const passContextValue: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  }

  //对Menu组件里传入的children做类型限制
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: i.toString() })
      } else {
        console.error('警告⚠ ： Menu的children必须需要传入MenuItem组件或者SubMenu组件')
      }
    })
  }

  return (
    //testid自定义属性是用来跑测试用例的
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passContextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu