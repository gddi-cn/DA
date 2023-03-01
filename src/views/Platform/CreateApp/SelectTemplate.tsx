import React from 'react'
import styled from 'styled-components'

import { useTemplate } from './hook'
import TemplateList from '@src/components/TemplateList'

const Container = styled.div`
  height: 100%;
  padding-top: 20px;
`

const SelecteTemplate: React.FC = () => {
  const { template, handleChange } = useTemplate()

  return (
    <Container>
      <TemplateList
        template={template || undefined}
        onChange={handleChange}
      />
    </Container>
  )
}

export default SelecteTemplate

