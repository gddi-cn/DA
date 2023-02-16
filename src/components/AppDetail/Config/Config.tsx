import React from 'react'
import styled from 'styled-components'

import Box from '@src/components/Box'
import { SecondaryBtn } from '@src/components/Button'

import { useConfig } from './hook'
import GddiFlow from '@src/views/Platform/Config/GddiFlow'

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

const Content = styled.div`
  height: 100%;
  over-flow: hidden;
  padding: 0 40px;
`

const Config: React.FC = () => {
  const { handleClose, flowValue, appBaseInfo } = useConfig()

  return (
    <Box
      noScroll
      header={<Title>参数配置</Title>}
      footer={(
        <Footer>
          <SecondaryBtn width={97} onClick={handleClose}>返回详情</SecondaryBtn>
        </Footer>
      )}
    >
      <Content>
        <GddiFlow flowValue={flowValue} appBaseInfo={appBaseInfo} />
      </Content>
    </Box>
  )
}

export default Config

