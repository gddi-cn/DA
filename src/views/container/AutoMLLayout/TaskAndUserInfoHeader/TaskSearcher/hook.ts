import React from 'react'
import _ from 'lodash'
import { useAtom, useSetAtom } from "jotai"
import { produce } from 'immer'
import { useDispatch } from 'react-redux'

import projectAPI from "@src/apis/project"
import {
  fetchedAllAtom,
  fetchingTaskListAtom,
  modelTypeAtom,
  orderAtom,
  pageAtom,
  PAGE_SIZE,
  sortAtom,
  statusAtom,
  taskListAtom,
  taskNameAtom,
  totalAtom
} from "./store"
import {
  modelTrainStatusBgColorMapping,
  modelTrainStatusColorMapping,
  modelTrainStatusNameMapping
} from '@src/shared/mapping/model'
import { Model } from '@src/shared/enum/model'
import defaultCover from './img/default_cover.png'
import moment from 'moment'
import { sceneNameMapping } from '@src/shared/mapping/dataset'
import { visibleActiveTask } from '@reducer/tasksSilce'
import { DatasetScene } from '@src/shared/enum/dataset'

export const useFetchTaskList = () => {
  const [name] = useAtom(taskNameAtom)
  const [model_type] = useAtom(modelTypeAtom)
  const [sort] = useAtom(sortAtom)
  const [order] = useAtom(orderAtom)
  const [model_status] = useAtom(statusAtom)
  const [page, setPage] = useAtom(pageAtom)

  const [, setTaskList] = useAtom(taskListAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [loading, setLoading] = useAtom(fetchingTaskListAtom)

  return async (loadMore?: boolean) => {
    if (loading) return

    setLoading(true)
    const { success, data } = await projectAPI.list({
      name,
      model_type,
      model_status,
      sort,
      order,
      page: loadMore ? page + 1 : 1,
      page_size: PAGE_SIZE,
      status: undefined,
    })
    loadMore && setPage(p => p + 1)
    setLoading(false)

    if (!success || !data) return

    if (loadMore) {
      data.items && setTaskList(produce(d => { d.push(...data.items) }))
    } else {
      setTaskList(data.items || [])
    }
    setTotal(data.total || 0)
  }
}

const useResetStore = () => {
  const setName = useSetAtom(taskNameAtom)
  const setPage = useSetAtom(pageAtom)
  const setTaskList = useSetAtom(taskListAtom)
  const setTotal = useSetAtom(totalAtom)
  const setModelType = useSetAtom(modelTypeAtom)
  const setSort = useSetAtom(sortAtom)
  const setOrder = useSetAtom(orderAtom)
  const setStatus = useSetAtom(statusAtom)
  const setLoading = useSetAtom(fetchingTaskListAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setPage(1)
      setName('')
      setTotal(0)
      setTaskList([])
      setModelType(undefined)
      setSort('desc')
      setOrder('updated')
      setStatus(undefined)
      setLoading(false)
    },
    []
  )
}

export const useContent = () => {
  const [name] = useAtom(taskNameAtom)
  const [sort] = useAtom(sortAtom)
  const [order] = useAtom(orderAtom)
  const [model_type] = useAtom(modelTypeAtom)
  const [status] = useAtom(statusAtom)
  const fetchTaskList = useFetchTaskList()
  
  useResetStore()

  React.useEffect(
    () => {
      fetchTaskList()
    },
    [name, sort, order, model_type, status]
  )
}

export const useNameFilter = () => {
  const [, setName] = useAtom(taskNameAtom)
  const [localName, setLocalName] = React.useState<string>('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalName(e.target.value || '')
  }

  const debouncedSetName = React.useMemo(() => _.debounce(setName, 400), [])

  React.useEffect(
    () => {
      debouncedSetName(localName)
    },
    [localName]
  )

  return {
    name: localName,
    handleChange,
  }
}

export const useTaskList = () => {
  const [loading] = useAtom(fetchingTaskListAtom)
  const [taskList] = useAtom(taskListAtom)

  return {
    loading,
    taskList,
    empty: !taskList?.length,
  }
}
const getTime = (eta?: number) => {
  if (!eta) {
    return '计算中...'
  }
  if (eta === 0) {
    return '计算中...'
  }
  const ms = eta * 60 * 1000
  const d = moment.duration(ms);
  const h = Math.floor(d.asHours())
  const m = moment.utc(ms).format('m');
  if (h > 0 && +m === 0) {
    return h + ' 小时'
  }

  if (+h === 0) {
    return m + ' 分钟'
  }
  return h + ' 小时 ' + m + ' 分钟'
}

export const useTaskItem = (project: Project.Detail) => {
  const { name, additional, created } = project || {}
  const { eta, status, cover: _cover, platform: _platform, model_type } = additional || {}

  const dispatch = useDispatch()

  const platform =
    (JSON.parse(_platform || JSON.stringify([])) as Array<string>).join(' ') || '--'

  const color = modelTrainStatusColorMapping.get(status || Model.TrainStatus.NOT_START)
  const bgColor = modelTrainStatusBgColorMapping.get(status || Model.TrainStatus.NOT_START)
  
  let statusTip = modelTrainStatusNameMapping.get(status) || '未知'

  if (status === Model.TrainStatus.TRAINING) {
    statusTip += getTime(eta)
  }

  const handleClick = () => {
    dispatch(visibleActiveTask({ data: project }))
  }


  const scene = sceneNameMapping.get(model_type) || '未知'

  const createdTime =
    '开始时间：' +
    (created ? moment(created * 1000).format('YYYY/MM/DD HH:mm') : '--')

  return {
    name,
    platform,
    color,
    bgColor,
    cover: _cover || defaultCover,
    statusTip,
    scene,
    createdTime,
    handleClick,
  }
}

export const useLoadMore = () => {
  const [fetchedAll] = useAtom(fetchedAllAtom)

  const fetchTaskList = useFetchTaskList()

  const handleClick = () => {
    fetchTaskList(true)
  }

  return {
    showBtn: !fetchedAll,
    handleClick,
  }
}

// 'desc' = 1, 'asc' = 2
// created = 4, 'updated' = 8
export const useSorter = () => {
  const [sort, setSort] = useAtom(sortAtom)
  const [order, setOrder] = useAtom(orderAtom)

  const value = React.useMemo(
    () => {
      let value = 0
      if (sort === 'desc')
        value += 1
      if (sort === 'asc')
        value += 2
      if (order === 'created')
        value += 4
      if (order === 'updated')
        value += 8

      return value
    },
    [sort, order]
  )

  const handleChange = (value: number) => {
    let sort: 'desc' | 'asc' = 'desc'
    let order: 'created' | 'updated' = 'updated'

    switch (value) {
      case 5:
        sort = 'desc'
        order = 'created'
        break
      case 6:
        sort = 'asc'
        order = 'created'
        break
      case 9:
        sort = 'desc'
        order = 'updated'
        break
      case 10:
        sort = 'asc'
        order = 'updated'
        break
      default:
        console.error('Invalidated Value.')
        break
    }

    setSort(sort)
    setOrder(order)
  }

  return {
    value,
    handleChange,
  }
}

export const useModelTypeFilter = () => {
  const [modelType, setModelType] = useAtom(modelTypeAtom)

  const handleChange = (value: string) => {
    setModelType(value as DatasetScene)
  }

  return {
    value: modelType,
    handleChange,
  }
}

export const useStatusFilter = () => {
  const [status, setStatus] = useAtom(statusAtom)

  const handleChange = (value: number) => {
    setStatus(value as Model.TrainStatus)
  }

  return {
    value: status,
    handleChange,
  }
}
