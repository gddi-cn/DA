import React from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'

import { hotChipListAtom } from '@views/Model/TrainConfig/store'

import ListContainer from './ListContainer'
import ChipItem from './ChipItem'

const Title = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #061926;
`

const HotChip: React.FC = () => {
  const [chipList] = useAtom(hotChipListAtom)
  return chipList.length ? (
    <>
      <Title>
        热门芯片推荐
      </Title>
      <ListContainer>
        {
          chipList.map(chip => (
            <ChipItem {...chip} key={`${chip.name}_${chip.chip_type}`} />
          ))
        }
      </ListContainer>
    </>
  ) : null
}

export default HotChip
