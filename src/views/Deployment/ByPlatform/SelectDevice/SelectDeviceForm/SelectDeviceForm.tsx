
import { Form, Select } from 'antd';
import { useState, useEffect } from 'react'
import { ModelOpreationTitle, GSelect } from '@src/UIComponents'
import DeviceGridTable from './DeviceGridTable'
import api from '@api'

import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
// import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
// import { socketPushMsgForProject } from '@ghooks'
import './SelectDeviceForm.module.less'

const { Option } = Select;
// const app_id = 289
const SelectDeviceForm = (props:any): JSX.Element => {
  const { form } = props
  const [options, setOptions] = useState<Array<any>>([])
  const [deviceTypes, setDeviceTypes] = useState<Array<any>>([])

  const name = useSelector((state: RootState) => {
    if (state.tasksSilce.activePipeLine?.APP_SelectModule) {
      const adapter_device = state.tasksSilce.activePipeLine?.APP_SelectModule?.adapter_device
      return adapter_device[adapter_device.length - 1]
    }

    return '--'
  })

  const app_id = useSelector((state: RootState) => {
    if (state.tasksSilce.activePipeLine?.APP_SetModuleConfig) {
      const app_id = state.tasksSilce.activePipeLine?.APP_SetModuleConfig?.id
      return app_id
    }

    return undefined
  })

  useEffect(

    () => {
      if (!app_id) {
        return
      }
      // if (activePipeLine?.APP_SelectModule) {
      //   // const { adapter_device } = activePipeLine.APP_SelectModule

      // }
      const fn = async () => {
        try {
          const type_res = await api.get('/v3/device/types')
          if (type_res?.code === 0) {
            const { items } = type_res.data
            setDeviceTypes(items || [])
          }
          const res = await api.get('/v3/devicegroups', {
            params: { page: 1, page_size: 9999, app_id }
          })
          if (res.code === 0) {
            const { items } = res.data
            setOptions(items || [])
          }
        } catch (e) {

        }
      }
      fn()
    }, [app_id, form]
  )

  const getName = () => {
    const target = deviceTypes.find((o) => o.key === name)
    if (target) {
      return target.name
    }
    return '--'
  }

  return (
    <div styleName='SelectDeviceForm'>
      <Form form={form} name='basic' className='SelectDeviceForm_content_from'>
        <div className='group'>
          <div className='group_item'>
            <ModelOpreationTitle text='设备类型'/>
            <span className='type_wrap'>
              {getName()}
            </span>
          </div>

          <div className='group_item'>
            <ModelOpreationTitle text='设备分组' />
            <div className='select_group_wrap'>
              <Form.Item
                name="group_id"
                noStyle
              >

                <GSelect style={{ width: '100%' }}>
                  {
                    options.map((o: any, i: number) => {
                      return (
                        <Option key={i} value={o.id}>{o.name}</Option>
                      )
                    })
                  }
                </GSelect>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className='device'>
          <Form.Item dependencies={['group_id']} noStyle >
            {({ getFieldValue }) => {
              const group_id = getFieldValue('group_id')
              console.log(group_id, 'typetype')
              return (
                <Form.Item
                  name="device_ids"
                  // className='DeviceGridTable_wrap'
                  noStyle
                >

                  <DeviceGridTable group_id={group_id} app_id={app_id}/>
                </Form.Item>
              )
            }}
          </Form.Item>

        </div>
      </Form>

    </div>
  )
}

export default SelectDeviceForm
