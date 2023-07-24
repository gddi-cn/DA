import React from 'react'
import { Form as AntForm, Input, Upload } from 'antd'
import styled from 'styled-components'

import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'
import Scrollbar from '@src/components/Scrollbar'
import { useBaseForm } from './hook'
import DeviceChipSelector from '../DeviceChipSelector/DeviceChipSelector'

const Container = styled.div`
  padding-top: 40px;
  height: 100%;
`

const Uploader = styled(Upload.Dragger)`
  .ant-upload {
    background-color: #fff;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const Form = styled(AntForm)`
  width: 436px;
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const BaseForm: React.FC<{ modelIterId?: string, defaultDeviceId?: Device.Chip.Instance['key'] }> = (
  {
    modelIterId,
    defaultDeviceId,
  }
) => {
  const {
    form,
    showUploadBtn, previewSrc,
    previewTitle, handleCoverChange,
  } = useBaseForm()

  return (
    <Container>
      <Scrollbar autoHide>
        <Content>
          <Form form={form} layout={'vertical'} preserve={false}>
            <Form.Item
              name={'name'}
              required
              label={'应用名称'}
              rules={[
                { required: true, message: '请输入应用名称' }
              ]}
            >
              <Input autoFocus autoComplete={'off'} tabIndex={1} />
            </Form.Item>
            <Form.Item
              name={'adapter_device'}
              label={'芯片类型'}
              required
              rules={[
                { required: true, message: '请选择设备类型' }
              ]}
            >
              <DeviceChipSelector defaultDeviceId={defaultDeviceId} modelIterId={modelIterId} />
            </Form.Item>
            <Form.Item
              name={'cover'}
              label={'封面'}
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value?.length) return Promise.resolve()

                    const [file] = value

                    if (!file) return Promise.resolve()

                    const namePass = regExp.test(file.name.toLowerCase())
                    const suffix = file.name.match(/\.(\w)*$/)

                    if (!namePass)
                      return Promise.reject(`不支持 ${suffix ? suffix[0] : '该'} 类型文件`)

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
              <Uploader
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
              </Uploader>
            </Form.Item>
          </Form>
        </Content>
      </Scrollbar>
    </Container>
  )
}

export default BaseForm

