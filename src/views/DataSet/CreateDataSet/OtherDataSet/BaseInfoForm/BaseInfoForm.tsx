
import { FooterBar, GButton, UploadFile, GSelect } from '@src/UIComponents'
import { useMemo } from 'react'
import { Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  APP_LOCAL_FILE_STEP_2,
  APP_LOCAL_FILE_STEP_4
} from '@router'
import './BaseInfoForm.module.less'

const { Option } = Select

const { TextArea } = Input;

const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/
const BaseInfoForm = (): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_LOCAL_FILE_STEP_2
      })
    }

    const goNext = async () => {
      // 123
      const data = await form.validateFields()
      console.log(data)
      navigate({
        pathname: APP_LOCAL_FILE_STEP_4
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [form, navigate])
  return (
    <div styleName='BaseInfoForm'>
      <div className='BaseInfoForm_wrap'>
        <Form form={form} name="control-hooks" className='form_wrap'>
          <Form.Item
            name="name"
            label="数据名称"
            rules={
              [
                { required: true }
              ]
            }
          >

            <Input autoComplete='off'/>
          </Form.Item>

          <Form.Item
            label='类型'
            name='scenes'
            rules={[{ required: true }]}
          >
            <GSelect >
              <Option value='detection'>目标检测</Option>
              <Option value='classify'>图片分类</Option>
              {/* <Option value='face_detection' disabled>人脸检测</Option>
            <Option value='face_recognition' disabled>人脸识别</Option> */}
              <Option value='cityscapes_segment'>通用分割</Option>
              <Option value='portrait_segment'>肖像分割</Option>
              <Option value='pose_detection'>姿态检测</Option>
              <Option value='monocular_3d_detection'>单目3D检测</Option>

            </GSelect>
          </Form.Item>

          <Form.Item
            label='训练集与测试集比例'
            name='bili'
            rules={[{ required: true }]}
          >

            <GSelect defaultValue="2" style={{ width: '100%' }} >
              <Option value="1">7:3</Option>
              <Option value="2">8:2（推荐使用）</Option>
              <Option value="3">9:1</Option>
            </GSelect>
          </Form.Item>

          <Form.Item
            name="summary"
            label="备注"
          >

            <TextArea rows={4} placeholder="" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="cover"
            label="上传数据集封面"
          >
            <UploadFile hasPreview={true} tips="支持.jpg .jpeg .png 等图片文件,文件不得大于2MB" maxSize={maxSize} regExp={regExp}>

            </UploadFile>
          </Form.Item>
        </Form>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default BaseInfoForm
