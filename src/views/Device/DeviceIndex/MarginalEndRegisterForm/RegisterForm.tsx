import { useState, useRef, useMemo } from 'react'
import { Popover, Modal, Form, Spin, message } from 'antd'
import api from '@api'
import UploadGxtBtn from './UploadGxtBtn'
import { isEmpty, isNil } from 'lodash'
import SelectDevice from './SelectDevice'
import FailedTablie from './FailedTablie'
import { GButton } from '@src/UIComponents'
import './RegisterForm.module.less'

const FormContent = (props: any) => {
  const { callBack, groupSelected, deviceType } = props
  const [form] = Form.useForm();
  const [confirmLoading, setconfirmLoading] = useState(false)

  const [progress, setProgress] = useState<any>(0)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });

  const onprogress = (event: any) => {
    console.log(event, 'event')
    const tmp = event.loaded / event.total * 100

    const pre = timeRef.current.pre
    const preLoad = timeRef.current.preLoad

    timeRef.current = {
      pre: pre,
      next: new Date().valueOf() / 1000,
      preLoad: preLoad,
      nextLoad: event.loaded
    }
    setProgress(tmp.toFixed(0))
  };

  const handleSubmit = async () => {
    try {
      setconfirmLoading(true)
      // 上传
      timeRef.current.pre = new Date().valueOf() / 1000

      // console.log(formData, 'formData')
      // formData.append('group', selected?.id)
      const data = await form.validateFields()
      console.log(data, 'datadatadata')
      const { files, device_name } = data
      const formData = new FormData();
      files.map((item: any) => formData.append('files', item?.originFileObj))
      const res = await api.post(
        '/v3/device/offline_register',
        formData,
        {
          onUploadProgress: onprogress,
          params: {
            group: groupSelected,
            device_type_id: device_name[device_name.length - 1],
            device_type: deviceType
          }
        }
        )
      // console.log(res, 'resres')
      if (res.code === 0) {
        message.success(res?.message)

        if (!isNil(res?.data)) {
          const arr = res?.data.filter((o: any) => o?.result !== 'Success')

          if (!isEmpty(arr)) {
            console.log(arr, 'arrarrarr')
            callBack(arr)
          } else {
            callBack()
          }
        }
        form.resetFields()
      } else {
        message.error(res?.message)
      }
    } catch (e) {
      setconfirmLoading(false)
    } finally {
      setconfirmLoading(false)
    }
  }
  return (
    <div className='FormContent'>
      <Spin spinning={confirmLoading} tip={`上传${progress}%`}>
        <Form
          form={form}
          initialValues={{ gpu_count: 1 }}
        >
          <Form.Item
            label='设备类型' name='device_name' rules={[{ required: true }]}
          >
            {
              useMemo(() => {
                return (
                  <SelectDevice showTypes={['Edge']} />
                )
              }, [])
            }
          </Form.Item>
          <Form.Item
            label='上传文件' name='files' rules={[{ required: true }]}
          >
            <UploadGxtBtn/>
          </Form.Item>

        </Form>
        <div className='btn-container'>
          <GButton type='primary' onClick={handleSubmit}>确定</GButton>
        </div>
      </Spin>

    </div>
  )
}

const RegisterForm = (props: any): JSX.Element => {
  const { callBack, groupSelected, deviceType } = props
  const [isModalVisible, setIsModalVisible] = useState(false);

  const DeviceAuthRef = useRef<any>(null)
  const [failedList, setFailedList] = useState<Array<any>>([])

  const showModal = () => {
    if (!groupSelected && groupSelected !== 0) {
      message.warning('请选择设备组')
      return
    }
    setIsModalVisible(true);
  };

  return (
    <div styleName='RegisterForm' id='RegisterForm'>
      <div className='register_btn' onClick={showModal} key='注册设备'>
        <Popover
          content={<FormContent deviceType={deviceType} callBack={(arr:any) => {
            callBack && callBack()
            setIsModalVisible(false);
            if (arr) {
              setFailedList(arr)
              DeviceAuthRef.current.setIsModalVisible(true)
            }
          }}
          groupSelected={groupSelected}
          />}
          title={null}
          trigger='click'
          placement='bottom'
          autoAdjustOverflow
          visible={isModalVisible}
          getPopupContainer={() => document.getElementById('RegisterForm') as any}
          // onVisibleChange={handleVisibleChange}
        >
          <GButton type='primary'>注册设备</GButton>
        </Popover>
      </div>
      <Modal
        key='Basic Modal'
        title='Basic Modal'
        open={isModalVisible}
        modalRender={() => null}
        onCancel={() => setIsModalVisible(false)}
        getContainer={false}
      />
      <FailedTablie ref={DeviceAuthRef} data={failedList} />
    </div>
  )
}

export default RegisterForm
