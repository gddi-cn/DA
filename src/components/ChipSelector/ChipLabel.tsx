import React from 'react'
import { styled } from '@mui/material'
import {Chip} from "@src/shared/types/chip";
import {chipTypeColorMapping} from "@src/shared/mapping/chip";

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
`

const Name = styled('p')`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`

const Type = styled('p', {
  shouldForwardProp: (propName) => propName !== 'color'
})<{ color?: string }>(({ color }) => `
  font-size: 12px;
  color: ${color || '#eee'};
  border: 1px solid ${color || '#eee'};
  border-radius: 4px;
  line-height: 1.5;
  margin: 0;
  padding: 0 2px;
`)


const ChipLabel: React.FC<Pick<Chip, 'name' | 'chip_type'>> = (
  {
    name,
    chip_type,
  }
) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Type color={chipTypeColorMapping.get(chip_type)}>{chip_type.toUpperCase()}</Type>
    </Container>
  )
}

export default ChipLabel
