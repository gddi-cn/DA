import React from 'react'
import styled from 'styled-components'
import { Button, Pagination } from 'antd'

import CreateBtn from './CreateBtn'
import Scrollbar from '@src/components/Scrollbar'
import { useApiItem, useList } from './hook'
import { darken, lighten } from 'polished'
import DocBtn from './DocBtn'

const gridTemplate = '3fr 4fr 4fr 3fr 1fr'

const Container = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 40px;
  column-gap: 16px;
`

const ScrollWrap = styled.div`
  flex: 1;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 40px;
`

const ListHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
  margin: 0 40px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #061926;
`

const RowWrap = styled.div`
  padding: 0 40px;
  > div:not(:last-of-type) {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
`

const Row = styled.div`
  padding: 10px 12px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #606266;
  &:hover {
    background-color: rgba(0, 0, 0, .02);
  };
`

const RowCell = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DeleteBtn = styled(Button)`
  color: #ff6177;
  min-width: unset;
  padding: 0;
  &:hover {
    color: ${lighten(0.1, '#ff6177')};
  }
  &:active, &:focus {
    color: ${darken(0.1, '#ff6177')};
  }
`

const ApiItem: React.FC<API.Instance> = (api) => {
  const { name, access_id, secret_key, date, handleDeleteClick } = useApiItem(api)

  return (
    <Row>
      <RowCell>{name}</RowCell>
      <RowCell>{access_id}</RowCell>
      <RowCell>{secret_key}</RowCell>
      <RowCell>{date}</RowCell>
      <RowCell>
        <DeleteBtn
          type="link"
          onClick={handleDeleteClick}
        >
          删除
        </DeleteBtn>
      </RowCell>
    </Row>
  )
}

export const List: React.FC = () => {
  const { total, apiList, page, pageSize, handleChange } = useList()

  return (
    <Container>
      <Header>
        <DocBtn />
        <CreateBtn />
      </Header>
      <ListHeader>
        <HeaderCell>凭证名称</HeaderCell>
        <HeaderCell>Access ID</HeaderCell>
        <HeaderCell>Secret Key</HeaderCell>
        <HeaderCell>创建时间</HeaderCell>
        <HeaderCell>操作</HeaderCell>
      </ListHeader>
      <ScrollWrap>
        <Scrollbar autoHide>
          <RowWrap>
            {
              apiList.map(api => <ApiItem key={api.id} {...api} />)
            }
          </RowWrap>
        </Scrollbar>
      </ScrollWrap>
      <Footer>
        <Pagination
          current={page}
          pageSize={pageSize}
          onChange={handleChange}
          total={total}
          showTotal={(t) => `共 ${t} 条记录`}
          size='small'
        />
      </Footer>
    </Container>
  )
}

export default List

