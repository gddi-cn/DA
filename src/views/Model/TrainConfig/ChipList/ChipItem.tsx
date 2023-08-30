import React from 'react'
import styled from 'styled-components'
import { useChip } from './hook'

const ChipContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  outline: 1px solid #d9ecff;
  box-sizing: border-box;
  //width: 155px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  overflow: hidden;
  cursor: pointer;
  transition:
          outline 0.1s ease-in-out,
          box-shadow 0.2s ease-in-out;
  &:hover:not([selected]) {
    box-shadow: 0 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)
  }
  &[selected] {
    outline: 2px solid #48A2DF;
  }
`

const ChipLogo = styled.img`
  display: block;
  object-fit: contain;
  width: 112px;
  height: 80px;
`

const BrandLogo = styled.img`
  display: block;
  object-fit: contain;
  margin-top: 8px;
  width: 82px;
  height: 14px;
`

const ChipName = styled.p`
  margin-top: 16px;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #48A2DF;
`

const ChipType = styled.div`
  margin-top: 16px;
  border-radius: 2px;
  border: 1px solid #62b0e5;
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  color: #62B0E5;
  padding: 1px;
`

const formatName = (name: string): string => {
  if (name === 'SE5') return 'BM1684'

  if (/\d+plus$/.test(name)) {
    return name.slice(0, -4) + '+'
  }

  return name
}

const ChipItem: React.FC<Chip.Instance> = (chip) => {
  const { chipContainerRef, handleClick, brandLogo, logo } = useChip(chip)
  const { name, chip_type } = chip

  return (
    <ChipContainer ref={chipContainerRef} onClick={handleClick}>
      <ChipLogo src={logo} />
      <BrandLogo src={brandLogo} />
      <ChipName>{formatName(name)}</ChipName>
      <ChipType>{chip_type}</ChipType>
    </ChipContainer>
  )
}

export default ChipItem
