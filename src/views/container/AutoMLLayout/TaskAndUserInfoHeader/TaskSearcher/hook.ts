import React from 'react'
import _ from 'lodash'
import { useAtom } from "jotai"
import { produce } from 'immer'
import { useDispatch } from 'react-redux'

import projectAPI from "@src/apis/project"
import {
    fetchedAllAtom,
  fetchingTaskListAtom,
  pageAtom,
  PAGE_SIZE,
  taskListAtom,
  taskNameAtom,
  totalAtom
} from "./store"
import { modelTrainStatusBgColorMapping, modelTrainStatusColorMapping, modelTrainStatusNameMapping } from '@src/shared/mapping/model'
import { Model } from '@src/shared/enum/model'
import defaultCover from './img/default_cover.png'
import moment from 'moment'
import { sceneNameMapping } from '@src/shared/mapping/dataset'
import { visibleActiveTask } from '@reducer/tasksSilce'

export const useFetchTaskList = () => {
  const [name] = useAtom(taskNameAtom)
  const [page, setPage] = useAtom(pageAtom)

  const [, setTaskList] = useAtom(taskListAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [loading, setLoading] = useAtom(fetchingTaskListAtom)

  return async (loadMore?: boolean) => {
    if (loading) return

    setLoading(true)
    const { success, data } = await projectAPI.list({
      name,
      page: loadMore ? page + 1 : 1,
      page_size: PAGE_SIZE,
      status: undefined,
      sort: 'desc',
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
  const [, setName] = useAtom(taskNameAtom)
  const [, setPage] = useAtom(pageAtom)
  const [, setTaskList] = useAtom(taskListAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [, setLoading] = useAtom(fetchingTaskListAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setPage(1)
      setName('')
      setTotal(0)
      setTaskList([])
      setLoading(false)
    },
    []
  )
}

export const useContent = () => {
  const [name] = useAtom(taskNameAtom)
  const fetchTaskList = useFetchTaskList()
  
  useResetStore()

  React.useEffect(
    () => {
      fetchTaskList()
    },
    [name]
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

