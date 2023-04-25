import { Radio, Space, Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useResolution } from './hook'
import InfoIcon from '@ant-design/icons/InfoCircleOutlined'

const Header = styled.div`
  display: flex;
  align-items: baseline;
  column-gap: 8px;
  margin-top: 16px;
  margin-bottom: 4px;
`

const Label = styled.label`
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: #48A2DF;
`

const Tip = styled.p`
  padding: 4px 0;
  font-weight: 400;
  font-size: 12px;
  color: #8f8fff;
`

const Resolution: React.FC = () => {
  const {
    limit,
    resolution,
    options,
    disabled,
    handleChange,
    fixed,
  } = useResolution()

  return (
    <>
      <Header>
        <Label>训练尺寸</Label>
        <Tooltip
          title={`训练尺寸越大，模型可支持检测的目标更小，但模型的体量、耗费算力也会相应增加。如果检测目标较小，可适当先则较大尺寸。`}
        >
          <InfoIcon />
        </Tooltip>
      </Header>
      {
        fixed ? (
          <Tip>已根据数据情况为您选择训练尺寸</Tip>
        ) : null
      }
      <Radio.Group disabled={disabled} onChange={handleChange} value={resolution}>
        <Space direction={'vertical'}>
          {
            options.map(({ key, label, value }) => (
              <Radio key={key} value={value} disabled={value > limit}>{label}</Radio>
            ))
          }
        </Space>
      </Radio.Group>
    </>
  )
}

export default Resolution

