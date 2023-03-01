import React from 'react'
import styled from 'styled-components'

import { useTemplateList } from './hook'

import Header from './Header'
import List from './List'
import Scrollbar from '../Scrollbar'

interface TemplateListProps {
  template?: App.Template.Instance
  onChange?: (selected: App.Template.Instance | null) => void,
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1;
  margin-top: 18px;
`

const TemplateList: React.FC<TemplateListProps> = (
  {
    template,
    onChange,
  }
) => {
  useTemplateList(template, onChange)

  return (
    <Container>
      <Header />
      <Content>
        <Scrollbar autoHide>
          <List />
        </Scrollbar>
      </Content>
    </Container>
  )
}

export default TemplateList

