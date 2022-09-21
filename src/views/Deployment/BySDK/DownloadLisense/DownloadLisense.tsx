import { useCallback, useEffect, useState } from 'react'
import api from '@api'
import { message } from 'antd'
import { useSelector } from 'react-redux'

import { RootState } from '@reducer/index'
import LisenceTable from './LisenceTable'
import './DownloadLisense.module.less'

const DownloadLisense = (props: any): JSX.Element => {
  console.log(props)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Array<any>>([])

  const model_id = useSelector((state: RootState) => {
    // return '342463664469155840'
    if (state.tasksSilce.activePipeLine) {
      return state.tasksSilce.activePipeLine.APP_MODEL_TRAIN_DETAIL?.id
    }
    return ''
  })
  const model_iter_id = useSelector((state: RootState) => {
    // return '342463664469155840'
    if (state.tasksSilce.activePipeLine) {
      return state.tasksSilce.activePipeLine.APP_MODEL_TRAIN_DETAIL?.version_id
    }
    return ''
  })

  const fetchLisences = useCallback(
    async () => {
      try {
        setLoading(true)
        const res = await api.get(`/v3/models/${model_id}/versions/${model_iter_id}/license`)
        if (res?.code === 0) {
          setDataSource(res?.data || [])
        } else {
          message.error(res?.message)
        }
        setLoading(false)
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }, [model_id, model_iter_id]
  )

  useEffect(
    () => {
      // init
      fetchLisences()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )
  return (
    <div styleName='DownloadLisense'>
      <LisenceTable loading={loading} dataSource={dataSource} model_id={model_id} model_iter_id={model_iter_id}/>
    </div>
  )
}

export default DownloadLisense
