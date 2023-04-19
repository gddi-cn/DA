import { Radio } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useResolution } from './hook'

const Label = styled.label`
  display: block;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #48A2DF;
`

const Resolution: React.FC = () => {
  const {
    limit,
    resolution,
    options,
    disabled,
    handleChange,
  } = useResolution()

  return (
    <>
      <Label>分辨率</Label>
      <Radio.Group disabled={disabled} onChange={handleChange} value={resolution}>
        {
          options.map(({ key, label, value }) => (
            <Radio key={key} value={value} disabled={value > limit}>{label}</Radio>
          ))
        }
      </Radio.Group>
    </>
  )
}

export default Resolution

