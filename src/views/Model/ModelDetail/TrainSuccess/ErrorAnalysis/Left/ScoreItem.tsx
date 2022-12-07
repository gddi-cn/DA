import React from 'react'
import styled from 'styled-components'

import { ScoreProps } from './type'
import { useScoreItem } from './hook'
import { ModelFalseType } from '@src/shared/enum/model'

const Container = styled.div`
  margin-bottom: 12px;
`

const ScoreBar = styled.div<{ backgroundColor: React.CSSProperties['backgroundColor'], width: React.CSSProperties['width'] }>`
  height: 32px;
  background-color: #dcf1ff;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  &:hover:not([selected]) {
    box-shadow: 0 0 4px rgba(72, 162, 233, .5);
  }
  &[selected] {
    outline: 1px solid #126ba7;
  }
  &:hover::after {
    filter: brightness(110%);
  }
  transition:
          outline ease-in-out 0.2s,
          box-shadow ease-in-out 0.2s;
  &::after {
    background-color: ${props => props.backgroundColor};
    display: block;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 4px;
    width: ${props => props.width};
  }
`

const Label = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 2px;
  & span {
    &:nth-of-type(1) {
      color: #62B0E5;
    }
    &:nth-of-type(2) {
      color: #FF4D4F;
    }
  }
`

const LabelTip: React.FC<ScoreProps['labelTip']> = (
  {
    correctLabel,
    wrongLabel,
    wrongNum,
  }
) => {
  return (
    <Label>
      {wrongNum} 张 <span>[{correctLabel}]</span> 被识别为 <span>[{wrongLabel}]</span>
    </Label>
  )
}

const ScoreItem: React.FC<ScoreProps> = (props) => {
  const {
    backgroundColor,
    width,
    falseType,
    sceneLabel,
    labelTip,
    scoreBarRef,
    handleClick,
  } = useScoreItem(props)

  return (
    <Container>
      <ScoreBar onClick={handleClick} ref={scoreBarRef} width={width} backgroundColor={backgroundColor} />
      {
        falseType === ModelFalseType.SCENE ? (
          <Label>{sceneLabel}</Label>
        ) : null
      }
      {
        falseType === ModelFalseType.LABEL ? (
          <LabelTip {...labelTip} />
        ) : null
      }
    </Container>
  )
}

export default ScoreItem
