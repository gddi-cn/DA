import flvjs from 'flv.js'
import { useEffect, useRef, useState } from 'react'
import FlvJs from 'flv.js/d.ts/flv'
import StepProgress from '../StepProgress'
import type { RawVideoMapTypeItem } from './config'
import { flows, RawVideoMap } from './config'
import './ForceAutoPlayVedio.module.less'

let flvplayer: FlvJs.Player | null = null;

interface Props {
    progress: number
}

const getSrcPosition = (rawMap: RawVideoMapTypeItem[], progress: number): number =>
  rawMap.findIndex((o) => {
    const {weight: [start, end]} = o;
    return progress >= start && progress < end
  })


const ForceAutoPlayVedio = (props: Props): JSX.Element => {
  const { progress } = props

  const isMount = useRef(false)

  const video = useRef<any>(null)

  const currentIndex = useRef<number>(0)

  const currentVideoDuration = useRef<number>(0)

  const [flowsIndex, setFlowsIndex] = useState(0)

  const [flowsProgress, setFlowsProgress] = useState(0)

  const initFlv = (target: RawVideoMapTypeItem) => {
    try {
      const { url } = target || {}

      if (flvplayer) {
        flvplayer.destroy();
        // flvplayer = null;
      }

      flvplayer = flvjs.createPlayer({
        type: 'mp4',
        url,
        // isLive: true,
        // hasAudio: true,
      }, { enableWorker: true });

      flvplayer.attachMediaElement(video.current);

      flvplayer.load();
      flvplayer.pause();
      flvplayer.play()

      flvplayer.on(flvjs.Events.METADATA_ARRIVED, (args: any) => {
        currentVideoDuration.current = args.duration
      });

      flvplayer.on(flvjs.Events.MEDIA_INFO, (_) => {
      });

      flvplayer.on(flvjs.Events.ERROR, (_) => {
        if (flvplayer) {
          flvplayer.pause();
          flvplayer.unload();
          flvplayer.destroy();
          flvplayer = null;
          // createFlv(url, video, setvideoLoading)
        }
      });
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  useEffect(() => {
    // 初始化、拿到sessionMap 、播放第一个

    if (!isMount.current) {
      try {
        const index = getSrcPosition(RawVideoMap, progress)

        if (progress === 0) {
          setFlowsIndex(0)

          const first = RawVideoMap[0]
          first && initFlv(first)
          setFlowsIndex(0)
        } else {
          setFlowsIndex(index)
          setFlowsProgress(progress)
          currentIndex.current = index
          const first = RawVideoMap[index]
          first && initFlv(first)
        }

        isMount.current = true
      } catch (e) {
        // 删除或者其他问题
        console.error(e)
      }
    }
  }, [progress])


  // useEffect(() => {
  //   return () => {

  //   }
  // }, [])

  const handleFuckingEnd = () => {
    // 貌似循环播放的话这个是没啥用

    // 看看后端返回的实际的到了哪里
    const index = getSrcPosition(RawVideoMap, progress)
    if (index > currentIndex.current) {
      currentIndex.current += 1
      const _index = currentIndex.current
      setFlowsIndex(_index)
      const { weight: [, end] } = RawVideoMap[_index]
      setFlowsProgress(end)
      initFlv(RawVideoMap[_index])
    }
    if (index === currentIndex.current) {
      // 重播
      setFlowsProgress(progress)
      initFlv(RawVideoMap[index])
    }
  }

  useEffect(() => {
    handleFuckingEnd()
  }, [progress])

  return (

    <div styleName='ForceAutoPlayVedio'>

      <video muted ref={video} className='video' controls={false} autoPlay={true} onEnded={handleFuckingEnd} />
      <div className='step_wrap'>
        <StepProgress flows={flows} current={flowsIndex} progress={flowsProgress} />
      </div>
    </div>

  )
}

export default ForceAutoPlayVedio
