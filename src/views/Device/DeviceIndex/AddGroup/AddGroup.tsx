import { useState } from 'react'
import { Input, Popover, Form, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { GButton } from '@src/UIComponents'
import api from '@api'
import './AddGroup.module.less'

const AddForm = (props: any) => {
  const { createType, setVisible } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)

  const onFinish = async () => {
    const values = await form.validateFields()
    const params = Object.assign(values, { type: createType })
    console.log('Success:', params);
    setloading(true)
    try {
      const res = await api.post('/v3/devicegroups', params)
      if (res.code === 0) {
        message.success('创建成功')

        form.resetFields()

        props.handleAfterAdd(false)
        setVisible(false)
        setloading(false)
      } else {
        message.error(res?.message)
        setloading(false)
      }
    } catch (e) {
      console.log(e)
      setloading(false)
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <div className='AddForm'>
      <div className='add_form_title'>新增分组</div>
      <Form
        form={form}

        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        name='AddForm'
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入设备组名称' }]}
        >
          <Input placeholder='请输入设备组名称' />
        </Form.Item>

        <div className='btn_container'>
          <GButton type="primary" htmlType="submit" loading={loading} onClick={onFinish}>
                        确认
          </GButton>
        </div>
      </Form>
    </div>
  )
}

const AddGroup = (props: any): JSX.Element => {
  const { deviceType, fetchGroups } = props
  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleAfterAdd = () => {
    // paramsOnChange({ page: 1 }, true)
    setVisible(true);
    // refreshCounts()
    fetchGroups()
  }
  return (
    <div styleName='AddGroup'>
          设备分组
      <Popover
        content={<AddForm handleAfterAdd={handleAfterAdd} createType={deviceType} setVisible={setVisible} />}
        title={null}
        trigger="click"
        visible={visible}
        placement="bottom"
        onVisibleChange={handleVisibleChange}
        getPopupContainer={(triggerNode: HTMLElement) => (triggerNode as any).parentNode}

      >
        <div className='add_button'>
          <PlusCircleOutlined />

        </div>

      </Popover>
    </div>
  )
}

export default AddGroup
