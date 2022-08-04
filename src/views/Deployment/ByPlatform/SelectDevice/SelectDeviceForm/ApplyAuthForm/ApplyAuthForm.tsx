import { Popover, Form, Radio, Space, InputNumber, Checkbox, message } from 'antd'
import { ModelOpreationTitle, GButton } from '@src/UIComponents'
import { useState } from 'react';
import { ReactComponent as Close } from './icon/close-line.svg'
import api from '@api'
import './ApplyAuthForm.module.less'

const ApplyAuthForm = (props: any): JSX.Element => {
  const { id, fetchFn, app_id } = props
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
    form.resetFields()
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const handleCansel = () => {
    setVisible(false);
    form.resetFields()
  }

  const handleSubmit = async () => {
    const form_data = await form.validateFields()

    // limit: 1
    // no_limited: undefined
    // trail_days: 7
    try {
      const { no_limited, limit, trail_days, custom_day } = form_data
      let params = {}
      if (no_limited) {
        params = {
          limit: -1, trail_days, app_id
        }
      } else {
        params = {
          limit, trail_days, app_id
        }
      }

      if (trail_days === 8888) {
        params = Object.assign(params, {
          trail_days: custom_day
        })
      }
      console.log(params)
      const res = await api.post(`/v3/devices/${id}/apply`, params)
      if (res?.code === 0) {
        message.success('申请授权成功,请等待通过')
        fetchFn && fetchFn()
        setVisible(false);
        form.resetFields()
      } else {
        message.error(res?.message)
      }
    } catch (e) {

    }
  }

  const FormContent = (
    <Form form={form} name='ApplyAuthForm' className='ApplyAuthForm_content_from'>
      <div className='header_wrap'>
        <ModelOpreationTitle text='申请授权' />
        <Close className='close_btn' onClick={hide}></Close>
      </div>
      <div className='form_block'>
        <div className='sub_title'>
                参数配置
        </div>
        <div>
          <Form.Item
            name="trail_days"
            noStyle
            initialValue={7}
          >

            <Radio.Group >
              <Space direction="vertical">
                <Radio value={7}>7天</Radio>
                <Radio value={14}>14天</Radio>
                <Radio value={-1}>永久</Radio>
                <Radio value={8888}>自定义</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

        </div>
        <div className='form_block'>
          <Form.Item dependencies={['trail_days']} noStyle >
            {({ getFieldValue }) => {
              const day = getFieldValue('trail_days')
              console.log(day, 'day')
              if (day === 8888) {
                return (
                  <Form.Item
                    name="custom_day"
                    // className='DeviceGridTable_wrap'
                    noStyle
                    initialValue={14}

                  >

                    <InputNumber

                    />
                  </Form.Item>
                )
              } else {
                return null
              }
            }}
          </Form.Item>
        </div>
        <div className='line_split'></div>
        <div className='form_block'>
          <div className='sub_title'>
                      应用授权路数
          </div>
          <Form.Item dependencies={['no_limited']} noStyle >
            {({ getFieldValue }) => {
              const no_limited = getFieldValue('no_limited')
              console.log(no_limited)

              return (
                <Form.Item
                  name="limit"
                  // className='DeviceGridTable_wrap'
                  noStyle
                  initialValue={1}
                >

                  <InputNumber placeholder='最低1,最高16' min={1} max={16} disabled={no_limited}

                  />
                </Form.Item>
              )
            }}
          </Form.Item>

        </div>

        <div >
          <Form.Item
            name="no_limited"
            // className='DeviceGridTable_wrap'
            noStyle
            valuePropName='checked'
            initialValue={false}
          >

            <Checkbox >不限制</Checkbox >
          </Form.Item>
        </div>
      </div>
      <div className='btn_wrap'>
        <GButton type='default' className='cansel' onClick={handleCansel}>取消</GButton>
        <GButton type='primary' onClick={handleSubmit}>确定</GButton>
      </div>
    </Form>
  );
  console.log(props)
  return (
    <div styleName='ApplyAuthForm'>
      <Popover
        placement="leftTop"
        title={null}
        content={FormContent}
        trigger="click"
        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        destroyTooltipOnHide
      >
        <span className='apply_auth_wrap'>申请授权</span>
      </Popover>
    </div>
  )
}

export default ApplyAuthForm
