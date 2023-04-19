import React from 'react'
import styled from 'styled-components'
import { InputNumber as AntInputNumber, Radio, Space, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import { ChipConfigType } from '@src/shared/enum/chip'
import { chipConfigNameMapping } from '@src/shared/mapping/chip'
import { useParamsSetting } from './hook'

import LeftTitle from '../LeftTitle'
import Resolution from '../Resolution'

const Container = styled.div`
  background-color: #EDF8FF;
  border-radius: 4px;
  padding: 20px 10px;
  margin-top: 10px;
`

const Title = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #061926;
  margin:  0 0 4px;
`
// const InputNumber = styled(AntInputNumber)`
//   width: 100%;
// `

const Divider = styled.hr`
  margin: 10px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5)
`
const InputNumber = styled(AntInputNumber)`
  &.ant-input-number-disabled {
    color: #48A2DF;
  }
`

const Label = styled.label`
  display: block;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #48A2DF;
`

const RadioGroup = styled(Radio.Group)`
  display: block;
`

const Suffix = styled.span`
  color: #48A2DF;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

const Tip = styled.div`
  width: 188px;
  padding: 4px;
  display: flex;
  color: #fad514;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  span {
    display: block;
    padding: 4px 6px;
  }
  p {
    flex: 1;
  }
`

const WarnTip: React.FC<{ tip: string }> = (
  {
    tip
  }
) => {
  return (
    <Tip>
      <InfoCircleOutlined />
      <p>{tip}</p>
    </Tip>
  )
}

const Config: React.FC = () => {
  const {
    disableInput, disableCustom, showTip, tip,
    cardNum, handleCardNumChange,
    configType, handleTypeChange,
    configFps, handleFpsChange,
    configConcurrent, handleConcurrentChange
  } = useParamsSetting()

  return (
    <Container>
      <LeftTitle>模型配置</LeftTitle>
      <Title>多卡训练</Title>
      <Tooltip open={showTip} color={'#fff'} title={<WarnTip tip={tip} />} placement={'bottom'}>
        <InputNumber
          value={cardNum}
          onChange={(v) => handleCardNumChange(v as (number | null))}
          min={1}
          precision={0}
          style={{ width: '100%' }}
        />
      </Tooltip>
      <Divider />
      <Title>参数配置</Title>
      <RadioGroup value={configType} onChange={handleTypeChange}>
        <Space direction={'vertical'}>
          {
            Object.values(ChipConfigType)
              .map((t: ChipConfigType) => (
                <Radio value={t} key={t} disabled={t === ChipConfigType.CUSTOM && disableCustom}>
                  {chipConfigNameMapping.get(t) || ''}
                </Radio>
              ))
          }
        </Space>
      </RadioGroup>
      <Label htmlFor={'fps_input'}>帧率设置</Label>
      <InputNumber
        min={1} id={'fps_input'} disabled={disableInput} addonAfter={<Suffix>FPS</Suffix>}
        value={configFps} onChange={v => handleFpsChange(v as (number | null))}
        style={{ width: '100%', color: '#aaeeaa' }}
        precision={0}
      />
      <Label htmlFor={'concurrent_input'}>算法并行数</Label>
      <InputNumber
        min={1} id={'concurrent_input'} disabled={disableInput}
        value={configConcurrent} onChange={(v) => handleConcurrentChange(v as (number | null))}
        style={{ width: '100%' }}
        precision={0}
      />
      <Resolution />
    </Container>
  )
}

export default Config
