import React from 'react'
import styled from 'styled-components'

import { useAppItem } from './hook'
import Box from '../Box'
import { PrimaryBtn } from '@src/components/Button'
import AppDetail from '@src/components/AppDetail'

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Detail: React.FC = () => {
  const { id, handleCancel } = useAppItem()

  return (
    <Box
      header={<Title>应用详情</Title>}
      footer={(
        <Footer>
          <PrimaryBtn width={97} onClick={handleCancel}>返回</PrimaryBtn>
        </Footer>
      )}
    >
      {
        id ? (
          <AppDetail id={id} />
        ) : null
      }
    </Box>
  )
}

export default Detail

