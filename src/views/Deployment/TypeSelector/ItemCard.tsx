
import React from 'react'
import styled from 'styled-components'

import { useItemCard } from './hook'
import { DeployType } from '@src/shared/enum/deploy'

const Card = styled.div`
  width: 436px;
  height: 474px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
          box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
`

const Title = styled.h5`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #3693D1; 
  margin-bottom: 0;
`

const Desc = styled.p`
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #8C8C8C;
  margin-bottom: 0;
  padding: 0 20px;
`

const ItemCard: React.FC<{ type: DeployType }> = (
  {
    type,
  }
) => {
  const { logo, title, description, handleClick, containerRef } = useItemCard(type)
  return (
    <Card ref={containerRef} onClick={handleClick}>
      <Img src={logo} />
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </Card>
  )
}

export default ItemCard
