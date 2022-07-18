
import { Form, Select } from 'antd';
import { useState, useEffect } from 'react'
import { ModelOpreationTitle, GSelect } from '@src/UIComponents'
import DeviceGridTable from './DeviceGridTable'
import api from '@api'
import './SelectDeviceForm.module.less'

const { Option } = Select;
const app_id = 289
const SelectDeviceForm = (props:any): JSX.Element => {
  const { form } = props
  const [options, setOptions] = useState<Array<any>>([])
  useEffect(

    () => {
      const adapter_device = '算能SE5盒子'
      const fn = async () => {
        try {
          const res = await api.get('/v3/devicegroups', {
            params: { page: 1, page_size: 9999, device: adapter_device, app_id }
          })
          if (res.code === 0) {
            const { items } = res.data
            setOptions(items || [])
          }
        } catch (e) {

        }
      }
      fn()
    }, []
  )
  return (
    <div styleName='SelectDeviceForm'>
      <Form form={form} name='basic' className='SelectDeviceForm_content_from'>
        <div className='group'>
          <div className='group_item'>
            <ModelOpreationTitle text='设备类型'/>
            <span className='type_wrap'>
                算能SE5盒子
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
