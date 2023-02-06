import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'


const MiniBtn = styled(Button)`
  background-color: #fff;
  border-color: #061926;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  padding: 0 8px;
  color: #061926;
  height: unset;
  &:hover, &:focus {
    background-color: #fff;
    border-color: #061926;
    color: #061926;
  }
`

export default MiniBtn
