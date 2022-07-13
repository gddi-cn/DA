import { isEmpty, chunk } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ImageSlider, UIDatasetVisual } from '@src/UIComponents'
import { transformModelOutputData } from '../../../utils'
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
    console.log(1)
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
      <img className='img_dot_btn' src={o?.src} />
    )
  }
  return (
    <div styleName='SlickView'>
      <ImageSlider needCache={true} page={page} fetchData={fetchData} total={dataList.length} dataList={fictitiousList} renderView={renderView} renderDotView={renderDotView} />
    </div>
  )
}

export default SlickView
