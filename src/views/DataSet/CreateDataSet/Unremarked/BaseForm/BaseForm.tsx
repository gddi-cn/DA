import { Form as AntForm, Input, Upload } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'

import { useBaseForm } from '../hook'

const Form = styled(AntForm)`
  width: 448px;
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const BaseForm: React.FC = () => {
  const {
    form, show,
    handleCoverChange,
    showUploadBtn,
    previewTitle,
    previewSrc,
  } = useBaseForm()

  return show ? (
    <Form
      form={form}
      layout='vertical'
    >
      <Form.Item
        name='name'
        required
        label=' 数据名称'
        rules={[
          { required: true, message: '请输入数据名称' },
          { max: 20, message: '最多 20 个字符' }
        ]}
        tooltip='最多 20 个字符'
      >
        <Input
          autoFocus autoComplete='off'
          onBlur={e => form.setFieldValue('name', form.getFieldValue('name')?.trim())}
        />
      </Form.Item>
      <Form.Item
        name='summary'
        label='备注'
        rules={[
          { max: 100, message: '最多 100 个字符' }
        ]}
        tooltip='最多 100 个字符'
      >
        <Input.TextArea
          autoComplete='off' rows={4}
          onBlur={_ => form.setFieldValue('summary', form.getFieldValue('summary')?.trim())}
        />
      </Form.Item>
      <Form.Item
        name={'cover'}
        label={'数据集封面'}
        validateFirst
        rules={[
          () => ({
            validator(_, value) {
              if (!value?.length) return Promise.resolve()

              const [file] = value

              if (!file) return Promise.resolve()

              const namePass = regExp.test(file.name.toLowerCase())
              const suffix = file.name.match(/\.(\w)*$/)

              if (!namePass)
                return Promise.reject(`不支持 ${suffix? suffix[0] : '该'} 类型文件`)

              const sizePass = file.size <= maxSize

              if (!sizePass)
                return Promise.reject('文件大小不能超过 2 MB')

              return Promise.resolve()
            }
          }),
        ]}
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e
          }
          return e && e.fileList
        }}
      >
        <Upload.Dragger
          onChange={handleCoverChange}
          accept='image/jpg, image/jpeg, image/png'
          multiple={false} beforeUpload={() => false}
          isImageUrl={() => true} maxCount={1}
        >
          {
            showUploadBtn ? (
              <>
                <p className="ant-upload-drag-icon">
                  <UploadIcon />
                </p>
                <p className="ant-upload-text">
                  将文件拖到此处，或点击上传
                </p>
                <p className="ant-upload-hint">
                  支持 .jpg .jpeg .png 等图片文件，文件不能大于 2 MB
                </p>
              </>
            ) : (
              <PreviewImg src={previewSrc} alt={previewTitle} />
            )
          }
        </Upload.Dragger>
      </Form.Item>
    </Form>
  ) : null
}

export default BaseForm

