// import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import api from '@api'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty, isNil } from 'lodash';
import { ReactCusScrollBar } from '@src/UIComponents'
import type { Dispatch, SetStateAction } from 'react'
import './ClassTable.module.less'

type Props = {
  version: any,
  whichSet: string,
  setClassInfo: Dispatch<SetStateAction<any>>,
  classInfo: any,
  currentSet:any
}

type ItemProps<T> = {
  data: T, currentSet: any,
  setClassInfo: Dispatch<SetStateAction<any>>,
  classInfo: any,
}

type DataItem = {
  cover?: string,
  class_name?: string,
  annotation_count?: number,
  class_id:number
}
function BodyItem<T extends DataItem> (props: ItemProps<T>) {
  const { data, currentSet, classInfo, setClassInfo } = props

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
    if (classInfo?.class_id === data?.class_id) {
      return 'body_item_wrap body_item_wrap_active'
    }
    return 'body_item_wrap'
  }

  return (
    <div className={getCls()} onClick={handleClick}>
      <div className='body_item'>
        <img alt='gddi_img' src={data?.cover} className='label_cover' />
      </div>
      <div className='body_item'>{data?.class_name}</div>
      <div className='body_item'>{data?.annotation_count}</div>
      <div className='body_item'>{getPercent()}</div>
    </div>
  )
}

const ClassTable = (props: Props): JSX.Element => {
  const { version, whichSet, currentSet, classInfo, setClassInfo } = props

  const [statistic, setStatistic] = useState<any>({})

  // const lastwhichSet = useRef(whichSet)

  // 统计信息、标签之类的
  const fetStatistics = useCallback(
    async () => {
      try {
        if (isNil(version?.id)) {
          return
        }
        const res = await api.get(`/v2/sub-datasets/${version[whichSet]}/statistics`, {
          params: {
            page: 1, page_size: 999
          }
        })

        if (res.code === 0) {
          setStatistic(res.data || {})
          if (res.data.items) {
            setClassInfo(res.data.items[0])
          }
        }
      } catch (e) {

      }
    }, [version, whichSet, setClassInfo]
  )
  useEffect(() => {
    fetStatistics()
  }, [fetStatistics])

  const Header = () => {
    return (
      <div className='header_wrap'>
        <div>标签封面</div>
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
    const { total, items } = statistic
    // (items as Array<any>)
    return (
      <>
        <ReactCusScrollBar id='body_wrap'>
          <div className='body_wrap'>
            {
              (items as Array<any>)?.map((o, i) => {
                return <BodyItem key={i} data={o} currentSet={currentSet} classInfo={classInfo} setClassInfo={setClassInfo} />
              })
            }
          </div>
        </ReactCusScrollBar>

        <div className='Pagination_wrap'>
          <Pagination size="small" total={total} showQuickJumper hideOnSinglePage pageSize={999} />
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
