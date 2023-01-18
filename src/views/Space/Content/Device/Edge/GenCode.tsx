import React from 'react'
import styled from 'styled-components'
import { Input, message } from 'antd'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useGenCode } from './hook'
import Dialog from '@src/components/Dialog'

import group from '@src/asset/images/space/gen_code_group.png'
import done from '@src/asset/images/space/gen_code_done.png'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceType } from '@src/shared/enum/device'

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 535px;
  padding-top: 20px;
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

const GroupImg = styled.img`
  display: block;
  object-fit: contain;
  width: 250px;
  height: 200px;
`

const GroupTitle = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const DoneImg = styled.img`
  display: block;
  object-fit: contain;
  width: 280px;
  height: 168px;
`

const DoneTitle = styled.p`
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #202223;
`

const Code = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #48A2DF;
  width: 436px;
  word-break: break-all;
  margin-top: 20px;
`

const GenCode: React.FC = () => {
  const {
      step, open, loading, code, handleOpen, handleClose,
      selectedDeviceGroup, handleChange, onFirstLoad,
      disableGen, handleGen, handleBack,
  } = useGenCode()

  return (
    <>
      <SecondaryBtn width={111} onClick={handleOpen}>生成注册码</SecondaryBtn>
      <Dialog
        open={open}
        centered={false}
        onCancel={handleClose}
        title='生成注册码'
        width={1400}
      >
        <>
          <Container>
            {
              step === 'group' ? (
                <>
                  <GroupImg src={group} alt='selecte group' />
                  <GroupTitle>请选择分组</GroupTitle>
                  <RemoteSearch<DeviceGroupOptions>
                    style={{ width: 436, borderRadius: 4, marginTop: 20 }}
                    value={selectedDeviceGroup || undefined}
                    showSearch
                    fetchOptions={deviceGroupAPI.fetchDeviceGroupByName}
                    onChange={handleChange}
                    onFirstLoad={onFirstLoad}
                    getExtendOptions={getExtendOptions}
                  />
                </>
              ) : null
            }
            {
              step === 'code' ? (
                <>
                  <DoneImg src={done} alt='done' />
                  <DoneTitle>注册码生成成功，已为您粘贴到剪切板！</DoneTitle>
                  <Code>{ code }</Code>
                </>
              ) : null
            }
          </Container>
          <Footer>
            {
              step === 'group' ? (
                <>
                  <SecondaryBtn width={97} onClick={handleClose}>取消</SecondaryBtn>
                  <PrimaryBtn disabled={disableGen} width={97} loading={loading} onClick={handleGen}>
                    生成
                  </PrimaryBtn>
                </>
              ) : null
            }
            {
              step === 'code' ? (
                <>
                  <SecondaryBtn width={97} onClick={handleBack}>返回</SecondaryBtn>
                  <PrimaryBtn width={97} onClick={handleClose}>关闭</PrimaryBtn>
                </>
              ) : null
            }
          </Footer>
        </>
      </Dialog>
    </>
  )
}

export default GenCode
