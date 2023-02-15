import React from 'react'
import styled from 'styled-components'
import { Button as AntButton } from 'antd'

import { useLoadMore } from './hook'

const Container = styled.div`
  
`

const Button = styled(AntButton)`
  color: #3693D1;
  &:hover, &:active, &:focus {
    color: #3693D1;
  }
`

const Tip = styled.p`
  padding: 4px 15px;
  line-height: 22px;
  text-align: center;
  font-size: 14px;
`

const LoadMore: React.FC = () => {
  const { showBtn, handleClick } = useLoadMore()
  return (
    <Container>
      {
        showBtn ? (
          <Button block type={'text'} onClick={handleClick}>加载更多</Button>
        ) : (
          <Tip>我已到底</Tip>        
        )
      }
    </Container>
  )
}

export default LoadMore

