
import { ReactCusScrollBar } from '@src/UIComponents'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import AddDataset from '../AddDataset'
import V1DatasetCard from '../V1DatasetCard'
import api from '@api'
import './DatasetList.module.less'
import { isNil } from 'lodash';

export type FectData = {
  isInit?: boolean,
  callback?:()=>void
}

const DatasetList = (): JSX.Element => {
  const [show, setShow] = useState(false)
  const isFirstLoading = useRef(true)
  const params = useRef({
    page: 1,
    page_size: 30,
    scene: undefined
  })
  const [datasetList, setDatasetList] = useState<Array<any>>([])
  const [datasetTotal, setDatasetTotal] = useState(0)

  useEffect(() => {
    isFirstLoading.current = false
    // 弱智组件，你TM为啥要在init的时候获取target啊？
    setShow(true)
  }, [])

  const fetchData = useCallback(
    async (funcInfo?: FectData) => {
      try {
        let _datasetList = [...datasetList]
        if (funcInfo) {
          // 初始化
          const { isInit } = funcInfo
          if (isInit) {
            _datasetList = []
            params.current.page = 1
          }
        }
        const res = await api.get('/v2/datasets', { params: params.current })
        if (res.code === 0) {
          const { items, total } = res.data

          if (!isNil(items)) {
            setDatasetList([..._datasetList.concat(items)])
          }
          setDatasetTotal(total)
          funcInfo?.callback && funcInfo.callback()
        }
      } catch (e) {

      }
    }, [datasetList]
  )

  const fetchMoreData = () => {
    params.current.page++;
    fetchData()
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addBtn = useMemo(() => {
    return (
      <AddDataset></AddDataset>
    )
  }, [])

  const list = useMemo(() => {
    return datasetList.map((o, i) => {
      return (
        <V1DatasetCard key={i} data={o} fetchData={fetchData} />
      )
    })
  }, [datasetList, fetchData])

  return (
    <div styleName='DatasetList'>

      <ReactCusScrollBar id="scrollableDiv">
        {
          show
            ? (
              <InfiniteScroll
                dataLength={datasetList.length}
                next={fetchMoreData}
                hasMore={datasetList.length < datasetTotal}
                loader={null}
                scrollableTarget={document.getElementById('scrollableDiv')?.firstChild as any}
              >

                <div className='list_wrap'>
                  <>
                    {
                      addBtn
                    }
                  </>
                  <>
                    {
                      list
                    }
                  </>

                </div>
              </InfiniteScroll>
            ) : null
        }

      </ReactCusScrollBar>

    </div>
  )
}

export default DatasetList
