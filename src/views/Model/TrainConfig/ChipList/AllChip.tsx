import React from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'

import { allChipListAtom, hotChipListAtom } from '@views/Model/TrainConfig/store'

import ListContainer from './ListContainer'
import ChipItem from './ChipItem'


const Title = styled.p`
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #061926;
  &.noMT {
    margin-top: 0;
  }
`

const AllChip: React.FC = () => {
  const [chipList] = useAtom(allChipListAtom)
  const [hotChipList] = useAtom(hotChipListAtom)

  return (
    <>
      <Title className={hotChipList.length <= 0 ? 'noMT' : undefined}>全部芯片</Title>
      <ListContainer>
        {
          chipList.map(chip => (
            <ChipItem {...chip} key={`${chip.name}_${chip.chip_type}`} />
          ))
        }
      </ListContainer>
    </>
  )
}

export default AllChip
