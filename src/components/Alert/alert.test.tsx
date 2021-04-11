import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Alert from './alert'

describe('测试Alert组件', () => {

  it('渲染正确的Success类型的Alert组件', () => {
    const wrapper: RenderResult = render(<Alert message="Success" type="success" />)
    const element = wrapper.getByRole('alert')
    expect(element).toBeInTheDocument() //正确在页面中渲染
    expect(element).toHaveClass('charge-alert charge-alert-success')
  })

  it('正确渲染message和description属性', () => {
    const wrapper: RenderResult = render(<Alert message="Warning" description="Warning description" type="warning" />)
    const element = wrapper.getByRole('alert')
    const messageElement = element.querySelector('.charge-alert-message')
    const descriptionElement = element.querySelector('.charge-alert-description')
    expect(messageElement).toHaveTextContent('Warning')
    expect(descriptionElement).toHaveTextContent('Warning description')

  })

  it('点击关闭按钮正确触发回调函数', () => {
    const onClose = jest.fn()
    const afterClose = jest.fn()
    const wrapper: RenderResult = render(<Alert
      message="Test Click close"
      type="warning"
      closeable
      onClose={onClose}
      afterClose={afterClose}
    />)


    //获取alert实例
    const alertElement = wrapper.getByRole('alert')
    expect(alertElement).toBeInTheDocument()

    //测试onClose是否能被正确触发
    const closeElement = alertElement.querySelector('.charge-alert-close-btn') as Element
    fireEvent.click(closeElement)
    expect(onClose).toHaveBeenCalled()

    //测试afterClose是否能被正确的触发
    const afterCloseElement = alertElement.querySelector('.charge-alert-close-btn') as Element
    fireEvent.click(afterCloseElement)
    expect(alertElement).toBeVisible()

    waitFor(() => {
      expect(afterClose).toHaveBeenCalled()
      //触发回调后就在DOM中消失了
      expect(wrapper).not.toBeVisible()
    })

  })
})