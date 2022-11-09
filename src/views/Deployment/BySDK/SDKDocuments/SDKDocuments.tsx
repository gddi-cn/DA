import { GIconInput } from '@src/UIComponents'
import { useDeferredValue, useState } from 'react'

import './SDKDocuments.module.less'

// const CusRadio = (props:any) => {
//   const { value, setChipType } = props

//   const handleSelect = (v:string) => {
//     setChipType(v)
//   }

//   const getActiveCls = (v:string) => {
//     if (v === value) {
//       return 'item_active'
//     }

//     return ''
//   }
//   return (
//     <div className='CusRdio'>
//       <div className={`x86_wrap ${getActiveCls('x86')} `} onClick={() => handleSelect('x86')}>X86</div>
//       <div className={`arm_wrap ${getActiveCls('arm')} `} onClick={() => handleSelect('arm')}>ARM</div>
//     </div>
//   )
// }

const SDK_DOCS = [
  {
    name: '华为海思',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Huawei_hisi.pdf'
  },
  {
    name: '华为昇腾',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Huawei_ascend.pdf'
  },
  {
    name: '寒武纪',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Cambricon.pdf'
  },

  {
    name: '算能SE5',
    src: 'https://s3.local.cdn.desauto.net/public/docs/SOPHGO_se5.pdf'
  },
  {
    name: '英伟达',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Nvidia.pdf'
  },
  {
    name: '英特尔',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Intel.pdf'
  },

  {
    name: '瑞芯微',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Rockchip.pdf'
  },
  {
    name: '星宸',
    src: 'https://s3.local.cdn.desauto.net/public/docs/Sigmastar.pdf'
  },
]

const SDKDocuments = (): JSX.Element => {
  // const [chipType, setChipType] = useState('x86')

  const [pdfList, setPdfList] = useState(SDK_DOCS)

  const deferList = useDeferredValue(pdfList)

  const handleSearch = (v: React.ChangeEvent<HTMLInputElement>) => {
    const value = v.target.value
    if (value) {
      const list = SDK_DOCS.filter((o) => o.name.includes(value))
      setPdfList(list)
    } else {
      setPdfList(SDK_DOCS)
    }
  }

  return (
    <div styleName='SDKDocuments'>
      <div className='search_header'>
        <div className='header_title'>选择芯片下载SDK压缩包</div>
        <div className='params_select_wrap'>
          <div className='SDKDocuments_input'><GIconInput placeholder='搜索芯片名称' onChange={handleSearch}></GIconInput></div>
          {/* <CusRadio value={chipType} setChipType={setChipType}></CusRadio> */}
        </div>
      </div>
      <div className='body_list'>
        {
          deferList.map((data, index) => {
            return (
              <div className='list_item' key={index}>
                <div className='file_name'>{data.name}</div>
                <a className='down_load' href={data.src} target='_blank' rel="noreferrer">下载</a>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default SDKDocuments
