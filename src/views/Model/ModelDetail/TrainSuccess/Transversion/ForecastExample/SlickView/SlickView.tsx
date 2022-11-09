import { isEmpty, chunk } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageSlider, UIDatasetVisual } from '@src/UIComponents'
import { transformModelOutputData } from '../../../utils'
import { Image } from 'antd'
import './SlickView.module.less'

const RenderView = (props: any) => {
  const { data, scenes } = props
  const datainfo = transformModelOutputData({ data: data.value, modelType: scenes })

  if (isEmpty(datainfo)) {
    return null
  }
  const {

    dataSet,

  } = datainfo
  // 这里不能让react复用、我猜是离屏canvas导致的缓存问题~
  if (scenes === 'keypoints_based_action') {
    return (
      <div className='ant-image-warp'>
        <Image src={(data.src as any)} />
      </div>

    )
  }
  return (
    <UIDatasetVisual
      key={Math.random().toString(36).slice(2)}
      url={data.src}
      zoom={true}
      canvasData={dataSet || []}
      drawCanvasData={scenes === 'detection' || scenes === 'monocular_3d_detection'}
      hasHtmlTips={scenes === 'classify'}
    />
  )
}

const RenderDotView = (props: any) => {
  const { data } = props
  const view = useMemo(() => {
    console.log(data, 44)
    return (
      <img className='img_dot_btn' src={data?.src} />
    )
  }, [data])
  return view
}

const SlickView = (props: any): JSX.Element => {
  const page = useRef(1)
  const { dataList, versionInfo } = props

  const { model_type } = versionInfo
  const chunkList = useRef(chunk(dataList, 10))
  const [fictitiousList, setFictitiousList] = useState<any[]>([])

  useEffect(() => {
    setFictitiousList(chunkList.current[page.current - 1])
  }, [dataList])

  const fetchData = () => {
    setFictitiousList(chunkList.current[page.current - 1])
  }
  const renderView = (data: any) => {
    console.log(data, 'data')
    if (!data) {
      return null
    }
    return (
      <RenderView data={data} scenes={model_type} />
    )
  }

  const renderDotView = (o: any) => {
    return (
      <RenderDotView data={o}/>
    )
  }
  return (
    <div styleName='SlickView'>
      <ImageSlider needCache={true} page={page} fetchData={fetchData} total={dataList.length} dataList={fictitiousList} renderView={renderView} renderDotView={renderDotView} />
    </div>
  )
}

export default SlickView
