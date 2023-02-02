import { lighten } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { useTaskItem } from './hook'
import { ReactComponent as ChipIcon } from './icon/chip.svg'


const Container = styled.ul<{ bgColor?: React.CSSProperties['color'] }>`
  width: 100%;
  height: 130px;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: ${props => props.bgColor || '#fff'};
  display: flex;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.bgColor ? lighten(0.01, props.bgColor) : undefined};
  }
`

const Img = styled.img`
  display: block;
  height: 110px;
  width: 110px;
  object-fix: contain;
  border-radius: 8px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const Status = styled.p<{ color?: React.CSSProperties['color'] }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.color || '#000'};
  margin-bottom: 10px;
`

const Name = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #061926;
  margin-bottom: 8px;
`

const Meta = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`

const Scene = styled.div<{ bgColor?: React.CSSProperties['backgroundColor']}>`
  padding: 2px 10px;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #FFF;
  background-color: ${props => props.bgColor || '#eee'};
  border-radius: 12px;
`

const Platform = styled.p<{
  color?: React.CSSProperties['color'],
  fill?: React.CSSProperties['fill'] }
>`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.color || '#061926'};
  display: flex;
  align-items: center;
  column-gap: 5px;
  *{
    fill: ${props => props.fill}
  }
`

const CreatedTime = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(6, 25, 38, 0.5);
`

const TaskItem: React.FC<Project.Detail> = (project) => {
  const {
    name,
    platform,
    color,
    bgColor,
    cover,
    statusTip,
    scene,
    createdTime,
    handleClick,
  } = useTaskItem(project)

  return (
    <Container bgColor={bgColor} onClick={handleClick}>
      <Left>
        <Status color={color}>{statusTip}</Status>
        <Name>{name}</Name>
        <Meta>
          <Scene bgColor={color}>{scene}</Scene>
          <Platform color={color} fill={color}>
            <ChipIcon />
            <span>{platform}</span>           
          </Platform>
        </Meta>
        <CreatedTime>{createdTime}</CreatedTime>
      </Left>
      <Img alt={'cover'} src={cover} />
    </Container>
  )
}

export default TaskItem

