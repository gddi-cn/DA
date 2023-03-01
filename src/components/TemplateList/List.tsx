import React from 'react'
import styled from 'styled-components'

import { useList } from './hook'
import TemplateItem from './TemplateItem'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 2px 40px;
`

const List: React.FC = () => {
  const { templateList } = useList()

  return (
    <Container>
      {
        templateList.map(template => (
          <TemplateItem {...template} key={template.id} />
        ))
      }
    </Container>
  )
}

export default List

