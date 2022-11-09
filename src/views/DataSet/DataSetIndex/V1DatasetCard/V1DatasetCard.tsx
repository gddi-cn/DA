import { Image, Tooltip, Spin } from 'antd'
import datasetDefault from '@src/asset/images/datasetDefault.png'
import { Tag } from '@src/UIComponents'
import { MODEL_TYPES } from '@src/constants'
import { ReactComponent as Lei } from './images/lei.svg'
import { ReactComponent as Zhang } from './images/zhang.svg'
import Operation from './Operation'
import type { FectData } from '../DatasetList/DatasetList'
import './V1DatasetCard.module.less'
import { useState } from 'react'

export type Data = {
  cover: string,
  created: number,
  id: string,
  name: string,
  scene: string,
  status: number,
  summary: string,
  is_public:boolean,
  reason:string,
  train_set: {
    annotation_count: number
    class_count: number
    id: string
    image_count: number
    size: number
  },
  val_set: {
    annotation_count: number
    class_count: number
    id: string
    image_count: number
    size: number
  },
  assess: Record<string, number>,
  updated: number,
  username: string,
}

interface Props<T> {
  data: T,
  fetchData: (info: FectData)=>void,
  activeId:string,
  handleCardClick: (data: Data)=>void
}

function V1DatasetCard<T extends Data> (props: Props<T>): JSX.Element {
  const { data, fetchData, handleCardClick, activeId } = props
  const { cover, name, scene, train_set, summary, status } = data
  const [loading, setLoading] = useState(false)

  const RenderInfoView = () => {
    return (
      <div className='RenderInfoView'>
        <div className='fisrt_row_wrap'>
          <Tooltip title={name || null}>

            {name}
          </Tooltip>
          {/* <span className='dataset_version'>
            {train_set?.tag}
          </span> */}
        </div>
        <div className='second_row_wrap'>
          <div className='num_info_wrap'>
            <Zhang /> <p>{train_set?.image_count || 0}张</p>
          </div>
          <div className='num_info_wrap'>
            <Lei />  <p>{train_set?.class_count || 0}类</p>
          </div>
        </div>
        <div className='third_row_wrap'>
          {/* <Tag text='共享' type='nomal' className='dataset_tag' /> */}
          <Tag text={(MODEL_TYPES as any)[scene] || '未知类型'} type='primary' className='dataset_tag' />
        </div>
      </div>
    )
  }

  const RenderInfoMarks = () => {
    return (
      <div className='RenderInfoMarks'>
        <div className='description'>
          {summary || '暂无描述'}
        </div>
        <Operation setLoading={setLoading} data={data} fetchData={fetchData} />
      </div>
    )
  }

  const getHoverCls = () => {
    if ([2].includes(+status)) {
      return 'has_hover'
    }
  }

  const getFailedView = () => {
    // if (+status === 1) {
    //   // 未验证
    //   return (
    //     <div className='getFailedView do_some_thing_now'>
    //       未验证...
    //     </div>
    //   )
    // }
    if (+status === 1) {
      // 验证中
      return (
        <div className='getFailedView do_some_thing_now'>
          校验中...
        </div>
      )
    }

    if (+status === 3) {
      // 失败
      return (
        <div className='FailedView'>
          <div className='failed_title'>
            创建失败
          </div>
          <div className='failed_info_text'>
            <Tooltip title={data?.reason || null}>

              {data?.reason || '未知原因，请联系客服'}
            </Tooltip>

          </div>
          <div className='oprations'>
            <Operation setLoading={setLoading} data={data} fetchData={fetchData} onlyShowDelete={true} />
          </div>
        </div>
      )
    }
  }

  const hasFailedView = () => {
    if ([1, 3].includes(+status)) {
      return (
        <div className='failed_info'>
          {getFailedView()}
        </div>
      )
    }

    return null
  }

  const handleOnClick = () => {
    if (![2].includes(+status)) {
      return
    }
    handleCardClick(data)
  }
  return (
    <Spin spinning={loading}>
      <div styleName='V1DatasetCard' onClick={handleOnClick} className={data.id === activeId ? 'V1DatasetCard_active' : ''}>
        {hasFailedView()}
        <div className={`success_info ${getHoverCls()}`}>
          <div className='image_wrap'>
            <Image
              preview={false}
              src={cover}
              alt='img'
              fallback={datasetDefault}
            />
          </div>
          <div className='info_wrap'>
            <RenderInfoView />
            <RenderInfoMarks />
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default V1DatasetCard
