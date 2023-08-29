import React from 'react'
import styled from 'styled-components'
import {Container} from "@mui/material";

import Meta from './Meta'
import Content from './Content'
import Footer from './Footer'

const Wrap = styled.div`
  height: calc(100vh - 100px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const Body = styled.div`
  padding: 20px 30px;
  display: flex;
  align-items: stretch;
  column-gap: 56px;
  height: 100%;
`

const MetaWrap = styled.div`
  flex-basis: 248px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
`

const ContentWrap = styled.div`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
`

const DatasetAnalysis: React.FC = () => {
  return (
    <Wrap>
      <Container disableGutters maxWidth={false} sx={{ maxWidth: 1920, flexGrow: 1 }}>
        <Body>
          <MetaWrap>
            <Meta />
          </MetaWrap>
          <ContentWrap>
            <Content />
          </ContentWrap>
        </Body>
      </Container>
      <Footer />
    </Wrap>
  )
}

export default DatasetAnalysis
