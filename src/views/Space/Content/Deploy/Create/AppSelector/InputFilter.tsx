import React from 'react'
import styled from 'styled-components'
import { Radio, Select } from 'antd'

import { AppTemplateInput } from '@src/shared/enum/application'
import { useInputFilter } from './hook'

const Container = styled.div`
  width: 171px;
  overflow: hidden;
`

const options = [
  { key: 'video', value: AppTemplateInput.VIDEO_STREAM, label: '视频流服务' },
  { key: 'image', value: AppTemplateInput.IMAGE, label: '图片服务' },
]

const InputFilter: React.FC = () => {
  const { input, handleChange } = useInputFilter()

  return (
    <Container>
      {/* <Radio.Group value={input} onChange={(e) => handleChange(e.target.value)}> */}
      {/*   <Radio value={AppTemplateInput.VIDEO_STREAM}>视频流服务</Radio> */}
      {/*   <Radio value={AppTemplateInput.IMAGE}>图片服务</Radio> */}
      {/* </Radio.Group> */}
      <Select
        style={{ width: '100%' }}
        value={input}
        onChange={(value) => handleChange(value)}
        allowClear={false}
        options={options}
      />
    </Container>
  )
}

export default InputFilter

