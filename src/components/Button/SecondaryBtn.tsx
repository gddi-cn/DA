import styled from 'styled-components'
import { Button, ButtonProps } from 'antd'

interface ISecondaryBtn {
  width?: number,
  fz?: number,
  fw?: number,
  br?: number,
  lh?: number,
}

const SecondaryBtn = styled(Button)<ButtonProps & ISecondaryBtn>`
  background-color: transparent;
  border-color: #061926;
  border-radius: ${props => props.br || 4}px;
  font-size: ${props => props.fz || 14}px;
  line-height: ${props => props.lh || 20}px;
  font-weight: ${props => props.fw || 600};
  font-style: normal;
  font-family: 'PingFang SC',serif;
  text-align: center;
  width: ${props => props.width ? props.width + 'px' : undefined};
  color: #061926;
  &:hover, &:focus {
    background-color: transparent;
    border-color: #061926;
    color: #061926;
  }
`

SecondaryBtn.defaultProps = {
  theme: {
    fz: 14,
    px: 20,
    py: 5,
    fw: 600,
    br: 4,
    lh: 20,
  }
}

export default SecondaryBtn
