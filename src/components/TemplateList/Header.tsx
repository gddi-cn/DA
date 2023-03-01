import React from 'react'
import styled from 'styled-components'

import NameFilter from './NameFilter'
import TemplateLabelFilter from './TemplateLabelFilter'
import InputFilter from './InputFilter'

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding: 0 40px;
`

const Header: React.FC = () => {
  return (
    <Container>
      <NameFilter />
      <TemplateLabelFilter />
      <InputFilter />
    </Container>
  )
}

export default Header

