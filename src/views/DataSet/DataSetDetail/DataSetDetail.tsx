import { useMemo } from 'react'
import { ScaleRight } from '@src/UIComponents'
import DatasetPreview from './DatasetPreview'
import './DataSetDetail.module.less'

// const colors={

// }
const DataSetDetail = (): JSX.Element => {
  const leftContent = useMemo(() => {
    return (
      <div className='leftContent'>
        123

      </div>
    )
  }, [])

  const rightContent = useMemo(() => {
    return (
      <div className='rightContent'>
        <DatasetPreview/>
      </div>
    )
  }, [])
  return (
    <div styleName='DataSetDetail'>
      <div className='ScaleRight_wrap'>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </div>
    </div>
  )
}

export default DataSetDetail
