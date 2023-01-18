import React from 'react'
import styled from 'styled-components'

import { useList } from './hook'
import { Pagination } from 'antd'
import Scrollbar from '@src/components/Scrollbar'
import empty from '@src/asset/images/space/no_usage.png'

const Container = styled.div`
  flex: 1;
  margin-top: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.div`
  display: grid;
  grid-template: 1fr/repeat(3, 1fr);
  padding: 12px;
`

const HeaderItem = styled.p`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: #061926;
`

const Body = styled.div`
  flex: 1;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Item = styled.div`
  padding: 12px;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
  display: grid;
  grid-template: 1fr/repeat(3, 1fr);
`

const NoData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  margin-top: 48px;
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
`

const EmptyTip = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926; 
`

const List: React.FC = () => {
  const { total, usageList, page, pageSize, handlePaginationChange, showNoData } = useList()

  return (
    <Container>
      {
        showNoData ? (
          <NoData>
            <Img src={empty} alt={'empty'} />
            <EmptyTip>暂无历史记录</EmptyTip>
          </NoData>
        ) : (
          <>
            <Content>
              <Header>
                <HeaderItem>时间</HeaderItem>
                <HeaderItem>类型</HeaderItem>
                <HeaderItem>使用额度</HeaderItem>
              </Header>
              <Body>
                <Scrollbar>
                  {
                    usageList.map(item => (
                      <Item key={item.id}>
                        <span>{item.created}</span>
                        <span>{item.type}</span>
                        <span>{item.value}</span>
                      </Item>
                    ))
                  }
                </Scrollbar>
              </Body>
            </Content>
            <Footer>
              <Pagination
                current={page}
                pageSize={pageSize}
                onChange={handlePaginationChange}
                total={total}
                showTotal={(t) => `共 ${t} 条记录`}
                size={'small'}
              />
            </Footer>
          </>
        )
      }
    </Container>
  )
}

export default List
