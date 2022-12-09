import { Pagination } from 'antd'

import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { ReactCusScrollBar } from '@src/UIComponents'
import './ClassTable.module.less'
import { DatasetScene } from '@src/shared/enum/dataset'

type Props = {
  // version: any,
  // whichSet: string,
  setClassInfo: Dispatch<SetStateAction<any>>,
  classInfo: any,
  currentSet:any,

  statistic:any
  scene?: DatasetScene
}

type ItemProps<T> = {
  data: T, currentSet: any,
  setClassInfo: Dispatch<SetStateAction<any>>,
  classInfo: any,
  scene?: DatasetScene
}

type DataItem = {
  cover?: string,
  name?: string,
  annotation_count?: number,
  // file_type: 'video' | 'image',
  // url: string,
  // class_id:number
}
function BodyItem<T extends DataItem> (props: ItemProps<T>) {
  const { data, currentSet, classInfo, setClassInfo, scene } = props


  const isKeyPoint = scene === DatasetScene.KeyPointsBasedAction

  const getPercent = () => {
    if (data?.annotation_count) {
      return (data.annotation_count / currentSet?.annotation_count * 100).toFixed(2) + '%'
    }
    return 0
  }
  const handleClick = () => {
    setClassInfo(data)
  }

  const getCls = () => {
    if (classInfo?.name === data?.name) {
      return 'body_item_wrap body_item_wrap_active'
    }
    return 'body_item_wrap'
  }

  return (
    <div className={[getCls(), isKeyPoint ? 'col_3' : ''].join(' ')} onClick={handleClick}>
      {
        isKeyPoint ? null : (
          <div className='body_item'>
            <img alt='gddi_img' src={data?.cover} className='label_cover' />
          </div>
        )
      }
      <div className='body_item'>{data?.name}</div>
      <div className='body_item'>{data?.annotation_count}</div>
      <div className='body_item'>{getPercent()}</div>
    </div>
  )
}

const ClassTable = (props: Props): JSX.Element => {
  const { currentSet, classInfo, setClassInfo, statistic, scene } = props

  const isKeyPoint = scene === DatasetScene.KeyPointsBasedAction

  const Header = () => {
    return (
      <div className={['header_wrap', isKeyPoint ? 'col_3' : ''].join(' ')}>
        {
          isKeyPoint ? null : (
            <div>标签封面</div>
          )
        }
        <div>标签名</div>
        <div>标注数</div>
        <div>占比</div>
      </div>
    )
  }

  const Body = useMemo(() => {
    if (isEmpty(statistic)) {
      return null
    }

    // (items as Array<any>)
    return (
      <>
        <ReactCusScrollBar id='body_wrap'>
          <div className='body_wrap'>
            {
              (statistic as Array<any>)?.map((o, i) => {
                return (
                  <BodyItem
                    key={i} data={o} currentSet={currentSet} scene={scene}
                    classInfo={classInfo} setClassInfo={setClassInfo}
                  />
                )
              })
            }
          </div>
        </ReactCusScrollBar>

        <div className='Pagination_wrap'>
          <Pagination size="small" total={statistic.length} showQuickJumper hideOnSinglePage pageSize={999} />
        </div>
      </>
    )
  }, [statistic, currentSet, classInfo, setClassInfo])
  return (
    <div styleName='ClassTable'>

      <Header />
      {Body}

    </div>
  )
}

export default ClassTable
