import { GIconInput } from '@src/UIComponents'
import { useState } from 'react'

import './SDKDocuments.module.less'

const CusRdio = (props:any) => {
  console.log(props)
  const { value, setChipType } = props

  const handleSelect = (v:string) => {
    setChipType(v)
  }

  const getActiveCls = (v:string) => {
    console.log(v)
    if (v === value) {
      return 'item_active'
    }

    return ''
  }
  return (
    <div className='CusRdio'>
      <div className={`x86_wrap ${getActiveCls('x86')} `} onClick={() => handleSelect('x86')}>X86</div>
      <div className={`arm_wrap ${getActiveCls('arm')} `} onClick={() => handleSelect('arm')}>ARM</div>
    </div>
  )
}

const SDKDocuments = (): JSX.Element => {
  const [chipType, setChipType] = useState('x86')

  const handleSearch = (v: React.ChangeEvent<HTMLInputElement>) => {
    console.log(v)
  }
  return (
    <div styleName='SDKDocuments'>
      <div className='search_header'>
        <div className='header_title'>选择芯片下载SDK压缩包</div>
        <div className='params_select_wrap'>
          <div className='SDKDocuments_input'><GIconInput placeholder='搜索芯片名称' onChange={handleSearch}></GIconInput></div>
          <CusRdio value={chipType} setChipType={setChipType}></CusRdio>
        </div>
      </div>
      <div className='body_list'>
        <div className='list_item'>
          <div className='file_name'>XXX芯片</div>
          <a className='down_load'>下载</a>
        </div>
        <div className='list_item'>
          <div className='file_name'>XXX芯片</div>
          <a className='down_load'>下载</a>
        </div>
        <div className='list_item'>
          <div className='file_name'>XXX芯片</div>
          <a className='down_load'>下载</a>
        </div>
        <div className='list_item'>
          <div className='file_name'>XXX芯片</div>
          <a className='down_load'>下载</a>
        </div>
      </div>
    </div>
  )
}

export default SDKDocuments
