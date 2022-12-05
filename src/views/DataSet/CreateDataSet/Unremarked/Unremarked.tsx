import React from 'react'
import styled from 'styled-components'
import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import Footer from './Footer'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  row-gap: 40px;
  padding-top: 48px;
`

const Unremarked: React.FC = () => {
  return (
    <Container>
      <TaskStep />
      <Content>
        123
      </Content>
      <Footer />
    </Container>
  )
}

export default Unremarked
