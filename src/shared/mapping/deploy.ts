import sdk from '@src/asset/images/deploy/sdk.png'
import experience from '@src/asset/images/deploy/experience.png'
import { DeployType } from '../enum/deploy'

export const deployTypeLogoMapping: Map<DeployType, any> = new Map([
  [DeployType.SDK, sdk],
  [DeployType.EXPERIENCE, experience],
])

export const deployTypeNameMapping: Map<DeployType, string> = new Map([
  [DeployType.SDK, 'SDK 部署'],
  [DeployType.EXPERIENCE, '应用平台部署（体验版）']
])

export const deployTypeDescMapping: Map<DeployType, string> = new Map([
  [DeployType.SDK, '我们提供适配多种芯片的“模型推理 SDK”，您可以下载适合您硬件的 SDK，开始任意的开发。'],
  [DeployType.EXPERIENCE, '我们提供体验设备用于您初步体验我们的应用平台部署。正式使用请查看右上角「应用部署」，无需二次开发，即可以运行模型，并支持多项生产级功能。']
])
