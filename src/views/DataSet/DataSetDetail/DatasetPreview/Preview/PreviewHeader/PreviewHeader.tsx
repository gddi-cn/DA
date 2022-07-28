import { TypeSettingBotton } from '@src/UIComponents'
import type { Dispatch, SetStateAction } from 'react'
import './PreviewHeader.module.less'

type Props = {
    classInfo: any,
    setViewType: Dispatch<SetStateAction<string>>
}
const PreviewHeader = (props: Props): JSX.Element => {
  const { classInfo, setViewType } = props
  const handleTypeChange = (key: string) => {
    console.log(key, 'handleTypeChange')
    setViewType(key)
  }
  return (
    <div styleName='PreviewHeader'>
      <div className='PreviewHeader_left_wrap'>{classInfo?.name || '--'}</div>
      <div className='PreviewHeader_right_wrap'>
        <TypeSettingBotton onChange={handleTypeChange} />
      </div>
    </div>
  )
}

export default PreviewHeader
