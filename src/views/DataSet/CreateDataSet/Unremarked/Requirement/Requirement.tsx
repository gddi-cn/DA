
import { Form as AntForm, Input, Modal, Upload } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'

import { useRequirementForm } from '../hook'

const Form = styled(AntForm)`
  width: 448px;
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fix: contain;
`

const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const Requirement: React.FC = () => {
  const {
    form, show,
    previewOpen, previewSrc, previewTitle,
    handlePreview, handleClosePreview,
  } = useRequirementForm()

  return show ? (
    <Form
      form={form}
      layout='vertical'
    >
      <Form.Item
        name='demandDescribe'
        required
        label=' 需求'
        tooltip='请用一句话描述您的模型/算法需求，如：识别进入区域的人员是否佩戴安全帽'
        rules={[
          { required: true, message: '请输入数据名称' }
        ]}
      >
        <Input autoFocus autoComplete='off' />
      </Form.Item>
      <Form.Item
        name='scene'
        label='场景'
        required
        tooltip='请描述此数据集应用的场景，比如：工地、办公区、社区'
      >
        <Input autoComplete='off' />
      </Form.Item>
      <Form.Item
        name='examples'
        label='样例图片'
        required
        validateFirst
        rules={[
          { required: true, message: '请上传示例图片' },
          () => ({
            validator(_, value) {
              if (!value?.length) return Promise.reject('请上传样例图片')

              if (value.length < 5) return Promise.reject('请至少上传 5 张样例图片')

              if (value.length > 10) return Promise.reject('最多支持 10 张样例图片')

              const namePass = (value as Array<File> || [])
                .every(file => regExp.test(file.name.toLowerCase()))

              if (!namePass) return Promise.reject('不支持该类型文件')

              const sizePass = (value as Array<File> || []).every(file => file.size <= maxSize)

              if (!sizePass) return Promise.reject('文件大小不能大于 2 MB')

              return Promise.resolve()
            }
          })
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
          accept='image/jpg, image/jpeg, image/png'
          multiple
          beforeUpload={() => false}
          maxCount={10}
          listType='picture-card'
          onPreview={handlePreview}
        >
          <p className="ant-upload-drag-icon">
            <UploadIcon />
          </p>
          <p className="ant-upload-text">
            将文件拖到此处，或点击上传
          </p>
          <p className="ant-upload-hint">
            样例图片至少需要 5 张，最多不多于 10 张
          </p>
          <p className="ant-upload-hint">
            支持 .jpg .jpeg .png 等图片文件，文件不能大于 2 MB
          </p>
        </Upload.Dragger>
      </Form.Item>
      <Modal open={previewOpen} onCancel={handleClosePreview} footer={null} title={previewTitle}>
        <PreviewImg src={previewSrc} alt={previewTitle} />
      </Modal>
    </Form>
  ) : null
}

export default Requirement
