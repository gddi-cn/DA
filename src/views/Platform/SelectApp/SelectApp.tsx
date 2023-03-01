import React from 'react'
import styled from 'styled-components'

import Scrollbar from '@src/components/Scrollbar'
import Sidebar from './Sidebar'

const Container = styled.div`
  width: 1104px;
  display: flex;
  overflow: hidden;
  height: 100%;
`

const Left = styled.div`
  padding-top: 40px;
  width: 200px;
`

const Right = styled.div`
  width: 200px;
`

const ScrollWrap = styled.div`
  flex: 1;
  overflow: hidden;
`

import { useSelectApp } from './hook'

import AppList from './AppList'
import NoData from './NoData'
import CreateApp from '../CreateApp'
import { Spin } from 'antd'

const SelectApp: React.FC = () => {
  const { showList, loading } = useSelectApp()

  return (
    <>
      <Container>
        <Left>
          <Sidebar />
        </Left>
          <ScrollWrap>
            <Scrollbar autoHide>
              <Spin spinning={loading}>
              {
                showList ? <AppList /> : <NoData />
              }
              </Spin>
            </Scrollbar>
          </ScrollWrap>
        <Right />
      </Container>
      <CreateApp />
    </>
  )
}

export default SelectApp
