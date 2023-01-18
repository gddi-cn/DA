import React from 'react'
import styled from 'styled-components'
import { Button, Tooltip } from 'antd'

import { useDocument } from './hook'

import Container from '../components/Container'
import NoData from './NoData'

const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
`

const DocListWrap = styled.div`
  margin-top: 16px;
  width: 900px;
  max-width: 100%;
`

const ListHeader = styled.div`
  padding: 12px 10px;
  display: grid;
  grid-template: 1fr/2fr 2fr 1fr;
`

const Row = styled.div`
  padding: 12px 10px;
  display: grid;
  grid-template: 1fr/2fr 2fr 1fr;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
`

const HeaderItem = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const RowItem = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SDKDocuments: React.FC = () => {
  const { docList, noData } = useDocument()

  return (
    <Container>
      <ContentWrap>
        {
          noData ? (
            <NoData />
          ) : (
            <DocListWrap>
              <ListHeader>
                <HeaderItem>芯片品牌</HeaderItem>
                <HeaderItem>适配芯片</HeaderItem>
                <HeaderItem style={{ textAlign: 'center' }}>操作</HeaderItem>
              </ListHeader>
              {
                docList.map((doc, idx) => (
                  <Row key={idx}>
                    <RowItem>{doc.name}</RowItem>
                    <Tooltip placement='topLeft' title={doc.adapted_chip}>
                      <RowItem>{doc.adapted_chip}</RowItem>
                    </Tooltip>
                    <Button type='link' download href={doc.src} target='_blank' size='small'>查看</Button>
                  </Row>
                ))
              }
            </DocListWrap>
          )
        }
      </ContentWrap>
    </Container>
  )
}

export default SDKDocuments
