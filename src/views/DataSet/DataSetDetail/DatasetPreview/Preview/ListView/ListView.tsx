import { ReactCusScrollBar } from '@src/UIComponents'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd'
import { isNil } from 'lodash'
import ListItem from './ListItem'
import api from '@api'
import './ListView.module.less'

export type FectData = {
  isInit?: boolean,
  callback?: () => void
}

type Props = {
  scenes: string,
  classInfo: any,
  currentId: any,
  id: string
}

const ListView = (props: Props): JSX.Element => {
  const { currentId, scenes, classInfo, id } = props

  const { name } = classInfo || {}
  const [show, setShow] = useState(false)

  const params = useRef({
    page: 1,
    page_size: 50,
    scene: undefined
  })
  //   const [datasetList, setDatasetList] = useState<Array<any>>([])
  const [datasetTotal, setDatasetTotal] = useState(0)
  const datasetList = useRef<Array<any>>([])
  const [dataListLen, setDataListLen] = useState(0)

  const lastId = useRef<string>('')

  useEffect(() => {
    // 弱智组件，你TM为啥要在init的时候获取target啊？
    setShow(true)
  }, [])

  const fetchData = useCallback(
    async (funcInfo?: FectData) => {
      if (!currentId) {
        return
      }
      if (!name) {
        return
      }
      try {
        let _datasetList = [...datasetList.current]
        if (funcInfo?.isInit || (lastId.current !== currentId)) {
          // 初始化

          const scrollRef = document.getElementById('scrollableDiv')?.firstChild as any
          if (scrollRef) {
            scrollRef?.scrollTo({
              top: 0,
              // behavior: 'smooth'
            })
          }
          _datasetList = []
          params.current.page = 1
        }
        lastId.current = currentId
        const res = await api.get(`/v3/datasets/${id}/sub-datasets/${currentId}/images`, { params: { ...params.current, class: name } })
        if (res.code === 0) {
          const { items, total } = res.data

          if (!isNil(items)) {
            datasetList.current = [..._datasetList.concat(items)]
          }
          setDataListLen(datasetList.current.length)
          setDatasetTotal(total)
          funcInfo?.callback && funcInfo.callback()
        } else {

        }
      } catch (e) {

      }
    }, [currentId, id, name]
  )

  useEffect(() => {
    fetchData({ isInit: true })
    // const fn = () => {
    //   fetchData({ isInit: true })
    // }
    // window.addEventListener('resize', fn)
    // return () => {
    //   window.removeEventListener('resize', fn)
    // }
  }, [fetchData])

  const fetchMoreData = () => {
    params.current.page++;
    fetchData()
  }

  const list = useMemo(() => {
    if (dataListLen === 0 || datasetTotal === 0) {
      return null
    }
    return (
      datasetList.current.map((o) => {
        return (
          <ListItem key={o.hash + '-' + currentId} data={o} scenes={scenes} />
        )
      })
    )
  }, [dataListLen, datasetTotal, scenes, currentId])

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
