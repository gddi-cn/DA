
import { FooterBar, GButton, UploadFile, GSelect } from '@src/UIComponents'
import { useMemo, useEffect } from 'react'
import { Form, Input, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  APP_THIRDPARTY_STEP_2,
  APP_THIRDPARTY_STEP_4
} from '@router'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import api from '@api'
import './BaseInfoForm.module.less'

const { Option } = Select

const { TextArea } = Input;

const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/
const BaseInfoForm = (): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  useEffect(() => {
    if (activePipeLine.APP_THIRDPARTY_STEP_3) {
      const FROM_DATA = activePipeLine.APP_THIRDPARTY_STEP_3
      form.setFieldsValue(FROM_DATA)

      if (!activePipeLine?.APP_THIRDPARTY_STEP_3?.val_share) {
        socketPushMsgForProject(activePipeLine, {
          APP_THIRDPARTY_STEP_3: Object.assign({ ...activePipeLine.APP_THIRDPARTY_STEP_3 }, { val_share: 0.2 })
        })
      }
    } else {
      socketPushMsgForProject(activePipeLine, {
        APP_THIRDPARTY_STEP_3: { val_share: 0.2 }
      })
    }
  }, [activePipeLine, form])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_THIRDPARTY_STEP_2
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_STEP_2
      })
    }

    const goNext = async () => {
      // 123
      console.log(activePipeLine, '51')
      const data = await form.validateFields()
      try {
        const { APP_THIRDPARTY_STEP_2, APP_THIRDPARTY_SelectTrainType } = activePipeLine
        const createParams = {
          ...data,
          url: APP_THIRDPARTY_STEP_2?.url,
          scene: APP_THIRDPARTY_SelectTrainType?.activeType,
          hash: APP_THIRDPARTY_STEP_2?.md5,
          filename: APP_THIRDPARTY_STEP_2?.name,
          size: APP_THIRDPARTY_STEP_2?.size,
          source: 2
        }
        console.log(createParams)
        const creteDatares = await api.post('/v3/datasets', createParams);
        console.log(creteDatares, 'creteDatares')
        if (creteDatares.code === 0) {
          console.log('90909090')

          message.success('创建数据集成功')
          navigate({
            pathname: APP_THIRDPARTY_STEP_4
          })

          socketPushMsgForProject(activePipeLine, {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_STEP_4
          })
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
  }, [activePipeLine, form, navigate])

  const handleBaseInfoChange = (_: any, all_values: any) => {
    console.log(all_values)
    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      APP_THIRDPARTY_STEP_3: all_values
    })
  }
  return (
    <div styleName='BaseInfoForm'>
      <div className='BaseInfoForm_wrap'>
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

            <Input autoComplete='off'/>
          </Form.Item>

          <Form.Item
            label='训练集与测试集比例'
            name='val_share'
            rules={[{ required: true }]}
          >

            <GSelect style={{ width: '100%' }} >
              <Option value={0.3}>7:3</Option>
              <Option value={0.2}>8:2（推荐使用）</Option>
              <Option value={0.1}>9:1</Option>
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
