import React from 'react'
import styled from 'styled-components'

import Container from '@mui/material/Container'
import Scroll from '@src/UIComponents/ReactCusScrollBar'
import Config from './Config'

const Card = styled.div`
  background-color: #fff;
  height: 100%;
  border-radius: 12px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`


const Title = styled.h3`
  padding: 0 20px;
  font-weight: 600;
  line-height: 1.5;
  font-size: 20px;
`

const ContentWrap = styled.div`
  flex: 1;
`

const Content = styled.div`
  padding: 5px 20px 0;
`


const Setting: React.FC = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ maxWidth: 1000, height: '100%', py: 5 }}
    >
      <Card>
        <Title>
          参数配置
        </Title>
        <ContentWrap>
          <Scroll id={'train_config_content'}>
            <Content>
              <Config />
            </Content>
          </Scroll>
        </ContentWrap>
      </Card>
    </Container>
  )
}

export default Setting
