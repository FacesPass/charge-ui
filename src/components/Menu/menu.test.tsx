import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import Menu, { IMenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: IMenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: IMenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const TestMenu = (props: IMenuProps) => {
  return (
    <Menu {...props} >
      <MenuItem>
        active
      </MenuItem>
      <MenuItem>
        test
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('测试Menu组件', () => {
  //beforeEach钩子函数在每个测试用例开始时都会触发
  //用于获取到每一个MenuItem元素
  beforeEach(() => {
    wrapper = render(TestMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('默认属性时，是否可以正确渲染Menu和MenuItem组件', () => {
    //是否在HTML页面文档中(判断是否正确渲染)
    expect(menuElement).toBeInTheDocument()
    //是否拥有menu test类名
    expect(menuElement).toHaveClass('menu test')
    //Menu菜单的MenuItem选项个数是否为3
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('点击MenuItem时，是否可以触发回调函数改变选中状态', () => {
    //获取到上面的含有test文本的MenuItem
    const testMenuItem = wrapper.getByText('test')
    //点击testMenuItem
    fireEvent.click(testMenuItem)
    expect(testMenuItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    //出发回调函数之后index应该被触发为1
    expect(testProps.onSelect).toHaveBeenCalledWith(1)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(2)
  })

  it('设置mode为vertical纵向展示时，是否可以正确渲染', () => {
    //手动触发cleanup去清空React树，防止有两个带有'test-menu的节点'
    cleanup()
    const verticalWrapper = render(TestMenu(testVerticalProps))
    const menuElement = verticalWrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})