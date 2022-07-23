import ForgetPasswordFrom from '../ForgetPasswordFrom'
import RegisterFrom from '../RegisterFrom'
import LoginForm from '../LoginForm'
import { useState } from 'react'

import { ReactComponent as Gddilogo } from '../icon/gddi.svg'
import './LoginWrap.module.less'

type Active = 'LoginForm' | 'ForgetPasswordFrom' |'RegisterFrom'

const LoginWrap = (): JSX.Element => {
  const [active, setActive] = useState<Active>('LoginForm')

  const getCls = (key: Active) => {
    if (active === key) {
      return 'form_wrap_item form_wrap_item_active'
    }
    return 'form_wrap_item'
  }
  return (
    <div styleName='LoginWrap'>
      <div className='gddi_info_wrap'>
        <div className='gddi_info_inner'>
          <Gddilogo />

          <h3 className='system_name'>共达地智能系统</h3>
          <h5 className='system_des'>零门槛定制高精度AI模 零代码部署至终端设备</h5>
        </div>
      </div>
      <div className='form_wrap'>
        <div className={getCls('LoginForm')}>
          <LoginForm setActive={setActive}/>
        </div>
        <div className={getCls('ForgetPasswordFrom')}>
          <ForgetPasswordFrom setActive={setActive} />
        </div>
        <div className={getCls('RegisterFrom')}>
          <RegisterFrom setActive={setActive} />
        </div>

      </div>
    </div>
  )
}

export default LoginWrap
