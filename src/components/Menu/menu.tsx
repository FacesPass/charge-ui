import React, { memo, createContext, useState } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './menuItem'

//菜单的模式类型，横向或者纵向展示
type MenuMode = 'horizontal' | 'vertical'
//选择的回调函数类型
type selectedCallback = (selectedIndex: number) => void

//菜单属性接口
export interface IMenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  children?: React.ReactNode
  onSelect?: selectedCallback
}

//Context用于向子组件传递数据
export interface IMenuContext {
  index?: number
  onSelect?: selectedCallback
}

//创建Context
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = memo((props) => {
  const {
    className,
    defaultIndex,
    mode,
    style,
    children,
    onSelect } = props

  //设置当前选中状态
  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  //点击切换当前的选中项
  const handleClick = (index: number) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  //定义Context传递的数据，将index和切换选择状态的回调函数向下传递给子组件MenuItem
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0, //如果currentActive没设置，就默认为0
    onSelect: handleClick
  }

  //该函数用于判断Menu里传入的子组件是否MenuItem，如果不是就提示错误信息
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      //as断言，获取到函数式组件的实例，用于获得属性推断，更友好的代码提示
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        //cloneElement，相当于克隆出一个新元素，将childElement和{index}进行浅层合并
        return React.cloneElement(childElement, { index })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    //data-testid用于在测试用例中获取到该元素
    <ul className={classes} style={style} data-testid="test-menu">
      {/* Provider将数据注入到子组件里 */}
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
})

//添加默认属性
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu
