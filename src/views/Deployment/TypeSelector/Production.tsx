import React from 'react'
import styled from 'styled-components'

import ItemCard from './ItemCard'
import { DeployType } from '@src/shared/enum/deploy'
import { useTypeSelector } from './hook'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_SDK } from "@router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  background-color: #edf8ff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
`

const ToSDK: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(APP_SDK)
  }

  return (
    <Button size='small' onClick={handleClick}>
      旧版 SDK 部署
    </Button>
  )
}

const Production: React.FC = () => {
  const { disabledTrial } = useTypeSelector()

  return (
    <Container>
      <Content>
        <ItemCard type={DeployType.EXPERIENCE} disabled={disabledTrial} />
        {/* <ItemCard type={DeployType.FORMAL} subAction={<ToSDK />} /> */}
        <ItemCard type={DeployType.FORMAL} />
      </Content>
    </Container>
  )
}

export default Production

