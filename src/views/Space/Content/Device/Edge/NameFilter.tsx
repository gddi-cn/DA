import React from 'react'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNameFilter } from './hook'
import styled from 'styled-components'

const Input = styled(AntInput)`
  width: 208px;
  border-radius: 19px;
`

const NameFilter: React.FC = () => {
  const { name, handleChange } = useNameFilter()
  return (
    <Input
      value={name} onChange={handleChange}
      placeholder={'搜索设备名称'}
      prefix={<SearchOutlined />}
    />
  )
}

export default NameFilter
