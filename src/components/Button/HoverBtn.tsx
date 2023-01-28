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
  font-size: ${props => props.fz ? props.fz + 'px' : undefined};
  line-height: ${props => props.lh ? props.lh + 'px' : undefined};
  font-weight: ${props => props.fw || 400};
  font-style: normal;
  font-family: 'PingFang SC',serif;
  width: ${props => props.width ? props.width : undefined};
  color: ${props => props.color || '#000'};
  box-shadow: none;
  padding-top: 10px;
  padding-bottom: 32px;
  transition: all ease-in-out .2s;
  &:hover {
    color: ${props => props.color || '#000'};
    font-weight: 600;
    background-color: ${props => props.bg || '#EDF8FF'};
    border: none;
  }
  &:focus {
    color: ${props => props.color || '#000'};
    font-weight: 600;
    border: none;
  }
  &[disabled] {
    color: rgba(255, 255, 255, .45)!important;
    background-color: #888!important;
  }
`

export default HoverBtn
