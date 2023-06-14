import React from 'react'
import styled from 'styled-components'
import { Form, Input, message, Upload, Select } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'

import { useRegister } from './hook'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'
import { DeviceRegisterRes, DeviceType } from '@src/shared/enum/device'
import { DeviceRegisterResult } from '@src/shared/types/device'
import { deviceRegisterResultNameMapping } from '@src/shared/mapping/device'
import Document from './Document'
import {  SecondaryBtn, PrimaryBtn, PrimaryLoadingBtn } from '@src/components/Btn'
import Scrollbars from 'react-custom-scrollbars'

const getExtendOptions = (refresh: () => void) => {
  const [name, setName] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAdd = async () => {
    if (loading) return
    if (!name) return message.warn('请输入分组名称')

    setLoading(true)

    const { success } = await deviceGroupAPI.create(name, DeviceType.EDGE)

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
      <PrimaryLoadingBtn loading={loading} onClick={handleAdd}>添加</PrimaryLoadingBtn>
    </div>
  )
}

const Uploader = styled(Upload.Dragger)`
  .ant-upload {
    background-color: #fff;
  }
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
  width: 100%;
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

export interface DeviceRegisterProps {
  getDefaultGroup: () => DeviceGroupOptions | null
  onRegist?: () => void
  primary?: boolean
}

const DeviceRegister: React.FC<DeviceRegisterProps> = (
  {
    getDefaultGroup,
    onRegist,
    primary = false
  }
) => {
  const {
    open, handleOpen, handleClose,
    handleBack, handleSubmit,
    loading, step, form, title,
    resList, options,
  } = useRegister(getDefaultGroup, onRegist)

  return (
    <>
    {
      primary ? (
        <PrimaryBtn
          onClick={handleOpen}
        >
          注册设备
        </PrimaryBtn>
      ) : (
        <SecondaryBtn
          onClick={handleOpen}
        >
          注册设备
        </SecondaryBtn>
      )
    }
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth maxWidth='lg'
        sx={{
          zIndex: 1009,
        }}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            p: '40px 40px 16px',
          }
        }}
      >
        <DialogTitle
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            p: 0,
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ px: 0, height: 1080, overflow: 'hidden' }}>
          <Scrollbars autoHide>
            <Box
              sx={{
                pt: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box width={436}>
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
                        fetchOptions={
                          deviceGroupAPI.fetchDeviceGroupByName
                        }
                        placeholder={'请选择分组'}
                        getExtendOptions={getExtendOptions}
                      />
                    </Form.Item>
                    <Form.Item
                      name={'device_type_id'}
                      label={'设备类型'}
                      required
                      rules={[
                        { required: true, message: '请选择设备类型' }
                      ]}
                    >
                      <Select
                        options={options}
                        placeholder={'请选择设备类型'}
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
                      <Uploader accept={'.gxt'} multiple beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                          <UploadIcon />
                        </p>
                        <p className="ant-upload-text">
                          将文件拖到此处，或点击上传
                        </p>
                        <p className="ant-upload-hint">
                          仅支持 gxt 文件
                        </p>
                      </Uploader>
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
              </Box>
            </Box>
          </Scrollbars>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
            {
              step === 'device' ? (
                <>
                  <SecondaryBtn
                    onClick={handleClose}
                  >
                    取消
                  </SecondaryBtn>
                  <PrimaryLoadingBtn
                    loading={loading} onClick={handleSubmit}
                  >
                    注册
                  </PrimaryLoadingBtn>
                </>
              ) : null
            }
            {
              step === 'reg_res' ? (
                <>
                  <SecondaryBtn
                    onClick={handleBack}
                  >
                    继续注册
                  </SecondaryBtn>
                  <PrimaryBtn
                    onClick={handleClose}
                  >
                    完成
                  </PrimaryBtn>
                </>
              ) : null
            }
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeviceRegister
