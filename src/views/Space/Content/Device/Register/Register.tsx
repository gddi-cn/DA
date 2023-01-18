import React from 'react'
import styled from 'styled-components'
import { Form, Input, message, Upload } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'

import { DeviceType } from '@src/shared/enum/device'
import { useRegister } from './hook'
import Dialog from '@src/components/Dialog'
import Scrollbar from '@src/components/Scrollbar'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { DeviceRegisterRes } from '@src/shared/enum/device'
import { DeviceRegisterResult } from '@src/shared/types/device'
import { deviceRegisterResultNameMapping } from '@src/shared/mapping/device'
import Document from './Document'

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


const ScrollbarWrap = styled.div`
  height: 800px;
  overflow: hidden;
`

const Container = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 436px;
`

const Item = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`

const ItemName = styled.p`
  margin: 0 0 0 12px;
  padding: 0;
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ItemRes = styled.p<{ type?: 'success' | 'failed' }>`
  text-align: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.type === 'success' ? '#19a051' : '#ff6177' };
`

const ListItem: React.FC<DeviceRegisterResult> = (
  {
    name,
    result,
  }
) => {

  const icon = React.useMemo(
    () => {
      switch (result) {
        case DeviceRegisterRes.REPEATED:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
        case DeviceRegisterRes.UNSUPPORTED:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
        case DeviceRegisterRes.SUCCESS:
          return <CheckCircleFilled style={{ color: '#19a051' }} />
        default:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
      }
    },
    [result]
  )

  return (
    <Item>
      { icon }
      <ItemName>{name}</ItemName>
      <ItemRes type={result === DeviceRegisterRes.SUCCESS ? 'success' : 'failed'}>
        { deviceRegisterResultNameMapping.get(result) || '未知错误' }
      </ItemRes>
    </Item>
  )
}

const Footer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 40px;
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`

const Register: React.FC<{ type: DeviceType.TERMINAL | DeviceType.EDGE }> = (
  {
    type,
  }
) => {
  const {
    open, handleOpen, handleClose,
    handleBack, handleSubmit,
    loading, step, form, title,
    resList,
  } = useRegister(type)

  return (
    <>
      <SecondaryBtn width={97} onClick={handleOpen}>注册设备</SecondaryBtn>
      <Dialog
        open={open}
        onCancel={handleClose}
        width={1400}
        title={title}
      >
        <>
          <ScrollbarWrap>
            <Scrollbar autoHide>
              <Container>
              <Content>
                {
                  step === 'device' ? (
                    <Form form={form} layout='vertical'>
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
                  ) : null
                }
                {
                  step === 'device' ? (
                    <Document />
                  ) : null
                }
                {
                  step === 'reg_res' ? (
                    <>
                      {
                        resList.map(res => (
                          <ListItem key={res.sn} {...res} />
                        ))
                      }
                    </>
                  ) : null
                }
              </Content>
              </Container>
            </Scrollbar>
          </ScrollbarWrap>
          <Footer>
            {
              step === 'device' ? (
                <>
                  <SecondaryBtn width={97} onClick={handleClose}>取消</SecondaryBtn>
                  <PrimaryBtn width={97} loading={loading} onClick={handleSubmit}>注册</PrimaryBtn>
                </>
              ) : null
            }
            {
              step === 'reg_res' ? (
                <>
                  <SecondaryBtn width={97} onClick={handleBack}>继续注册</SecondaryBtn>
                  <PrimaryBtn width={97} onClick={handleClose}>完成</PrimaryBtn>
                </>
              ) : null
            }
          </Footer>
        </>
      </Dialog>
    </>
  )
}

export default Register
