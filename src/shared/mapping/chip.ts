import { ChipConfigType, ChipType } from '@src/shared/enum/chip'


export const chipConfigNameMapping: Map<ChipConfigType, string> = new Map([
  [ChipConfigType.RECOMMEND, /* */'推荐配置'],
  [ChipConfigType.CUSTOM, /* */'自定义'],
])

export const chipTypeColorMapping: Map<ChipType, string> = new Map([
  [ChipType.CPU, '#96E1F0'],
  [ChipType.GPU, '#EEAAEE'],
  [ChipType.NPU, '#8BDB59'],
])

