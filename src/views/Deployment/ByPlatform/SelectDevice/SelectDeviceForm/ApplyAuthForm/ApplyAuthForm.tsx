import { Popover, Form, Radio, Space, InputNumber, Checkbox } from 'antd'
import { ModelOpreationTitle } from '@src/UIComponents'
import { useState } from 'react';
import { ReactComponent as Close } from './icon/close-line.svg'
import './ApplyAuthForm.module.less'

const ApplyAuthForm = (props: any): JSX.Element => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

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
            name="day"
            noStyle
          >

            <Radio.Group >
              <Space direction="vertical">
                <Radio value={7}>7天</Radio>
                <Radio value={14}>14天</Radio>
                <Radio value={0}>永久</Radio>
                <Radio value={8888}>自定义</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

        </div>
        <div className='form_block'>
          <Form.Item dependencies={['day']} noStyle >
            {({ getFieldValue }) => {
              const day = getFieldValue('day')
              console.log(day, 'day')
              if (day === 8888) {
                return (
                  <Form.Item
                    name="custom_day"
                    // className='DeviceGridTable_wrap'
                    noStyle
                    initialValue={14}
                  >

                    <InputNumber />
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
                  name="chanel_num"
                  // className='DeviceGridTable_wrap'
                  noStyle

                >

                  <InputNumber placeholder='最低1,最高16' disabled={no_limited} />
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
          >

            <Checkbox >不限制</Checkbox >
          </Form.Item>
        </div>
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
      >
        <span className='apply_auth_wrap'>申请授权</span>
      </Popover>
    </div>
  )
}

export default ApplyAuthForm
