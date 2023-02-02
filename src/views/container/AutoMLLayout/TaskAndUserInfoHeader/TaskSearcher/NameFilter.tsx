import React from 'react'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNameFilter } from './hook'

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
`

const Input = styled(AntInput)`
  border-radius: 20px;
  background-color: #F7F8FA;
  .ant-input {
    background-color: #F7F8FA;
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
    <Container>
      <Input
        placeholder='搜索项目名称'
        prefix={<SearchIcon />}
        value={name}
        onChange={handleChange}
        autoFocus
      />
    </Container>
  )
}

export default NameFilter

