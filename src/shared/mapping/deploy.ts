import sdk from '@src/asset/images/deploy/sdk.png'
import experience from '@src/asset/images/deploy/experience.png'
import platform from '@src/asset/images/deploy/platform.png'

import { DeployType } from '../enum/deploy'

export const deployTypeLogoMapping: Map<DeployType, any> = new Map([
  [DeployType.EXPERIENCE, experience],
  [DeployType.PLATFORM, platform],
  [DeployType.SDK, sdk],
])

export const deployTypeNameMapping: Map<DeployType, string> = new Map([
  [DeployType.EXPERIENCE, '应用平台部署（体验版）'],
  [DeployType.PLATFORM, '应用平台部署'],
  [DeployType.SDK, 'SDK 部署'],
])

export const deployTypeDescMapping: Map<DeployType, string> = new Map([
  [DeployType.EXPERIENCE, '验设备用于您初步体验我们的应用平台部署'],
  [DeployType.PLATFORM, '无需二次开发，即可以运行模型，并支持多项生产级功能'],
  [DeployType.SDK, '“模型推理 SDK” 适配多种芯片，您可以下载适合您硬件的SDK，开始任意的开发。'],
])
