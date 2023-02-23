import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

import { AppTemplateInput } from '@src/shared/enum/application'
import { useInputFilter } from './hook'

const Container = styled.div`
  width: 171px;
  overflow: hidden;
`

const options = [
  { key: 'image', value: AppTemplateInput.IMAGE, label: '图片服务' },
  { key: 'video', value: AppTemplateInput.VIDEO_STREAM, label: '视频流服务' },
]

const InputFilter: React.FC = () => {
  const { inputOption, handleChange } = useInputFilter()

  return (
    <Container>
      <Select
        options={options}
        onChange={(_, newOptions) => handleChange(newOptions as any)}
        value={inputOption}
        allowClear
        placeholder='全部推理类型'
        style={{
          width: '100%'
        }}
      />
    </Container>
  )
}

export default InputFilter

