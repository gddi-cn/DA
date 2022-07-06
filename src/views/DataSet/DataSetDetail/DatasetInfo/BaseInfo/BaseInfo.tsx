
import { ReactComponent as Note } from './icon/note.svg'
import { ReactComponent as Frame } from './icon/Frame.svg'
import ClassTable from './ClassTable'
import './BaseInfo.module.less'
import { useCallback, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

type Props={
    version:any
}

const BaseInfo = (props: Props): JSX.Element => {
  console.log(props)
  const { version } = props
  const [trainSetData, setTrainSetData] = useState<any>({})
  const [validSetData, setValidSetData] = useState<any>({})

  const fetAllSet = useCallback(() => {
    console.log(1)
  }, [])
  useEffect(() => {
    console.log(version)
    if (!isEmpty(version)) {

    }
  }, [version])
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

      <div className='echartOrTable'>
        <ClassTable/>
      </div>
    </div>
  )
}

export default BaseInfo
