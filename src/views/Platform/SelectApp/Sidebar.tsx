import React from 'react'

import { useSidebar } from './hook'
import styled from 'styled-components'
import { Button, Select } from 'antd'

const Container = styled.div`
  background-color: #EDF8FF;
  border-radius: 8px;
  padding: 20px 15px;
  margin-bottom: 8px;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin: 0;
`
const Divider = styled.hr`
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
  margin: 10px 0;
`

const Sidebar: React.FC = () => {
  const { options, handleChange, handleClick } = useSidebar()

  return (
    <>
      <Container>
        <Title>设备类型</Title>
        <Divider />
        <Select
          options={options} onChange={handleChange}
          style={{ width: '100%' }}
          placeholder={'请选择类型'}
        />
      </Container>
      <Button type={'link'} block onClick={handleClick}>创建应用</Button>
    </>
  )
}

export default Sidebar
