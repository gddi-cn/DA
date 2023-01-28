import React from 'react'
import sdk from '@src/asset/images/deploy/sdk.png'
import experience from '@src/asset/images/deploy/experience.png'
import platform from '@src/asset/images/deploy/platform.png'

import { DeployType } from '../enum/deploy'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  column-gap: 6px;
`

const Title = styled.h5`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #3693D1; 
  margin-bottom: 0;
  text-align: center;
`

const Right = styled.div`
  width: 57px;
  position: relative;
`

const Chip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 10px;
  background-color: #3693D1;
  font-weight: 600;
  padding: 0 10px;
  text-align: center;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 20px;
`

const ExperienceTitle: React.FC = () => {
  return (
    <Container>
      <Title>
        应用平台部署
      </Title>
      <Right>
        <Chip>体验版</Chip>
      </Right>
    </Container>
  )
}

export const deployTypeLogoMapping: Map<DeployType, any> = new Map([
  [DeployType.EXPERIENCE, experience],
  [DeployType.PLATFORM, platform],
  [DeployType.SDK, sdk],
])

export const deployTypeNameMapping = new Map<DeployType, React.ReactNode>([
  [DeployType.EXPERIENCE, <ExperienceTitle />],
  [DeployType.PLATFORM, <Title>应用平台部署</Title>],
  [DeployType.SDK, <Title>SDK 部署</Title>],
])

export const deployTypeDescMapping: Map<DeployType, string> = new Map([
  [DeployType.EXPERIENCE, '我们提供设备用于您在线体验应用平台部署'],
  [DeployType.PLATFORM, '无需二次开发，即可以运行模型，并支持多项生产级功能'],
  [DeployType.SDK, '“模型推理 SDK” 适配多种芯片，您可以下载适合您硬件的SDK，开始任意的开发。'],
])
