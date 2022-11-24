import React from 'react'
import styled from 'styled-components'

const Title = styled.p`
  padding: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Divider = styled.hr`
  margin: 10px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5)
`

const LeftTitle: React.FC<{ children?: React.ReactNode }> = (
  {
    children,
  }
) => {
  return (
    <>
      <Title>
        { children }
      </Title>
      <Divider />
    </>
  )
}

export default LeftTitle
