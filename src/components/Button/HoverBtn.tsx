import React from 'react'
import styled from 'styled-components'
import { Button, ButtonProps } from 'antd'

interface IHoverBtn {
  width?: React.CSSProperties['width']
  fz?: number
  fw?: number
  br?: number
  lh?: number
  bg?: React.CSSProperties['backgroundColor']
  color?: React.CSSProperties['color']
}

const HoverBtn = styled(Button)<ButtonProps & IHoverBtn>`
  background-color: transparent;
  border: none;
  text-align: center;
  outline: none;
  border-radius: ${props => props.br || 4}px;
  font-size: ${props => props.fz || 14}px;
  line-height: ${props => props.lh || 20}px;
  font-weight: ${props => props.fw || 600};
  font-style: normal;
  font-family: 'PingFang SC',serif;
  width: ${props => props.width ? props.width : undefined};
  color: ${props => props.color || '#000'};
  box-shadow: none;
  &:hover {
    color: ${props => props.color || '#000'};
    background-color: ${props => props.bg || '#EDF8FF'};
    border: none;
  }
  &:focus {
    color: ${props => props.color || '#000'};
    border: none;
  }
  &[disabled] {
    color: rgba(255, 255, 255, .45)!important;
    background-color: #888!important;
  }
`

export default HoverBtn
