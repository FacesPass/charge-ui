import React from 'react'
import { cleanup, fireEvent, render, RenderResult, wait, waitFor } from '@testing-library/react'
import Menu, { IMenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './menuItem'


const testProps: IMenuProps = {
  defaultIndex: '1',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >normal</MenuItem>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <SubMenu>
        <MenuItem>drop1</MenuItem>
        <MenuItem>drop2</MenuItem>
        <MenuItem>drop3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
  .submenu {
    display: none;
  }
  .submenu.open-submenu {
    display: block;
  }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile

  return style
}



let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试Menu和MenuItem组件', () => {
  //通用函数，在每个测试用例开始前都会触发
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('是否正确渲染使用默认参数时的Menu和MenuItem组件', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('is-disabled')
  })

  it('点击Item触发正确的回调函数', () => {
    const firstItem = wrapper.getByText('normal')
    fireEvent.click(firstItem)
    expect(firstItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('0')   //回调函数是以0被调用
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2')
  })

  it('正确渲染vertical垂直展示模式', () => {
    //清空，该函数会在每一个测试用例结束的时候执行
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  // it('Submenu的渲染逻辑测试', async () => {
  //   expect(wrapper.queryByText('drop1')).not.toBeVisible()
  //   await waitFor(() => {

  //   })

  //   fireEvent.click(wrapper.getByText('drop1'))
  //   expect(testProps.onSelect).toHaveBeenNthCalledWith('')
  // })
})