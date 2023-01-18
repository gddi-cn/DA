import React from 'react'
import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

interface IPrimaryBtn {
  width?: number,
  fz?: number,
  fw?: number,
  br?: number,
  lh?: number,
}

const PrimaryBtn = styled(Button)<ButtonProps & IPrimaryBtn>`
  background-color: #061926;
  border-color: #061926;
  text-align: center;
  border-radius: ${props => props.br || 4}px;
  font-size: ${props => props.fz || 14}px;
  line-height: ${props => props.lh || 20}px;
  font-weight: ${props => props.fw || 500};
  font-style: normal;
  font-family: 'PingFang SC',serif;
  width: ${props => props.width ? props.width + 'px' : undefined};
  color: #fff;
  &:hover, &:focus {
    color: #fff;
    background-color: #061926;
    border-color: #061926;
  }
  &[disabled] {
    color: rgba(255, 255, 255, .45)!important;
    background-color: #888!important;
  }
`

export default PrimaryBtn
