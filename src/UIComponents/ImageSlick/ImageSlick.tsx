
import { message } from 'antd'
import { isEmpty, isNil } from 'lodash'

import { useMemo, useState, useEffect, useRef } from 'react'
import './ImageSlick.module.less'

// type Record<K extends keyof any, T> ={
//   [P in K ]:T
// }

type Props ={
  dataList: Array<any>,
  total:number,
  fetchData?: () => void,
  renderView: (data:any) => React.ReactNode
}
const ImageSlick = (props:Props): JSX.Element => {
  const { fetchData, dataList, total, renderView } = props

  // 当前被激活的数组下标
  const [activeIndex, setActiveIndex] = useState(0)

  // const real_activeIndex = useDeferredValue(activeIndex);

  const [aniClass, setAniClass] = useState({
    previous: 'pre_view',
    now: 'now_view',
    next: 'next_view',
  })

  // 需要手动配置每个展示什么
  const [dataSource, setDataSource] = useState({
    previous: {},
    now: {},
    next: {},
  })

  const is_first = useRef(false)

  useEffect(() => {
    console.log(dataList)
    if (!isEmpty(dataList) && !isNil(dataList)) {
      if (is_first.current) {
        return
      }
      console.log(dataList)
      console.log('shemn', dataList[activeIndex])
      setDataSource({
        previous: dataList[activeIndex],
        next: dataList[activeIndex + 1],
        now: dataList[activeIndex]
      })
      is_first.current = true
    }
  }, [activeIndex, dataList])

  const handlePrevious = () => {
    // 能不能点击判断
    if (activeIndex === 0) {
      return
    }

    const { previous, next, now } = aniClass
    setAniClass({
      previous: now,
      next: previous,
      now: next
    })
    const { previous: _previous, next: _next, now: _now } = dataSource
    setDataSource({
      previous: _now,
      next: _previous,
      now: _next
    })
    const _activeIndex = activeIndex - 1
    setActiveIndex(_activeIndex)
  }

  const handleNext = () => {
    // 判断是不是到头了？
    if (activeIndex === total - 1) {
      message.warning('已无更多数据')
      return
    }

    if (dataList.length - activeIndex + 1 === 5) {
      fetchData && fetchData()
    }

    const { previous, next, now } = aniClass
    setAniClass({
      previous: next,
      next: now,
      now: previous
    })

    const { previous: _previous, next: _next, now: _now } = dataSource
    setDataSource({
      previous: _next,
      next: dataList[activeIndex + 1],
      now: _previous
    })

    const _activeIndex = activeIndex + 1
    setActiveIndex(_activeIndex)
  }
  console.log(activeIndex, 'activeIndex')

  // 因为加了css动画、所以这个能不刷新就不刷新了吧
  const preView_previous = useMemo(() => {
    return renderView(dataSource.previous)
  }, [dataSource, renderView])

  const preView_now = useMemo(() => {
    return renderView(dataSource.now)
  }, [dataSource, renderView])

  const preView_next = useMemo(() => {
    return renderView(dataSource.next)
  }, [dataSource, renderView])

  return (
    <div styleName='ImageSlick'>

      <div className='content_root'>
        <div className='abs_btn_previous' onClick={handlePrevious}>
          《
        </div>
        <div className='abs_btn_next' onClick={handleNext}>
          》
        </div>
        <div className='content_wrap'>
          <div className={`img_wrap ${aniClass.previous}`}>
            {
              preView_previous
            }
          </div>
          <div className={`img_wrap ${aniClass.now}`}>
            {
              preView_now
            }
          </div>
          <div className={`img_wrap ${aniClass.next}`}>
            {
              preView_next
            }
          </div>
        </div>
      </div>

      <div className='data_list_wrap'>
        <div className='dots_btn_previous' onClick={handlePrevious}>
          左边
        </div>
        <div className='images_dots_list'>
          {
            dataList.map((o:any, index:number) => {
              return (
                <div className='img_dot_btn_wrap' key={index}>
                  <img className='img_dot_btn' src={o?.url} />
                </div>
              )
            })
          }
        </div>
        <div className='dots_btn_next' onClick={handleNext}>
          you边
        </div>
      </div>
    </div>
  )
}

export default ImageSlick
