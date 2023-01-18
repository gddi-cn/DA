import React from 'react'
import styled from 'styled-components'

import sdk from '@src/asset/images/space/sdk.png'
import { useDocument } from './hook'
import { Button } from 'antd'

const CommentWrap = styled.div`
  margin-top: 10px;
  display: flex; 
  width: 100%;
  column-gap: 20px;
`

const Comment = styled.div`
  flex: 1;
`

const CommentTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const CommentTip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #48A2DF;
  margin-top: 10px;
`

const Img = styled.img`
  width: 112px;
  height: 98px;
  display: block;
  object-fit: contain;
`

const DocListWrap = styled.div`
  margin-top: 16px;
  width: 100%;
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

const Document: React.FC = () => {
  const { docList } = useDocument()

  return (
    <>
      <CommentWrap>
        <Comment>
          <CommentTitle>请下载SDK工具包，根据指导文档⽣成 gxt 文件</CommentTitle>
          <CommentTip>
            使用gxt文件可到平台进行鉴权，以达到注册设备的目的。gxt文件会显示设备的芯片型号，加密的授权编码等信息
          </CommentTip>
        </Comment>
        <Img src={sdk} alt={'sdk document'} />
      </CommentWrap>
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
              <RowItem>{doc.adapted_chip}</RowItem>
              <Button type='link' download href={doc.src} target='_blank' size='small'>查看</Button>
            </Row>
          ))
        }
      </DocListWrap>
    </>
  )
}

export default Document
