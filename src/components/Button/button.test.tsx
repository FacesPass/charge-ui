import React from 'react'
//render可以将我们的组件渲染到真实的DOM节点上去
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps } from '.'

//声明一个测试用的Props
const testProps: ButtonProps = {
  className: 'btn btn-primary',
  btnType: 'primary',
  size: 'lg'
}

//触发disabled的Props
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()  //创建一个模拟的点击方法
}

//describe可以做多个测试
describe('测试Button组件', () => {
  //it类似于test
  it('渲染正确的default类型的Button按钮', () => {
    const wrapper = render(<Button>按钮</Button>) //render将组件进行渲染
    const element = wrapper.getByText('按钮')  //获取拥有"按钮"文本的实例
    expect(element).toBeInTheDocument() //断言Button组件在Document文本中
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default') //断言该Button组件有btn和btn-default样式类
  })
  it('根据不同的props显示不同的组件', () => {
    const wrapper = render(<Button {...testProps}>按钮</Button>)
    const element = wrapper.getByText('按钮')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg')
  })
  it('渲染链接类型，并且btnType为link，且提供了href属性', () => {
    const wrapper = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('渲染设置了disabled属性的Button', () => {
    const wrapper = render(<Button {...disabledProps}>按钮</Button>)
    const element = wrapper.getByText('按钮') as HTMLButtonElement //将element元素断言为Button类型，可以获得更好的类型支持
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element) //触发点击事件
    expect(disabledProps.onClick).not.toHaveBeenCalled()  //onClick方法没有被触发
  })
})