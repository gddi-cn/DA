
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import api from '@api'
import { Popover, Input, Skeleton } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MODEL_TYPES, ModelTypes } from '@src/constants'
import './FindModels.module.less'

type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type ModelItemProps={
  data: Record<string, any>
}
const ModelItem = (props:ModelItemProps) => {
  const { data = {} } = props
  const { name, model_type } = data

  // 点击逻辑
  // 首先是添加到任务栏里边、然后去到初始化的数据集页面吧，

  const handleClick = () => {
    console.log(1)
  }
  return (
    <div className='ModelItem' onClick={handleClick}>
      <p>
        {name}
      </p>
      <p>
        {MODEL_TYPES[model_type as keyof ModelTypes] || '未知'}
      </p>
    </div>
  )
}

// interface Model {
//   model_name: undefined | string,
//   page: number,
//   page_size: number
// }

// const a={};

// (a as Model)

type Params ={
  model_name:undefined|string,
  page:number,
  page_size:number
}

const ModelList = () => {
  const [models, setModels] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  const params = useRef<Params>({
    model_name: undefined,
    page: 1,
    page_size: 4,

  })

  const getModelList = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get('/v2/models', { params: params.current })
      if (res.code === 0) {
        const { data } = res
        setModels(data?.items || [])
      }

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }, []
  )

  useEffect(() => {
    getModelList()
  }, [getModelList])

  const modelList = useMemo(() => {
    return models.map((o: any, i: number) => {
      return (
        <ModelItem key={i} data={o} />
      )
    })
  }, [models])

  const getView = () => {
    if (loading) {
      return (
        <Skeleton active />
      )
    }

    return modelList
  }
  return (
    <div className='ModelList'>
      <div className='input_wrap'>
        <div className='icon_wrap'>
          <SearchOutlined />
        </div>
        <Input placeholder='输入模型名称'/>
      </div>

      <div className='list_wrap'>

        {
          getView()
        }
      </div>
    </div>
  )
}

const FindModels = (): JSX.Element => {
  return (
    <div styleName='FindModels'>

      <Popover content={<ModelList />} mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className='FindModels_contents'>
          <DownOutlined />
        </div>
      </Popover>
    </div>
  )
}

export default FindModels
