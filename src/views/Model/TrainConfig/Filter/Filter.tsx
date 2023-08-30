import React from 'react'
import styled from 'styled-components'

import LeftTitle from './LeftTitle'
import ChipNameSearch from './ChipNameSearch'
import BrandSelector from './BrandSelector'

const Container = styled.div`
  background-color: #EDF8FF;
  border-radius: 4px;
  padding: 20px 10px;
  overflow: hidden;
`


const Filter: React.FC = () => {
  return (
    <Container>
      <LeftTitle>
        快速选择芯片
      </LeftTitle>
      <ChipNameSearch />
      <BrandSelector />
    </Container>
  )
}

export default Filter
