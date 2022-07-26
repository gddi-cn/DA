
import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton } from '@src/UIComponents'
import { Form, message } from 'antd';
import { useMemo } from 'react'
import { APP_ForecastModule, APP_AfterDeployed } from '@router'
import { useNavigate } from 'react-router-dom'
import SelectDeviceForm from './SelectDeviceForm'
import api from '@api'
import { isEmpty, isNil } from 'lodash';
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import './SelectDevice.module.less'

const SelectDevice = (): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const app_id = useSelector((state: RootState) => {
    if (state.tasksSilce.activePipeLine?.APP_SetModuleConfig) {
      const app_id = state.tasksSilce.activePipeLine?.APP_SetModuleConfig?.id
      return app_id
    }

    return undefined
  })
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_ForecastModule
      })
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      try {
        const data = await form.validateFields()

        const { device_ids } = data
        // group_id
        // if (isNil(group_id)) {
        //   message.warning('请选择下发设备组')
        //   return
        // }
        if (isEmpty(device_ids) || isNil(device_ids)) {
          message.warning('请选择下发设备')
          return
        }

        const res = await api.post(`/v3/apps/${app_id}/syncs2`, { device_ids: device_ids })
        console.log(data)

        if (res.code === 0) {
          message.success('下发成功')
          navigate({
            pathname: APP_AfterDeployed
          })
          socketPushMsgForProject(activePipeLine, {
            APP_AfterDeployed: {},
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_AfterDeployed
          })
          // 刷新列表
        } else if (res.code === 200054) {
          // 说明存在未授权的
          message.error(res?.message)
        } else {
          message.error(res?.message)
        }
      } catch (e) {
        console.error(e)
      }
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [navigate, form, app_id, activePipeLine])

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
