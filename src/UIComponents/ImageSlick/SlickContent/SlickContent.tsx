import { useMemo, useState, useEffect, useCallback } from 'react'
// import { message } from 'antd'
import type { SetStateAction, Dispatch } from 'react'
import { isEmpty, isNil } from 'lodash'
import { ReactComponent as BlueL } from '../icon/blue_left.svg'
import { ReactComponent as BlueR } from '../icon/blue_right.svg'

import './SlickContent.module.less'

type Record = {
  [key: string]: any
}

type Props = {
  // 某一页
  dataList: Array<any>,
  renderView: (data: any) => React.ReactNode,
  activeIndex: number,
  setActiveIndex: Dispatch<SetStateAction<number>>,
  getPreviousPageData: () => void,
  getNextPageData: () => void,
}
const SlickContent = (props: Props): JSX.Element => {
  const { dataList, renderView, setActiveIndex, activeIndex, getNextPageData, getPreviousPageData } = props

  const [aniClass, setAniClass] = useState<Record>({
    previous: 'pre_view',
    now: 'now_view',
    next: 'next_view',
  })

  // 需要手动配置每个展示什么
  const [dataSource, setDataSource] = useState<Record>({
    previous: {},
    now: {},
    next: {},
  })

  // 为了有点动画效果、这么做也能接受吧
  const updateContent = useCallback(
    (_newClass: Record, _activeIndex: number, _newDtaSource: Record, key: string) => {
      if (_newClass[key] === 'pre_view') {
        _newDtaSource[key] = dataList[_activeIndex - 1]
      } else if (_newClass[key] === 'now_view') {
        _newDtaSource[key] = dataList[_activeIndex]
      } else {
        _newDtaSource[key] = dataList[_activeIndex + 1]
      }
    }, [dataList]
  )

  const updateSlick = useCallback(
    (_newClass: Record, _activeIndex: number) => {
      const _newDtaSource: Record = {}

      updateContent(_newClass, _activeIndex, _newDtaSource, 'previous')
      updateContent(_newClass, _activeIndex, _newDtaSource, 'next')
      updateContent(_newClass, _activeIndex, _newDtaSource, 'now')

      setDataSource(_newDtaSource)
    }, [updateContent]
  )

  useEffect(() => {
    if (!isEmpty(dataList) && !isNil(dataList)) {
      updateSlick(aniClass, activeIndex)
    }
  }, [activeIndex, aniClass, dataList, updateSlick])

  const handlePrevious = () => {
    // 能不能点击判断
    if (activeIndex === 0) {
      getPreviousPageData()
      return
    }

    const { previous, next, now } = aniClass

    const _newClass = {
      previous: now,
      next: previous,
      now: next
    }
    setAniClass(_newClass)

    const _activeIndex = activeIndex - 1
    updateSlick(_newClass, _activeIndex)
    setActiveIndex(_activeIndex)
  }

  const handleNext = () => {
    // 判断是不是到头了？
    if (activeIndex === dataList.length - 1) {
      getNextPageData()
      return
    }

    const { previous, next, now } = aniClass
    const _newClass = {
      previous: next,
      next: now,
      now: previous
    }
    setAniClass(_newClass)

    const _activeIndex = activeIndex + 1
    updateSlick(_newClass, _activeIndex)
    setActiveIndex(_activeIndex)
  }

  // 因为加了css动画、所以这个能不刷新就不刷新了吧
  const preView_previous = useMemo(() => {
    if (!dataSource.previous) {
      return null
    }
    return renderView(dataSource.previous)
  }, [dataSource, renderView])

  const preView_now = useMemo(() => {
    if (!dataSource.now) {
      return null
    }
    return renderView(dataSource.now)
  }, [dataSource, renderView])

  const preView_next = useMemo(() => {
    if (!dataSource.next) {
      return null
    }
    return renderView(dataSource.next)
  }, [dataSource, renderView])

  // const handlePrevent = (evt:MouseEvent<HTMLDivElement>) => {
  //   evt.preventDefault()
  //   evt.stopPropagation()
  // }

  return (
    <div className='content_root' styleName='SlickContent'>
      <div className='abs_btn_previous' onClick={handlePrevious}>
        <BlueL />
      </div>
      <div className='abs_btn_next' onClick={handleNext}>
        <BlueR />
      </div>
      <div className='content_wrap' >
        <div className={`img_wrap ${aniClass.previous}`} >
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
  )
}

export default SlickContent
