// import { useEffect, useState } from 'react'
import { SmallButton, TypeSettingBotton } from '@src/UIComponents'
import { useEffect, useState } from 'react'
import TopErrorList from '../TopErrorList'
import { processEchartsData } from './processLabelArt'
import './SencesError.module.less'

const SencesError = (props: any): JSX.Element => {
  const { data } = props
  const [dataList, setDataList] = useState<any[]>([])

  const [currentData, setCurrentData] = useState<any>({})

  useEffect(() => {
    const list = processEchartsData(data)
    setDataList(list)
  }, [data])

  console.log(currentData)
  const handleonChange = (key:string) => {
    console.log(key)
  }
  return (
    <div styleName='SencesError'>
      <TopErrorList dataList={dataList} setCurrentData={setCurrentData}/>
      <div className='SencesError_wrap'>
        <div className='SencesError_view_headr'>
          <div className='advice'>
            该类需{currentData?.advice}
          </div>
          <div className='right_wrap'>
            <SmallButton type='nomal'>补充数据</SmallButton>
            <TypeSettingBotton onChange={handleonChange}></TypeSettingBotton>
          </div>
        </div>
        <div className='SencesError_view_body'>
          <SmallButton type='nomal'>补充数据</SmallButton>
        </div>
      </div>
    </div>
  )
}

export default SencesError
