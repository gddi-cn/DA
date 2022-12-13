import React from 'react'
import styled from 'styled-components'

import { useLeft } from './hook'
import { ModelFalseType } from '@src/shared/enum/model'

import ScoreItem from './ScoreItem'
import { ReactCusScrollBar } from '@src/UIComponents'

const Container = styled.div`
  width: 284px;
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #303133;
`

const ScoreListContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  background-color: #edf8ff;
  padding: 20px 0;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SceneListTitle = styled.p`
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

const Left: React.FC =() => {
  const { scoreList, falseType } = useLeft()

  return (
    <Container>
      <Title>为提高模型准确率，请按照错误指示补充相关数据后进行版本迭代</Title>
      <ScoreListContainer>
        <SceneListTitle>
          {`TOP ${scoreList.length} 识别错误的${falseType === ModelFalseType.SCENE ? '场景' : '标签'} `}
        </SceneListTitle>
        <Divider />
        <ListWrap>
          <ReactCusScrollBar id={'error_item_list'}>
            <List>
              {
                scoreList.map((scoreItem, idx) => (
                  <ScoreItem key={scoreItem.uid} {...scoreItem} index={idx} />
                ))
              }
            </List>
          </ReactCusScrollBar>
        </ListWrap>
      </ScoreListContainer>
    </Container>
  )
}

export default Left
