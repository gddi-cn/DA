import React from 'react'
import styled from 'styled-components'

import LeftTitle from '../LeftTitle'
import ChipTypeSearch from './ChipTypeSearch'
import BrandSelector from './BrandSelector'

const Container = styled.div`
  background-color: #EDF8FF;
  border-right: 4px;
  padding: 20px 10px;
`

const Filter: React.FC = () => {
  return (
    <Container>
      <LeftTitle>
        快速选择芯片
      </LeftTitle>
      <ChipTypeSearch />
      <BrandSelector />
    </Container>
  )
}

export default Filter
