import styled from 'styled-components'
import React from 'react'

const C = styled.div`
  background-color: #edf8ff;
  position: relative;
`;

const Scroll = styled.div`
  background-color: #edf8ff;
  max-height: calc(98vh - 350px);
  padding: 40px 40px 60px;
  overflow-y: auto;
`
const Container: React.FC<{children?: React.ReactNode}> = (
  {
    children
  }
) => {
  return (
    <C>
      <Scroll>
        { children }
      </Scroll>
    </C>
  )
}

export default Container