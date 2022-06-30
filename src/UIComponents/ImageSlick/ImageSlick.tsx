
import SlickContent from './SlickContent'
import ImageDots from './ImageDots'
import './ImageSlick.module.less'
import { useState, useEffect } from 'react'
import { message } from 'antd'
import { isNil } from 'lodash'

// type Record ={
//   [key:string ]:any
// }

type Props ={
  // 查到的数据
  dataList: Array<any>,
  total:number,
  renderView: (data:any) => React.ReactNode,
  renderDotView: (data: any) => React.ReactNode,
  page_size?:number,
  fetchData?: (page:number) => void,
  needCache?:boolean,
  // 这个加不加无所谓吧，网速不好可能会出现问题，毕竟这个是加载数据的
  loadingLock?:boolean
}
const ImageSlick = (props:Props): JSX.Element => {
  const { dataList = [], renderView, renderDotView, fetchData, total, page_size = 10 } = props

  // // 存放看过的数据，其实也就是按查询的一页一页的
  // const dataCache = useRef<Array<Array<Record>>>([])
  // 当前页数
  const [page, setPage] = useState(1)

  // 设置内容List
  const [contenList, SetContentList] = useState<Array<any>>(dataList)

  // 当前被激活的数组下标
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // 有数据进来意味着都是需要最新的
    SetContentList(dataList)
    // 然后保存起来，previous的时候就不去查数据了，不然的话还是要查的，可以用needCache做区分

    // if (needCache) {
    //   // 如果已经存在了，也不用请求了
    //   const len = dataCache.current.length
    //   if (len <= page) {
    //     dataCache.current.push(dataList)
    //   }
    // }
  }, [dataList])

  useEffect(() => {
    // 切换到最后一页搞不好没这个东西的，所以愉快决定是第一个拉
    if (isNil(dataList[activeIndex])) {
      setActiveIndex(0)
    }
  }, [dataList, activeIndex])

  const isStart = () => {
    return page === 1
  }

  const getPreviousPageData = () => {
    if (isStart()) {
      message.warning('已经回到起点')
      return
    }
    const _page = page - 1
    setPage(_page)
    setActiveIndex(page_size - 1)
    // if (needCache) {
    //   const data = dataCache.current[_page]
    //   SetContentList(data)
    // } else {
    //   fetchData && fetchData(_page)
    // }
    fetchData && fetchData(_page)
  }

  const isLast = () => {
    const mut_page = page - 1
    const num = mut_page * page_size + dataList.length
    console.log(num, total)
    return total === num
  }

  const getNextPageData = () => {
    if (isLast()) {
      message.warning('已到世界的尽头')
      return
    }
    const _page = page + 1
    setPage(_page)
    setActiveIndex(0)
    fetchData && fetchData(_page)
  }

  const leftDotClick = () => {
    if (isStart()) {
      message.warning('已经回到起点')
      return
    }
    const _page = page - 1
    setPage(_page)

    // if (needCache) {
    //   const data = dataCache.current[_page]
    //   SetContentList(data)
    // } else {
    //   fetchData && fetchData(_page)
    // }
    fetchData && fetchData(_page)
  }

  const rightDotClick = () => {
    if (isLast()) {
      message.warning('已到世界的尽头')
      return
    }
    const _page = page + 1
    setPage(_page)
    fetchData && fetchData(_page)
  }

  return (
    <div styleName='ImageSlick'>

      <SlickContent
        dataList={contenList}
        renderView={renderView}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        getPreviousPageData={getPreviousPageData}
        getNextPageData={getNextPageData}
      />

      <ImageDots
        dataList={contenList}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        renderDotView={renderDotView}
        leftDotClick={leftDotClick}
        rightDotClick={rightDotClick}
      />
    </div>
  )
}

export default ImageSlick
