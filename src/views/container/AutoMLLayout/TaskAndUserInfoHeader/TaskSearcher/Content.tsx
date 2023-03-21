import React from 'react'
import styled from 'styled-components'

import { useContent } from './hook'
import NameFilter from './NameFilter'
import AdditionalFilter from './AdditionalFilter'
import TaskList from './TaskList'
import Footer from './Footer'

const Container = styled.div`
  width: 452px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px 0;
  border-radius: 12px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
  row-gap: 14px;
`

const Content: React.FC = () => {
  useContent()

  return (
    <Container>
      <NameFilter />
      <AdditionalFilter />
      <TaskList />
      <Footer />
    </Container>
  )
}

export default Content

