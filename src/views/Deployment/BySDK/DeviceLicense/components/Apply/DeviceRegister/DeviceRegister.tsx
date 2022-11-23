import React from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message, Upload } from 'antd'
import { useRegister } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/hook'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { ReactComponent as UploadIcon } from '../icon/upload-cloud.svg'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { DeviceType } from '@src/shared/enum/device'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  align-items: center;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 20px 48px;
`

const getExtendOptions = (refresh: () => void) => {
  const [name, setName] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAdd = async () => {
    if (loading) return
    if (!name) return message.warn('请输入分组名称')

    setLoading(true)

    const { success } = await deviceGroupAPI.create(name, DeviceType.TERMINAL)

    setLoading(false)

    if (success) {
      message.success('创建成功')
      setName('')
    }

    refresh()
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <Input
          placeholder={'请输入分组名称'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          bordered={false}
          width={'100%'}
        />
      </div>
      <PrimaryBtn loading={loading} onClick={handleAdd} fw={400}>添加</PrimaryBtn>
    </div>
  )
}

const DeviceRegister: React.FC = () => {
  const { form, handleSubmit, handleCancel, loading } = useRegister()
  return (
    <>
      <Container>
        <Form form={form} layout={'vertical'}>
          <Form.Item
            name='group'
            label={'选择分组'}
            rules={[{ required: true, message: '请选择分组' }]}
          >
            <RemoteSearch<DeviceGroupOptions>
              style={{ width: 436 }}
              showSearch
              fetchOptions={deviceGroupAPI.fetchDeviceGroupByName}
              placeholder={'请选择分组'}
              getExtendOptions={getExtendOptions}
            />
          </Form.Item>
          <Form.Item
            name={'gtx'}
            label={'上传 .gxt 文件'}
            rules={[
              { required: true, message: '请上传文件' },
              () => ({
                validator(_, value) {
                  const pass = (value as Array<any> || []).every(file => /\.gxt$/.test(file.name))
                  return pass ? Promise.resolve() : Promise.reject('仅支持 gxt 文件')
                }
              }),
            ]}
            validateFirst
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e && e.fileList
            }}
          >
            <Upload.Dragger accept={'.gxt'} multiple beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">
                <UploadIcon />
              </p>
              <p className="ant-upload-text">
                将文件拖到此处，或点击上传
              </p>
              <p className="ant-upload-hint">
                仅支持 gxt 文件
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Container>
      <Footer>
        <SecondaryBtn onClick={handleCancel} width={97}>返回</SecondaryBtn>
        <div style={{ marginLeft: 20 }}>
          <PrimaryBtn loading={loading} onClick={handleSubmit} width={97}>确定</PrimaryBtn>
        </div>
      </Footer>
    </>
  )
}

export default DeviceRegister
