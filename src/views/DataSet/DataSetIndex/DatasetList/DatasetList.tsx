
import { ReactCusScrollBar } from '@src/UIComponents'
import { useState, useEffect, useRef, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import AddDataset from '../AddDataset'
import V1DatasetCard from '../V1DatasetCard'
import api from '@api'
import { isNil } from 'lodash';
import { Spin } from 'antd'
import type { Data } from '../V1DatasetCard/V1DatasetCard'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './DatasetList.module.less'

export type FectData = {
  isInit?: boolean,
  callback?: () => void
}

type Params = {
  page?: number,
  page_size?: number,
  scene?: undefined | string,
  is_public: boolean,
  name: undefined | string,
}

type Props = {
  setSelectData: React.Dispatch<any>,
  publicStatus:boolean
}

const DatasetList = (props: Props, ref: any): JSX.Element => {
  const { setSelectData, publicStatus } = props

  const [show, setShow] = useState(false)

  const params = useRef({
    page: 1,
    page_size: 30,
    scene: undefined,
    is_public: false,
    name: undefined
  })
  const [datasetList, setDatasetList] = useState<Array<any>>([])
  const [datasetTotal, setDatasetTotal] = useState(0)

  const [activeId, setActiveId] = useState<string>('')

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  useEffect(() => {
    if (activePipeLine?.APP_DATA_SET_INDEX) {
      setActiveId(activePipeLine?.APP_DATA_SET_INDEX?.id)
      setSelectData(activePipeLine?.APP_DATA_SET_INDEX)
    } else {
      setActiveId('')
      setSelectData({})
    }
  }, [activePipeLine, setSelectData])

  useEffect(() => {
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
        }
        const res = await api.get('/v3/datasets', { params: params.current })
        if (res.code === 0) {
          const { items, total } = res.data

          if (!isNil(items)) {
            setDatasetList([..._datasetList.concat(items)])
          } else {
            setDatasetList([])
          }
          setDatasetTotal(total)
          funcInfo?.callback && funcInfo.callback()
        }
      } catch (e) {

      }
    }, [datasetList]
  )

  const paramsChangeAndFetch = (new_params: Params, fetchdata?: FectData) => {
    params.current = Object.assign(params.current, new_params)
    fetchData(fetchdata)
  }

  useImperativeHandle(ref, () => paramsChangeAndFetch)

  const fetchMoreData = () => {
    params.current.page++;
    fetchData()
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addBtn = useMemo(() => {
    if (publicStatus) {
      return null
    }
    return (
      <AddDataset></AddDataset>
    )
  }, [publicStatus])

  const handleCardClick = useCallback((data: Data) => {
    setActiveId(data.id)
    setSelectData(data)
    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
      APP_DATA_SET_INDEX: data,
      APP_DATASET_DETAIL: { id: data?.id }
    })
  }, [setSelectData, activePipeLine])

  const list = useMemo(() => {
    return datasetList.map((o) => {
      return (
        <V1DatasetCard key={o.id} data={o} fetchData={fetchData} activeId={activeId} handleCardClick={handleCardClick} />
      )
    })
  }, [datasetList, fetchData, activeId, handleCardClick])

  return (
    <div styleName='DatasetList' id='DataSetIndex'>

      <ReactCusScrollBar id="scrollableDiv">
        {
          show
            ? (
              <InfiniteScroll
                dataLength={datasetList.length}
                next={fetchMoreData}
                hasMore={datasetList.length < datasetTotal}
                loader={
                  <div className='loader'>
                    <Spin spinning={true} tip="loading"></Spin>
                  </div>
                }
                scrollableTarget={document.getElementById('scrollableDiv')?.firstChild as any}
              >

                <div className={datasetTotal >= 5 ? 'list_wrap' : 'less_data_list_wrap'}>
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

export default forwardRef(DatasetList)
