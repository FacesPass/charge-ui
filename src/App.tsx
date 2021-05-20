import React from 'react';
// import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon'

import Alert from './components/Alert/alert'

library.add(fas)
function App() {
  return (
    <>
      <Alert message="Success Tips"
        closeable
        type="success"
      />
      <Alert message="Info Tips"
        closeable
      />
      <Alert message="Error Tips"
        type="error"
      />
      <Alert message="Warning Tips"
        type="warning"
      />

      {/* <Icon icon="arrow-alt-circle-left" theme="primary"></Icon> */}

      <Menu onSelect={(index) => console.log(index)} defaultOpenSubMenus={['3']}>
        <MenuItem>111</MenuItem>
        <MenuItem>222</MenuItem>
        <MenuItem>333</MenuItem>
        <SubMenu title="444">
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
        </SubMenu>
      </Menu>

      {/* <Button btnType='default'>默认</Button>
      <Button btnType='primary'>主要</Button>
      <Button btnType='danger'>危险</Button>
      <Button btnType='success'>成功</Button>
      <Button btnType='warning'>警告</Button>
      <Button btnType='primary' size='sm'>小主要</Button>
      <Button btnType='danger' size='lg'>大危险</Button>
      <Button btnType='danger' round size='lg'>圆角</Button>
      <Button disabled>禁用</Button>
      <Button btnType='link' href='https://www.baidu.com'>去百度</Button>
      <Button btnType='link' disabled href='https://www.baidu.com'>去百度</Button> */}
    </>
  );
}

export default App;
