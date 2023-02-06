import styled from 'styled-components'
import { Button, ButtonProps } from 'antd'

interface ISecondaryBtn {
  width?: number,
  fz?: number,
  fw?: number,
  br?: number,
  lh?: number,
  color?: 'default' | 'error',
}

const defaultColor = '#061926'
const errorColor = '#FF4D4F'

const SecondaryBtn = styled(Button)<ButtonProps & ISecondaryBtn>`
  background-color: transparent;
  border-color: ${p => p.color && p.color === 'error' ? errorColor : defaultColor};
  border-radius: ${props => props.br || 4}px;
  font-size: ${props => props.fz || 14}px;
  line-height: ${props => props.lh || 20}px;
  font-weight: ${props => props.fw || 500};
  font-style: normal;
  text-align: center;
  width: ${props => props.width ? props.width + 'px' : undefined};
  color: ${p => p.color && p.color === 'error' ? errorColor : defaultColor};
  &:hover, &:focus {
    background-color: transparent;
    border-color: ${p => p.color && p.color === 'error' ? errorColor : defaultColor};
    color: ${p => p.color && p.color === 'error' ? errorColor : defaultColor};
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
