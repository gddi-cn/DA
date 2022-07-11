
import fewshot0 from './analysisImg/few_shot0.png'
import fewshot1 from './analysisImg/few_shot1.png'
import intensive0 from './analysisImg/intensive0.png'
import intensive1 from './analysisImg/intensive1.png'
import isMultiScale0 from './analysisImg/isMultiScale0.png'
import isMultiScale1 from './analysisImg/isMultiScale1.png'
import isfinegrain0 from './analysisImg/isfinegrain0.png'
import isfinegrain1 from './analysisImg/isfinegrain1.png'
import longtail0 from './analysisImg/long_tail0.png'
import longtail1 from './analysisImg/long_tail1.png'
import occlusion0 from './analysisImg/occlusion0.png'
import occlusion1 from './analysisImg/occlusion1.png'
import smalldetect0 from './analysisImg/small_detect0.png'
import smalldetect1 from './analysisImg/small_detect1.png'
import underexposed0 from './analysisImg/underexposed0.png'
import underexposed1 from './analysisImg/underexposed1.png'

export const imgObj: any = {
  // brightness: {
  //   input: underexposed0,
  //   out: underexposed1
  // },
  underexposed: {
    input: underexposed0,
    out: underexposed1
  },
  small_detect: {
    input: smalldetect0,
    out: smalldetect1
  },
  occlusion: {
    input: occlusion0,
    out: occlusion1
  },
  long_tail: {
    input: longtail0,
    out: longtail1
  },
  fine_grain: {
    input: isfinegrain0,
    out: isfinegrain1
  },
  multi_scale: {
    input: isMultiScale0,
    out: isMultiScale1
  },
  intensive: {
    input: intensive0,
    out: intensive1
  },
  few_shot: {
    input: fewshot0,
    out: fewshot1
  },
  pose_diversity: {
    input: fewshot0,
    out: fewshot1
  },
}

export const chineseObj: any = {
  // brightness: '拍摄光照质量',
  underexposed: '拍摄光照质量',
  small_detect: '目标尺寸',
  occlusion: '目标完整性',
  long_tail: '数据均衡度',
  fine_grain: '类别可区分性',
  multi_scale: '场景丰富度',
  intensive: '目标密集度',
  few_shot: '图片数据量',
  pose_diversity: '大姿态比例'
}

export const colorObj: any = {
  // brightness: '#EFAF02',
  underexposed: '#EFAF02',
  small_detect: '#00CCB0',
  occlusion: '#FF713B',
  long_tail: '#447BF9',
  fine_grain: '#EFAF02',
  multi_scale: '#00CCB0',
  intensive: '#FF713B',
  few_shot: '#447BF9'
}
