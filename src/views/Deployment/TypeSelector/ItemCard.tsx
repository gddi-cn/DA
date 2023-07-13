
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
  position: relative;
  transition:
          box-shadow 0.2s ease-in-out;
  &:hover:not([disabled]) {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
  &[disabled] {
    cursor: not-allowed;
    img {
      filter: grayscale(80%)!important;
    }
    *:not(div) {
      color: #8C8C8C!important;
    }
  }
  * {
    user-select: none;
  }
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
  height: 305px;
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

const SubAction = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
`

const ItemCard: React.FC<{ type: DeployType, disabled?: boolean, subAction?: React.ReactNode }> = (
  {
    type,
    disabled = false,
    subAction,
  }
) => {
  const { logo, title, description, handleClick, containerRef } = useItemCard(type, disabled)
  return (
    <Card ref={containerRef} onClick={handleClick}>
      <Img src={logo} />
      {title}
      <Desc>{description}</Desc>
      {
        subAction ? (
          <SubAction>
            { subAction }
          </SubAction>
        ) : null
      }
    </Card>
  )
}

export default ItemCard
