import { ReactComponent as Medi } from '../icon/medi.svg'
import { ReactComponent as QUA } from '../icon/qual.svg'

import { ReactComponent as Hisi } from '../icon/hisi.svg'
import { ReactComponent as Nvid } from '../icon/nvid.svg'
import { ReactComponent as Rock } from '../icon/rock.svg'

import { ReactComponent as Camb } from '../icon/camb.svg'
import { ReactComponent as Sigm } from '../icon/sigm.svg'
import { ReactComponent as Soph } from '../icon/soph.svg'

const imgSrcMap: any = {
  Apple: <Hisi />,
  Huawei: <Hisi />,
  MediaTek: <Medi />,
  Nvidia: <Nvid />,
  Qualcomm: <QUA />,
  Rockchip: <Rock />,
  // Cloud: YUN,
  Sigmastar: <Sigm />,
  SOPHGO: <Soph />,
  Intel: <Hisi />,
  Cambricon: <Camb />
}

const titleMap: any = {
  Apple: '苹果',
  Huawei: '华为海思',
  MediaTek: '联发科',
  Nvidia: '英伟达',
  Qualcomm: '高通',
  Rockchip: '瑞芯微',
  // Cloud: '云端',
  Sigmastar: '星宸',
  SOPHGO: '算能科技',
  Intel: '英特尔',
  Cambricon: '寒武纪'
}

export { imgSrcMap, titleMap }
