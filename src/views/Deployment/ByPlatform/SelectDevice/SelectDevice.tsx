
import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton } from '@src/UIComponents'
import { Form, message } from 'antd';
import { useMemo } from 'react'
import { APP_SetModuleConfig, APP_AfterDeployed } from '@router'
import { useNavigate } from 'react-router-dom'
import SelectDeviceForm from './SelectDeviceForm'
import './SelectDevice.module.less'
import { isEmpty, isNil } from 'lodash';

const SelectDevice = (): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SetModuleConfig
      })
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      const data = await form.validateFields()

      const { device_ids } = data
      if (isEmpty(device_ids) || isNil(device_ids)) {
        message.warning('请选择下发设备')
        return
      }
      console.log(data)
      navigate({
        pathname: APP_AfterDeployed
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [navigate, form])

  return (
    <div styleName='SelectDevice'>
      <div className='SelectDevice_wrap'>
        <StepHeaderOfThis />
        <div className='SelectDevice_wrap_content'>
          <SelectDeviceForm form={form}/>
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectDevice
