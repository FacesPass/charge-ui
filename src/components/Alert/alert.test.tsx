import React from 'react'
import { } from '@testing-library/react'
import Alert, { IAlertProps } from './alert'

const testProps: IAlertProps = {
  message: 'Success',
  type: 'success',
  description: 'Success description',
  onClose: jest.fn()
}


describe('测试Alert组件', () => {

})