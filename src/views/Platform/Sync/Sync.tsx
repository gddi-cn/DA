import React from 'react'
import styled from 'styled-components'

import bg from '@src/asset/images/platform/sync_bg.png'

import { useLimit, useExpire, useSyncType } from './hook'
import { InputNumber, Radio, Space } from 'antd'

const Container = styled.div`
  height: 100%;
  padding-top: 40px;
`

const Content = styled.div`
  width: 970px;
  background: #EDF8FF;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`

const Form = styled.div`
  padding-top: 40px;
  width: 300px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  position: absolute;
  bottom: 1px;
`

const Divider = styled.hr`
  margin: 10px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5)
`

const Label = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`


const Sync: React.FC = () => {
  const {
    noLimit, disableLimitInput, limitInputValue,
    handleLimitRadioChange, handleDisableLimitInputChange,
  } = useLimit()

  const {
    noExpire, disableExpireInput, expireInputValue,
    handleExpireRadioChange, handleDisableExpireInputChange,
  } = useExpire()

  const {
    syncType,
    handleChange,
  } = useSyncType()

  return (
    <Container>
      <Content>
        <Img src={bg} />
        <Form>
          <div>
            <Label>
              路数设置
            </Label>
            <Divider />
            <Radio.Group  value={noLimit} onChange={handleLimitRadioChange}>
              <Space direction={'vertical'}>
                <Radio value={true}>无限制</Radio>
                <Radio value={false}>自定义</Radio>
              </Space>
            </Radio.Group>
            <InputNumber<number>
              disabled={disableLimitInput} min={1}
              addonAfter={'路'} value={limitInputValue}
              onChange={handleDisableLimitInputChange}
              style={{ width: '100%', marginTop: 8, padding: '0 24px' }}
            />
          </div>
          <div>
            <Label>
              授权天数
            </Label>
            <Divider />
            <Radio.Group value={noExpire} onChange={handleExpireRadioChange}>
              <Space direction={'vertical'}>
                <Radio value={true}>永久</Radio>
                <Radio value={false}>自定义</Radio>
              </Space>
            </Radio.Group>
            <InputNumber<number>
              disabled={disableExpireInput} min={1}
              addonAfter={'天'} value={expireInputValue}
              onChange={handleDisableExpireInputChange}
              style={{ width: '100%', marginTop: 8, padding: '0 24px' }}
            />
          </div>
          <div>
            <Label>
              部署方式
            </Label>
            <Divider />
            <Radio.Group value={syncType} onChange={handleChange}>
              <Space direction={'vertical'}>
                <Radio value={'sync'}>在线</Radio>
                <Radio value={'export'}>离线</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default Sync
