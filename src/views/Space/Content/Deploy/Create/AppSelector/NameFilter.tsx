import React from 'react'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNameFilter } from './hook'

const Input = styled(AntInput)`
  border-radius: 19px;
  background-color: #F7F8FA;
  border: none;
  padding: 5.5px 10px;
  .ant-input {
    background-color: #F7F8FA;
  }
  border-color: unset;
  box-shadow: none;
  width: 276px;
`

const SearchIcon = styled(SearchOutlined)`
  svg {
    fill: #C8C9CC;
  }
`

const NameFilter: React.FC = () => {
  const { name, handleChange } = useNameFilter()

  return (
    <Input
      placeholder='搜索项目名称'
      prefix={<SearchIcon />}
      value={name}
      onChange={handleChange}
    />
  )
}

export default NameFilter

