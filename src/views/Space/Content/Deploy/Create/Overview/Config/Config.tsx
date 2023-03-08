import React from 'react'
import { InputNumber, Radio } from 'antd'
import styled from 'styled-components'

import { useConfig } from './hook'

const Title = styled.p<{ mt?: React.CSSProperties['marginTop'] }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: ${props => props.mt};
`

const RadioWrap = styled.div`
  height: 32px;
  display: inline-flex;
  align-items: center;
`

const Flex = styled.div`
  dislpay: flex;
  align-items: center;
`


const Config: React.FC = () => {
  const {
    limit,
    noLimit,
    expire,
    noExpire,
    handleLimitRadioChange,
    handleLimitChange,
    handleExpireRadioChange,
    handleExpireChange,
  } = useConfig()

  return (
    <>
      <Title>路数设置</Title>
      <Flex>
        <RadioWrap>
          <Radio.Group value={noLimit} onChange={handleLimitRadioChange}>
            <Radio value={true}>无限制</Radio>
            <Radio value={false}>自定义</Radio>
          </Radio.Group>
        </RadioWrap>
        {
          !noLimit ? (
            <InputNumber<number>
              min={1}
              addonAfter={'路'} value={limit}
              onChange={handleLimitChange}
            />
          ) : null
        }
      </Flex>
      <Title mt={'40px'}>授权天数</Title>
      <Flex>
        <RadioWrap>
          <Radio.Group value={noExpire} onChange={handleExpireRadioChange}>
            <Radio value={true}>永久&nbsp;&nbsp;&nbsp;</Radio>
            <Radio value={false}>自定义</Radio>
          </Radio.Group>
        </RadioWrap>
        {
          !noExpire ? (
            <InputNumber<number>
              min={1}
              addonAfter={'天'} value={expire}
              onChange={handleExpireChange}
            />
          ) : null
        }
      </Flex>
    </>
  )
}

export default Config
