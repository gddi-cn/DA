import React, { useEffect, useRef, useState } from 'react'
import flvjs from 'flv.js';
// import api from '../../../api'
import { Spin } from 'antd'
import './flvMp4.module.less'

let flvplayer: any = null;
const createFlv = (url: any, video: any, setvideoLoading: any) => {
  flvplayer = flvjs.createPlayer({
    type: 'mp4',
    url,
    // isLive: true,
    hasAudio: true,
  });
  flvplayer.attachMediaElement(video);
  flvplayer.load();
  flvplayer.pause();
  flvplayer.on(flvjs.Events.METADATA_ARRIVED, (args: any) => {
    console.log('METADATA_ARRIVED', args);

    setvideoLoading(false);
  });
  flvplayer.on(flvjs.Events.MEDIA_INFO, (args: any) => {
    console.log(args);
    setvideoLoading(false);
  });

  flvplayer.on(flvjs.Events.ERROR, (args: any) => {
    console.log(args, 'Events.ERROR');
    if (flvplayer) {
      flvplayer.destroy();
      // createFlv(url, video, setvideoLoading)
    }
  });
}
const FlvMp4 = (props: any) => {
  const { src } = props
  const video = useRef<any>(null)

  const [videoLoading, setvideoLoading] = useState<any>(null)
  useEffect(() => {
    setvideoLoading(true);
    createFlv(src, video.current, setvideoLoading)
  }, [video, src])
  return (
    <Spin spinning={videoLoading} tip='正在获取资源'>
      <div className='flvMp4' styleName='flvMp4'>

        <video muted ref={video} className='video' controls autoPlay />
      </div>
    </Spin>
  )
}

export default FlvMp4
