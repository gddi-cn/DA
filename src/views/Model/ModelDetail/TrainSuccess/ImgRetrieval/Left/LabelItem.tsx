import React from 'react'
import styled from 'styled-components'

import { useLabelItem } from '../hook'

const Container = styled.div`
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all ease-in-out .1s;
  &:hover:not([selected]) {
    background-color: rgba(0, 0, 0, .04);
  }
  &[selected] {
    background-color: #48A2DF;
    span {
      color: #fff;
      font-weight: 600;
    }
  }
`

const Label = styled.span`
  font-szie: 16px;
`

const LabelItem: React.FC<{ label: string }> = (
  {
    label,
  }
) => {
  const { containerRef, handleClick } = useLabelItem(label)

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <Label>
        {label}
      </Label>
    </Container>
  )
}

export default LabelItem
