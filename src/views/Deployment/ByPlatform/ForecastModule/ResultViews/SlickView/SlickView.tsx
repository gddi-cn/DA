import { chunk } from 'lodash'
import { Image } from 'antd';
// import { TransitionAnimation } from '@src/UIComponents'
import { VideoCameraOutlined } from '@ant-design/icons'
// import FlvMp4 from '@src/views/Model/ModelDetail/TrainSuccess/ModelForecast/FlvMp4'
import { useEffect, useRef, useState } from 'react'
import { ImageSlider, FlvMp4 } from '@src/UIComponents'
import './SlickView.module.less'

const RenderView = (props: any) => {
  const { data } = props
  if (/\.mp4$/g.test(data)) {
    return (
      <div key={data} className='RenderView'>
        <FlvMp4 src={data} />
      </div>
    )
  }
  if (data === '') {
    return null
  }
  return (
    <div key={data} className='RenderView'>
      <Image
        src={data}
        preview={false}
      />

    </div>
  )
}

const SlickView = (props: any): JSX.Element => {
  const page = useRef(1)
  const { dataList = [] } = props

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
      <RenderView data={data} />
    )
  }

  const renderDotView = (data: any) => {
    if (/\.mp4$/g.test(data)) {
      return (

        <VideoCameraOutlined className='img_dot_btn' />
      )
    }
    if (data === '') {
      return null
    }
    return (
      <img className='img_dot_btn' src={data} />
    )
  }
  return (
    <div styleName='SlickView'>
      <ImageSlider needCache={true} page={page} fetchData={fetchData} total={dataList.length} dataList={fictitiousList} renderView={renderView} renderDotView={renderDotView} />
    </div>
  )
}

export default SlickView
