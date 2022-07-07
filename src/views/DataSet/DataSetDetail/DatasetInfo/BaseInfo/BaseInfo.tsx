
import { ReactComponent as Note } from './icon/note.svg'
import { ReactComponent as Frame } from './icon/Frame.svg'
import ClassTable from './ClassTable'
import { Dispatch, SetStateAction, useMemo } from 'react'
import './BaseInfo.module.less'

type Props={
    version:any,
    trainSetData: any,
    validSetData: any,
    whichSet: string,
    setClassInfo: Dispatch<SetStateAction<any>>,
    classInfo: any
}

const BaseInfo = (props: Props): JSX.Element => {
  const { version, whichSet, setClassInfo, classInfo, trainSetData, validSetData } = props

  const currentSet = useMemo(() => {
    try {
      const allSet: any = {
        trainset_id: trainSetData,
        validset_id: validSetData
      }
      return allSet[whichSet]
    } catch {
      return {}
    }
  }, [validSetData, trainSetData, whichSet])
  return (
    <div styleName='BaseInfo'>

      <div className='describtion_wrap'>
        <Note/>
        <div className='describtion'>暂无描述</div>
      </div>
      <div className='info_list_and_btn_wrap'>
        <div className='info_list'>
          <div className='info_item_wrap'>
            <p className='label'>数据大小：</p>
            <p className='text'>1</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>数据量：</p>
            <p className='text'>1</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标注数：</p>
            <p className='text'>1</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标签种类：</p>
            <p className='text'>1</p>
          </div>
        </div>

        <div className='checkout_btn_wrap'>
          <Frame className='bar_chart'/>
          <p>柱状视图</p>
        </div>
      </div>

      {
        useMemo(() => (
          <div className='echartOrTable'>
            <ClassTable
              version={version}
              whichSet={whichSet}
              setClassInfo={setClassInfo}
              classInfo={classInfo}
              currentSet={currentSet}
            />
          </div>
        ), [classInfo, setClassInfo, version, whichSet, currentSet])
      }
    </div>
  )
}

export default BaseInfo
