import React from 'react'
import CustomScrollbar, { ScrollbarProps as CustomScrollbarProps } from 'react-custom-scrollbars'
import styled from 'styled-components'

export interface ScrollbarProps extends Partial<CustomScrollbarProps> {

}

const Bar: any = CustomScrollbar

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const Scrollbar: React.FC<ScrollbarProps> = (
  {
    children,
    ...props
  }
) => {
  const c = React.useMemo(() => children, [children])

  return (
    <Container>
      <Bar {...props}>
        { c }
      </Bar>
    </Container>
  )
}

export default Scrollbar
