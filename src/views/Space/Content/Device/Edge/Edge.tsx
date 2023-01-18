import React from 'react'
import styled from 'styled-components'

import Scrollbar from '@src/components/Scrollbar'
import NameFilter from './NameFilter'
import DeviceGroupSelector from './DeviceGroupSelector'
import List from './List'
import Operations from './Operations'
import { useEdge } from './hook'
import { Pagination } from 'antd'
import DeleteGroup from './DeleteGroup'
import GenCode from './GenCode'
import FlowTip from './FlowTip'
import Register from '../Register'
import { DeviceType } from '@src/shared/enum/device'

const Container = styled.div`
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const Header = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  display: flex;
  column-gap: 20px;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`

const ContentWrap = styled.div`
  flex: 1;
  overflow: hidden;
`

const Content = styled.div`
  padding: 0 40px;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 32px;
`

const Edge: React.FC = () => {
  const { page, pageSize, total, handleChange, showOperations, showDeleteGroup } = useEdge()

  return (
    <Container>
      <Header>
        <Left>
          <NameFilter />
          <DeviceGroupSelector />
        </Left>
        <Right>
          <Register type={DeviceType.EDGE} />
          <GenCode />
          <FlowTip />
        </Right>
      </Header>
      <ContentWrap>
        <Scrollbar>
          <Content>
            <List />
          </Content>
        </Scrollbar>
      </ContentWrap>
      <Footer>
        <div>
          { showOperations ? <Operations /> : null }
          { showDeleteGroup ? <DeleteGroup /> : null }
        </div>
        <Pagination
          current={page}
          pageSize={pageSize}
          onChange={handleChange}
          total={total}
          showTotal={(t) => `共 ${t} 条记录`}
          size={'small'}
        />
      </Footer>
    </Container>
  )
}

export default Edge
