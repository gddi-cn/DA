import { SmallButton, UploadFile } from '@src/UIComponents'
import { useState } from 'react'
import { message, Modal, Input, Form, Button } from 'antd'

import api from '@api'
import { bytesToSize } from '@src/utils'
import type { Data } from '../V1DatasetCard'
import { isEmpty, isString, isNil } from 'lodash'
import './EditDataset.module.less'

const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/

type Props={
    type: 'nomal' | 'delete' | 'primary',
    callback?:()=>void,
    data: Data,
    eleId:string
}
const EditDataset = (props: Props): JSX.Element => {
  const { data, callback, eleId, type } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false)
    form.setFieldsValue({
      name: undefined,
      summary: undefined,
      cover: undefined
    })
  }

  const onFinish = async (values: any) => {
    console.log(values)
    try {
      const row = (await form.validateFields()) as any;
      // editDataset(id, row, setVisible)
      console.warn(row, 'rowrowrow')
      const { cover } = row
      if (!isString(cover)) {
        const { name, size } = cover
        const ossUrl = await api.get('/v2/file/upload', { params: { filename: name, size } })
        if (ossUrl.code === 0) {
          const { file_url: fileUrl, header, method, url } = ossUrl.data
          const methodAxios: any = String(method).toLocaleLowerCase()

          const uploadAws = await (api as any)[methodAxios](url, cover, { headers: header })

          if (uploadAws.code === 0) {
            message.success('上传图片成功')
            row.cover = fileUrl
          }
        }
      }
      const res: any = await api.patch(`/v2/datasets/${data?.id}`, row)
      if (res.code === 0) {
        setVisible(false)

        message.success('修改成功。')
        // fetchData({ isInit: true })
        callback && callback()
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  return (
    <div styleName='EditDataset' id='modal_wrap'>
      <SmallButton type={type} className='Operation_edit' onClick={() => setVisible(true)}>编辑</SmallButton>
      <Modal
        title='修改数据集信息'
        visible={visible}
        // onOk={handleIgOk}
        getContainer={document.getElementById(eleId || 'modal_wrap') as any}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        forceRender={false}
      >
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          className='modify_dataset_info'
        >
          <Form.Item
            label='数据集名'
            name='name'
            rules={[{ required: true }]}
            initialValue={data?.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='描述'
            name='summary'
            initialValue={data?.summary}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          {/* <Form.Item
            label='是否公开'
            name='is_public'
            initialValue={isp}
            valuePropName='checked'
          >
            <Switch />
          </Form.Item> */}

          <Form.Item
            label='数据集封面'
            name='cover'
            initialValue={data?.cover}
            rules={
              [

                () => ({
                  validator (rule, file) {
                    if (isNil(file)) {
                      return Promise.resolve();
                    }
                    const { size } = file
                    if (size > maxSize) {
                      return Promise.reject(new Error(`文件不能大于${bytesToSize(maxSize)}`));
                    }
                    return Promise.resolve();
                  },
                }),
                () => ({
                  validator (rule, file) {
                    if (isNil(file)) {
                      return Promise.resolve();
                    }
                    const { name } = file
                    if (!isEmpty(name)) {
                      if (!regExp?.test(name)) {
                        const suffix = name.match(/\.(\w)*$/)
                        if (suffix) {
                          return Promise.reject(new Error(`不支持${suffix[0]}文件类型`))
                        } else {
                          return Promise.reject(new Error('不支持该类型文件'))
                        }
                      }
                    }

                    return Promise.resolve();
                  },
                }),
              ]

            }
          >
            <UploadFile tips='支持.jpg .jpeg .png 等图片文件,文件不得大于2MB' hasPreview={true} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Button type='primary' htmlType='submit' onClick={onFinish}>
                          提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditDataset
