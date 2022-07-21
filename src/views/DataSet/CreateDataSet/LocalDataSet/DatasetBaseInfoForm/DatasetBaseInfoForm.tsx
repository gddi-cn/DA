
import { Form, Input } from 'antd';
import { FooterBar, GButton, UploadFile } from '@src/UIComponents'
import { useMemo, cloneElement, useEffect } from 'react'
// import { bytesToSize } from '@src/utils'
// import { isNil, isString } from 'lodash';
// import api from '@api'

import { useNavigate } from 'react-router-dom'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import { APP_LOCAL_FILE_STEP_1, APP_LOCAL_FILE_STEP_3 } from '@router'
import './DatasetBaseInfoForm.module.less'

const { TextArea } = Input;
const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/

type AmazingWrapProps={
  Component: any,
  cusTips:string
}

const AmazingWrap = (props: AmazingWrapProps) => {
  const { Component, cusTips, ...rset } = props
  return (
    <div>
      {
        cloneElement(Component, {
          ...rset
        })
      }
      <p className='Amazing_text'>{cusTips}</p>
    </div>
  )
}
// type Props = {
//   setCurrentStep: any,
//   createInfo: any,
//   setCreateInfo: any,
// }
const DatasetBaseInfoForm = (): JSX.Element => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  useEffect(() => {
    if (activePipeLine.APP_LOCAL_FILE_STEP_2) {
      const FROM_DATA = activePipeLine.APP_LOCAL_FILE_STEP_2
      form.setFieldsValue(FROM_DATA)
    }
  }, [activePipeLine, form])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      //
      // setCurrentStep(1)
      navigate({
        pathname: APP_LOCAL_FILE_STEP_1
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_1
      })
    }

    const goNext = async () => {
      const data = await form.validateFields()
      console.log(data, 'data')
      // const { name, cover, summary } = data

      // const _obj = Object.assign({}, createInfo, { summary, cover: cover, name })
      // setCreateInfo(_obj)
      // setCurrentStep(3)
      // 发送socket
      navigate({
        pathname: APP_LOCAL_FILE_STEP_3
      })
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_3
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [form, navigate, activePipeLine])

  // const handleNext = async () => {
  //   const data = await form.validateFields()
  //   console.log(data)
  // }
  const handleBaseInfoChange = (_:any, all_values:any) => {
    console.log(all_values)
    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      APP_LOCAL_FILE_STEP_2: all_values
    })
  }
  return (
    <div styleName='DatasetBaseInfoForm'>
      <Form form={form} name="control-hooks" className='form_wrap' onValuesChange={handleBaseInfoChange}>
        <Form.Item
          name="name"
          label="数据名称"
          rules={
            [
              { required: true }
            ]
          }
        >

          <AmazingWrap cusTips='最多20个字符' Component={<Input />}/>
        </Form.Item>

        <Form.Item
          name="summary"
          label="备注"
        >

          <AmazingWrap cusTips='最多100个字符' Component={<TextArea rows={4} placeholder="" maxLength={100} />} />
        </Form.Item>

        <Form.Item
          name="cover"
          label="上传数据集封面"
        >
          <UploadFile hasPreview={true} tips="支持.jpg .jpeg .png 等图片文件,文件不得大于2MB" maxSize={maxSize} regExp={regExp}>

          </UploadFile>
        </Form.Item>
      </Form>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default DatasetBaseInfoForm
