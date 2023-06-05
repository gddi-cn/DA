import { isEmpty, chunk } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageSlider, UIDatasetVisual } from '@src/UIComponents'
import { transformModelOutputData } from '../../../utils'
import { Image } from 'antd'
import './SlickView.module.less'
import styled from "styled-components";
import ZoomArea from "@src/components/ZoomArea";

const ImgWrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  object-fit: contain;
  height: 100%;
  width: 100%;
`

const P: React.FC<{src?: string}> = (
  {
    src,
  }
) => {
  const s = src ? src + `?t=${Date.now()}` : undefined

  return (
    <ImgWrap>
      <ZoomArea>
        <Img
          src={s}
        />
      </ZoomArea>
    </ImgWrap>
  )
}

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
    const s = data?.src ? data.src + `?t=${Date.now()}` : undefined
    return (
      <div className='ant-image-warp'>
        <ZoomArea>
          <img src={(s)} />
        </ZoomArea>
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
      <ImageSlider
        needCache={true}
        page={page}
        fetchData={fetchData}
        total={dataList.length}
        dataList={fictitiousList}
        renderView={renderView}
        renderDotView={renderDotView}
      />
    </div>
  )
}

export default SlickView
