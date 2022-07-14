// import { ReactComponent as Date } from './icon/date.svg'
import { useState, useRef, useCallback, useEffect } from 'react'
import { chunk, isEmpty } from 'lodash'

import api from '@api'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { transformModelOutputData } from '../../utils'
import { ImageSlider, UIDatasetVisual } from '@src/UIComponents'
import FlvMp4 from '../FlvMp4'
import { DatePicker } from 'antd'

import './ForecastResult.module.less'
import moment from 'moment'

const RenderView = (props: any) => {
  const { data, scenes } = props
  const datainfo = transformModelOutputData({ data: data.result, modelType: scenes })

  if (isEmpty(datainfo)) {
    return null
  }
  const {

    dataSet,

  } = datainfo
  // 这里不能让react复用、我猜是离屏canvas导致的缓存问题~
  return (
    <UIDatasetVisual
      key={Math.random().toString(36).slice(2)}
      url={data.url}
      zoom={true}
      canvasData={dataSet || []}
      drawCanvasData={scenes === 'detection' || scenes === 'monocular_3d_detection'}
      hasHtmlTips={scenes === 'classify'}
    />
  )
}

const ForecastResult = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const { model_type } = versionInfo
  const [fictitiousList, setFictitiousList] = useState<any[]>([])
  const [chunkList, setChunkList] = useState<Array<any>>([])
  const [total, settotal] = useState(0)

  const params = useRef({

    begin: undefined,
    end: undefined
  })
  const page = useRef(1)

  const fetchData = useCallback(
    async () => {
      try {
        const res = await api.get(`/v3/models/${versionInfo.id}/versions/${versionInfo.iter.id}/inference`, { params: { ...params.current, page: page.current } })
        if (res.code === 0) {
          const list = res.data
          settotal(list.length)
          const _list = chunk(list, 10)
          setChunkList(_list)

          setFictitiousList(_list[page.current - 1])
        } else {

        }
      } catch (e) {

      }
    }, [versionInfo]
  )

  useEffect(() => {
    fetchData()
    // const fn = () => {
    //   fetchData({ isInit: true })
    // }
    // window.addEventListener('resize', fn)
    // return () => {
    //   window.removeEventListener('resize', fn)
    // }
  }, [fetchData])

  const fetchList = () => {
    setFictitiousList(chunkList[page.current - 1])
  }

  const renderView = (data: any) => {
    if (!data) {
      return null
    }
    const { url } = data
    const isVideo = /\.mp4$/.test(url)

    const getView = () => {
      if (isVideo) {
        return <FlvMp4 src={(url as any)} />
      } else {
        return <RenderView data={data} scenes={model_type} />
      }
    }
    return (
      <div className='ForecastResult_item_werap'>
        <div className='canvas_wrap'>
          {getView()}
        </div>
        <div className='info_wrap'>
          <p className='thres'>阈值 : {data.thres}</p>
          <p>创建时间 : {moment(data.created * 1000).format('YYYY/MM/DD hh:mm:ss')}</p>
        </div>
      </div>
    )
  }

  const renderDotView = (data: any, activeIndex:any, index:any) => {
    const active = activeIndex === index
    return (
      <div className='ForecastResult_renderDotView'>
        {
          active ? (
            <div className='ForecastResult_renderDotView_tips'>
              <div>阈值:{data.thres}</div>
              <div>预测时间:</div>
              <div>{moment(data.created * 1000).format('YYYY/MM/DD hh:mm:ss')}</div>
            </div>
          ) : null
        }

        <img className='img_dot_btn' src={data?.url} />
      </div>
    )
  }
  return (
    <div styleName='ForecastResult'>
      <div className='ForecastResult_header'>
        <DatePicker placement='bottomRight' />
      </div>
      <div className='ForecastResult_content'>
        <ImageSlider needCache={true} page={page} fetchData={fetchList} total={total} dataList={fictitiousList} renderView={renderView} renderDotView={renderDotView} />
      </div>
    </div>
  )
}

export default ForecastResult
