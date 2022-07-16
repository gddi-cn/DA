import { ReactCusScrollBar } from '@src/UIComponents'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd'
import ListItem from './ListItem'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { chunk } from 'lodash'
import './ListView.module.less'

export type FectData = {
    isInit?: boolean,
    callback?: () => void
}

type Props={
    bboxList:any[]
}
const ListView = (props: Props): JSX.Element => {
  const { bboxList } = props
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const [show, setShow] = useState(false)

  const page = useRef(1)
  //   const [datasetList, setDatasetList] = useState<Array<any>>([])
  const [datasetTotal, setDatasetTotal] = useState(0)
  const datasetList = useRef<Array<any>>([])
  const [updateList, setUpdateList] = useState<Array<any>>([])
  const chunkList = useRef<any[]>([])

  useEffect(() => {
    // 弱智组件，你TM为啥要在init的时候获取target啊？

    setShow(true)
  }, [])

  const fetchData = useCallback(
    async (funcInfo?: FectData) => {
      try {
        let _datasetList = [...datasetList.current]
        if (funcInfo) {
          // 初始化
          const { isInit } = funcInfo
          if (isInit) {
            const scrollRef = document.getElementById('scrollableDiv')?.firstChild as any
            if (scrollRef) {
              scrollRef?.scrollTo({
                top: 0,
                // behavior: 'smooth'
              })
            }
            _datasetList = []
            page.current = 1
          }
        }
        const list = [..._datasetList.concat(chunkList.current[page.current - 1])].filter(Boolean)
        datasetList.current = list
        setUpdateList(list)
      } catch (e) {
        console.log(e)
      }
    }, []
  )
  useEffect(() => {
    if (bboxList) {
      chunkList.current = chunk(bboxList, 50)

      setDatasetTotal(bboxList.length)
      fetchData({ isInit: true })
    }

    // const fn = () => {
    //   fetchData({ isInit: true })
    // }
    // window.addEventListener('resize', fn)
    // return () => {
    //   window.removeEventListener('resize', fn)
    // }
  }, [fetchData, bboxList])

  const fetchMoreData = () => {
    page.current++;
    fetchData()
  }
  const list = useMemo(() => {
    return updateList.map((o, i) => {
      return (
        <ListItem data={o} key={i} model_type={versionInfo.model_type} />
      )
    })
  }, [updateList, versionInfo])
  return (
    <div styleName='ListView'>
      <ReactCusScrollBar id="scrollableDiv">
        {
          show
            ? (
              <InfiniteScroll
                dataLength={datasetList.current.length}
                next={fetchMoreData}
                hasMore={datasetList.current.length < datasetTotal}
                loader={
                  <div className='loader'>
                    <Spin spinning={true} tip="loading"></Spin>
                  </div>
                }
                scrollableTarget={document.getElementById('scrollableDiv')?.firstChild as any}
              >

                <div className='dataset_list_wrap'>

                  {
                    list
                  }

                </div>
              </InfiniteScroll>
            ) : null
        }

      </ReactCusScrollBar>
    </div>
  )
}

export default ListView
