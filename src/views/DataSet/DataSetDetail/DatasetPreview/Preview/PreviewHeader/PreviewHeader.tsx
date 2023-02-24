import { TypeSettingBotton } from '@src/UIComponents'
import { useAtom } from 'jotai'
import type { Dispatch, SetStateAction } from 'react'
import { currentClassAtom } from '../../../store'
import './PreviewHeader.module.less'

type Props = {
    setViewType: Dispatch<SetStateAction<string>>
}
const PreviewHeader = (props: Props): JSX.Element => {
  const { setViewType } = props
  const [classInfo] = useAtom(currentClassAtom)

  const handleTypeChange = (key: string) => {
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
