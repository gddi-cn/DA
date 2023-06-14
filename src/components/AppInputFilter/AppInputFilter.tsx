import { AppTemplateInput } from '@src/shared/enum/application'
import { Select } from 'antd'
import React from 'react'

export interface AppInputFilterProp {
  value?: AppTemplateInput
  onChange: (input: AppTemplateInput) => void
  allowClear?: boolean
}

const options = [
  { key: 'image', value: AppTemplateInput.IMAGE, label: '图片服务' },
  { key: 'video', value: AppTemplateInput.VIDEO_STREAM, label: '视频流服务' },
]

const AppInputFilter: React.FC<AppInputFilterProp> = (
  {
    value,
    onChange,
    allowClear = false
  }
) => {
  return (
    <Select
      options={options}
      onChange={(value) => onChange(value)}
      value={value}
      allowClear={allowClear}
      placeholder='全部推理类型'
      style={{
        width: '100%'
      }}
    />
  )
}

export default AppInputFilter
