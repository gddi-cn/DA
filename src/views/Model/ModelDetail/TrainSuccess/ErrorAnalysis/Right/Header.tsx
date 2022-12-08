import React from 'react'
import styled from 'styled-components'

import { useHeader } from './hook'
import { ModelFalseAnalysisItem } from '@src/shared/types/model'
import { ModelFalseType } from '@src/shared/enum/model'
import { MiniBtn } from '@src/components/Button'

import { ReactComponent as Grid } from './icon/grid.svg'
import { ReactComponent as Slick } from './icon/slick.svg'

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SceneTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
`

const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  & span {
    &:nth-of-type(1) {
      color: #62B0E5;
    }
    &:nth-of-type(2) {
      color: #FF4D4F;
    }
  }
`

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const IconBtn = styled.div`
  cursor: pointer;
  line-height: 0;

  svg * {
    stroke: #000000;
  }
  
  svg {
    rect {
      fill: #fff;
    }
  }
  
  &[selected] {
    cursor: default;
    svg * {
      stroke: #62B0E5;
    }
  }
`

const LabelTip: React.FC<ModelFalseAnalysisItem['labelTip']> = (
  {
    correctLabel,
    wrongLabel,
    wrongNum,
  }
) => {
  return (
    <Label>
      <span>[{correctLabel}]</span> 被误测为 <span>[{wrongLabel}]</span> 的数量是 {wrongNum} 个
    </Label>
  )
}

const Header: React.FC = () => {
  const {
    falseType,
    gridRef,
    slickRef,
    sceneTip,
    labelTip,
    handleClick,
    handleAddData,
  } = useHeader()

  return (
    <Container>
      <Title>
        {
          falseType === ModelFalseType.SCENE ? (
            <SceneTitle>该类需{sceneTip?.advice || '-'}</SceneTitle>
          ) : null
        }
        {
          falseType === ModelFalseType.LABEL && labelTip ? (
            <LabelTip {...labelTip} />
          ) : null
        }
      </Title>
      <ToolBox>
        <MiniBtn onClick={handleAddData}>补充数据</MiniBtn>
        <IconBtn onClick={() => handleClick('grid')} ref={gridRef}>
          <Grid />
        </IconBtn>
        <IconBtn onClick={() => handleClick('slick')} ref={slickRef}>
          <Slick />
        </IconBtn>
      </ToolBox>
    </Container>
  )
}

export default Header
