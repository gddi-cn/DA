import React from 'react'
import styled from 'styled-components'
import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'
import { Upload, Form, Input } from 'antd'

import Box from '../Box'
import RemoteSearch from '@src/components/RemoteSearch'
import deviceAPI from '@src/apis/device'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useMeta } from './hook'

const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const Uploader = styled(Upload.Dragger)`
  .ant-upload {
    background-color: #fff;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Meta: React.FC = () => {
  const {
    form, handleCoverChange,
    handleCancel, handleNext,
    showUploadBtn, previewSrc,
    previewTitle, loading,
  } = useMeta()

  return (
    <Box
      header={<Title>创建应用</Title>}
      footer={(
        <Footer>
          <SecondaryBtn width={97} onClick={handleCancel}>
            取消
          </SecondaryBtn>
          <PrimaryBtn loading={loading} width={97} onClick={handleNext}>
            下一步
          </PrimaryBtn>
        </Footer>
      )}
    >
      <Container>
        <Form form={form} layout={'vertical'} preserve={false} style={{ width: 436 }}>
          <Form.Item
            name={'name'}
            required
            label={'应用名称'}
            rules={[
              { required: true, message: '请输入应用名称' }
            ]}
          >
            <Input
              autoFocus autoComplete={'off'}
              tabIndex={1}
              placeholder='请输入应用名称'
            />
          </Form.Item>
          <Form.Item
            name={'adapter_device'}
            required
            label={'设备类型'}
            rules={[
              { required: true, message: '请选择设备类型' }
            ]}
          >
            <RemoteSearch<Device.Chip.Option>
              fetchOptions={deviceAPI.fetchChipTypeByNamew}
              allowClear
              showSearch
              placeholder='选择设备类型'
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'描述'}
          >
            <Input.TextArea
              rows={4}
              autoComplete={'off'}
              placeholder='请输入对此应用的描述'
            />
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
      </Container>
    </Box>
  )
}

export default Meta

