import React from 'react'
import styled from 'styled-components'

import { useList } from './hook'
import TemplateItem from './TemplateItem'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 2px 40px;
`

const List: React.FC = () => {
  const { templateList, onDelete } = useList()

  return (
    <Container>
      {
        templateList.map(template => (
          <TemplateItem template={template} onDelete={onDelete} key={template.id} />
        ))
      }
    </Container>
  )
}

export default List

