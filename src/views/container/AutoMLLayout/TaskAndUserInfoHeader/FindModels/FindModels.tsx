
import { DownOutlined } from '@ant-design/icons'
import api from '@api'
import { Popover, Skeleton } from 'antd'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { GIconInput, ReactCusScrollBar } from '@src/UIComponents'
import TaskItemDetail from '../TaskList/common/TaskItemDetail'
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'
import { visibleActiveTask } from '@reducer/tasksSilce'
// import { MODEL_TYPES, ModelTypes } from '@src/constants'
import './FindModels.module.less'

const ModelList = () => {
  const [models, setModels] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  const [modelName, setModelName] = useState<string|undefined>()

  const dispatch = useDispatch()

  const deferName = useDeferredValue(modelName)

  const getModelList = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get('/v3/projects', {
        params: {
          name: deferName,
          sort: 'desc',
          page_size: 10,
          status: 2
        }
      })
      if (res.code === 0) {
        const { data } = res
        setModels(data?.items || [])
      }

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }, [deferName]
  )

  useEffect(() => {
    getModelList()
  }, [getModelList])

  const modelList = useMemo(() => {
    const handleAddActiveTask = (data:any) => {
      console.log(1)
      dispatch(visibleActiveTask({ data }))
    }
    return models.map((o: any, i: number) => {
      return (
        <div className='modelList_item' key={i} onClick={() => handleAddActiveTask(o)}>
          <TaskItemDetail rawData={o} />
        </div>

      )
    })
  }, [models, dispatch])

  const getView = () => {
    if (loading) {
      return (
        <Skeleton active />
      )
    }

    if (isEmpty(modelList)) {
      return (
        <div className='has_no_data'>
          暂无数据
        </div>
      )
    }

    return modelList
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change:', e.target.value);

    setModelName(e.target.value)
  };
  return (
    <div className='ModelList'>
      <div className='ModelList_input_wrap'>
        <GIconInput placeholder='搜索模型名称' onChange={handleInputChange}/>
      </div>

      <div className='list_wrap'>
        <ReactCusScrollBar id='ModelList'>
          {
            getView()
          }
        </ReactCusScrollBar>

      </div>
    </div>
  )
}

const FindModels = (): JSX.Element => {
  return (
    <div styleName='FindModels'>

      <Popover content={<ModelList />} trigger={['click']} destroyTooltipOnHide mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className='FindModels_contents'>
          <DownOutlined className='icon'/>
        </div>
      </Popover>
    </div>
  )
}

export default FindModels
