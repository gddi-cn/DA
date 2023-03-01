import React from 'react'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNameFilter } from './hook'

const Input = styled(AntInput)`
  border-radius: 19px;
  padding: 5.5px 10px;
  box-shadow: none;
  width: 276px;
  border: 1px solid #E4E7ED;
  &:hover,&:focus,&:focus-within,&:active {
    border-color: #71beeb;
  }
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

