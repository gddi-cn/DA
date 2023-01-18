import React from 'react'
import styled from 'styled-components'
import { Form, Input, message } from 'antd'

import { SecondaryBtn, PrimaryBtn } from '@src/components/Button'
import Dialog from '@src/components/Dialog'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceType } from '@src/shared/enum/device'

import { useMoveDevice } from '../hook'
import moveDevice from '@src/asset/images/space/moveDevice.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 196px;
`

const Content = styled.div`
  width: 436px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
`

const Img = styled.img`
  display: block;
  width: 256px;
  height: 200px;
  object-fit: contain;
`

const GroupWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`

const Footer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 40px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`

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
      <PrimaryBtn loading={loading} onClick={handleAdd} fw={400}>添加</PrimaryBtn>
    </div>
  )
}

const MoveDevice: React.FC = () => {
  const {
    open, loading, handleOpen, handleClose,
    targetGroupOptions, onFirstLoad, handleChange,
    handleMove,
  } = useMoveDevice()

  return (
    <>
      <SecondaryBtn width={132} onClick={handleOpen}>
        移动到组
      </SecondaryBtn>
      <Dialog
        open={open}
        onCancel={handleClose}
        width={1400}
        title='移动到组'
        centered={false}
      >
        <Container>
          <Content>
            <GroupWrap>
              <label><span style={{ color: '#ff4d4f' }}>*</span>选择分组</label>
              <RemoteSearch<DeviceGroupOptions>
                style={{ width: '100%', borderRadius: 4 }}
                value={targetGroupOptions || undefined}
                showSearch
                fetchOptions={deviceGroupAPI.fetchEdgeDeviceGroupByName}
                onChange={handleChange}
                onFirstLoad={onFirstLoad}
                getExtendOptions={getExtendOptions}
              />
            </GroupWrap>
            <Img src={moveDevice} alt='move device' />
          </Content>
          <Footer>
            <SecondaryBtn width={97} onClick={handleClose}>取消</SecondaryBtn>
            <PrimaryBtn width={97} loading={loading} onClick={handleMove}>移动</PrimaryBtn>
          </Footer>
        </Container>
      </Dialog>
    </>
  )
}

export default MoveDevice
