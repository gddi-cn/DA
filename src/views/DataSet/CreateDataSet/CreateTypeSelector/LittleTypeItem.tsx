import React from 'react'
import styled from 'styled-components'

import {DatasetCreateType} from '@src/shared/enum/dataset'
import {useTypeItem} from './hook'

const Container = styled.div`
  height: 140px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 48px;
  overflow: hidden;
  cursor: pointer;
  transition:
          //outline 0.1s ease-in-out,
          box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0 1px 1px 0 rgba(0,0,0,0.14),0 1px 3px 0 rgba(0,0,0,0.12)
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
`
const Img = styled.img`
  height: 100%;
  object-fit: cover;
`

const Title = styled.h5`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #3693D1; 
`

interface TypeItemProp {
  type: DatasetCreateType;
}
const LittleTypeItem: React.FC<TypeItemProp> = (
  {
    type,
  }
) => {
  const {
    containerRef,
    logo,
    title,
    handleClick,
  } = useTypeItem(type)

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <Img src={logo} />
      <Title>{title}</Title>
    </Container>
  )
}

export default LittleTypeItem
