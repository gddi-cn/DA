import React from 'react'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Input = styled(AntInput)`
  border-radius: 19px;
  background-color: #fff;
  &:focus, &:active, &:hover {
    background-color: #fff;
  }
`

const SearchIcon = styled(SearchOutlined)`
  color: #c3c3c3;
`

const ChipTypeSearch: React.FC = () => {
  return (
    <Input
      bordered={false}
      placeholder={'搜索芯片型号'}
      prefix={<SearchIcon />}
    />
  )
}

export default ChipTypeSearch
