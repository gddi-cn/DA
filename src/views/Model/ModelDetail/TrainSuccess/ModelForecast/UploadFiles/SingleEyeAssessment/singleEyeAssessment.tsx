
import { Form, Button, message, notification } from 'antd';
import { useMemo, useRef } from 'react'
import { UploadFile } from '@src/UIComponents'
import api from '@api'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import './singleEyeAssessment.module.less'

const SingleEyeAssessment = (props:any): JSX.Element => {
  const { setLoading, thres } = props
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const id = useSelector((state: RootState) => {
    return state.modelDetailSlice.id
  })
  const addFn = useRef<any>(null)
  const fieldsLen = useRef(0)
  const [form] = Form.useForm()

  const handleAddFn = () => {
    if (fieldsLen.current >= 3) {
      message.warning('单次最大上传文件组为3')
      return
    }
    addFn.current()
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()

    const { files } = values
    const urlArr: any = []
    const configArr: any = []
    for (let i = 0; i < files.length; i++) {
      const { file, config } = files[i]
      urlArr.push(file)
      configArr.push(config)
    }
    const fn = async () => {
      setLoading(true)
      try {
        const predictionRes = await api.post(`/v2/models/${id}/versions/${versionInfo.iter?.id}/prediction`, {
          source: urlArr,
          second_source: configArr,
          thres: isEmpty(thres) ? versionInfo?.iter?.result?.best_threshold : +thres
        })

        if (predictionRes.code === 0) {
          notification.success({
            message: '正在预测',
            description: '预测需要一定时间, 请耐心等待',
          });
          form.resetFields()
          setLoading(false)
        } else {
          message.error('预测出错')
          setLoading(false)
        }
      } catch (e: any) {
        message.error(e?.message)
        setLoading(false)
      }
    }
    fn()
  }
  const FormViews = useMemo(
    () => (
      <Form form={form} autoComplete="off">
        <Form.List name="files">
          {
            (fields, { add, remove }) => {
              addFn.current = add
              const len = fields.length
              fieldsLen.current = len
              //   if (len === 0) {
              //     return (

              //     )
              //   }
              return (
                <>

                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='form_item'>
                      <Form.Item
                        {...restField}
                        name={[name, 'file']}
                        // fieldKey={[fieldKey, 'file']}
                        rules={[{ required: true, message: '请上传图片' }]}
                      >
                        <UploadFile regExp={/\.(png|jpg|jpeg)$/} isShowFileName={true}>上传图片</UploadFile>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'config']}
                        // fieldKey={[fieldKey, 'config']}
                        rules={[{ required: true, message: '请上传配置' }]}
                      >
                        <UploadFile regExp={/\.(txt)$/} isShowFileName={true}>上传配置，仅支持txt</UploadFile>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} className='des_icon'/>
                    </div>
                  ))}

                </>
              )
            }
          }
        </Form.List>

      </Form>
    ),
    [form]
  )
  return (
    <div styleName='singleEyeAssessment'>
      {FormViews}
      <Button type="dashed" onClick={handleAddFn} block icon={<PlusOutlined />} className='add_btn_wrap'>
              添加图片/配置
      </Button>
      <Button type='primary' onClick={handleSubmit} block className='add_btn_wrap'>
          预测
      </Button>
    </div>
  )
}

export default SingleEyeAssessment
