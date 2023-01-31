import { ReactCusScrollBar } from '@src/UIComponents'
import React from 'react'
import styled from 'styled-components'

import LabelItem from './LabelItem'
import { useLeft } from '../hook'

const Container = styled.div`
  width: 284px;
  border-radius: 8px;
  background-color: #edf8ff;
  padding: 20px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  padding: 0 16px;
`

const Divider = styled.hr`
  margin: 10px 0 8px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
`

const ListWrap = styled.div`
  overflow: hidden;
  flex: 1;
`

const List = styled.div`
  padding: 1px 16px 0;
`

// const LongContent = styled.div`
//   height: 3000px;
//   background-color: #eeeeaa;
// `

const Left: React.FC = () => {
  const { labelList } = useLeft()
  return (
    <Container>
      <Title>标签列表</Title>
      <Divider />
      <ListWrap>
        <ReactCusScrollBar id={'img_retrieval_label_list'}>
          <List>
            {
              labelList.map((label) => (
                <LabelItem key={label} label={label} />
              ))
            }
          </List>
        </ReactCusScrollBar>
      </ListWrap>
    </Container>
  )
}

export default Left

