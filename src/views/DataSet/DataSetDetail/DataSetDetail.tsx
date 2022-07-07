import { useMemo, useState } from 'react'
import { ScaleRight } from '@src/UIComponents'
import DatasetInfo from './DatasetInfo'
import DatasetPreview from './DatasetPreview'
import './DataSetDetail.module.less'

// const colors={

// }
//
const DataSetDetail = (): JSX.Element => {
  const [whichSet, setWhichSet] = useState('trainset_id')
  const [classInfo, setClassInfo] = useState<any>({})
  const leftContent = useMemo(() => {
    return (
      <div className='leftContent'>
        <DatasetInfo whichSet={whichSet} setClassInfo={setClassInfo} classInfo={classInfo} />
      </div>
    )
  }, [whichSet, classInfo])

  const rightContent = useMemo(() => {
    return (
      <div className='rightContent'>
        <DatasetPreview setWhichSet={setWhichSet} classInfo={classInfo}/>
      </div>
    )
  }, [classInfo])
  return (
    <div styleName='DataSetDetail'>
      <div className='ScaleRight_wrap'>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </div>
    </div>
  )
}

export default DataSetDetail
