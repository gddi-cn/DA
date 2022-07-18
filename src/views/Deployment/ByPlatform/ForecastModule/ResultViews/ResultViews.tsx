import { useCallback, useEffect, useState, useRef } from 'react'
import { Empty, Spin } from 'antd';
import api from '@api'
import SlickView from './SlickView'
import { isEmpty, isNil } from 'lodash';
import './ResultViews.module.less'

const ResultViews = (props: any): JSX.Element => {
  const { currentForecast } = props
  const timer = useRef<any>(null)
  const [results, setResults] = useState<any>({})

  const fetchResults = useCallback(
    async () => {
      if (isEmpty(currentForecast) || isNil(currentForecast)) {
        return
      }
      const { app_id, id } = currentForecast
      try {
        const res = await api.get(`/v3/apps/${app_id}/predicts/${id}`)
        if (res.code === 0) {
          console.log(res)
          const { data } = res
          setResults(data)
          if (data.State === 'Success') {
            if (timer.current) {
              clearInterval(timer.current)
            }
          }
        }
      } catch (e) {

      }
    }, [currentForecast]
  )
  useEffect(() => {
    fetchResults()

    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setInterval(fetchResults, 3000)
    return () => {
      clearInterval(timer.current)
    }
  }, [fetchResults])

  const getView = () => {
    if (isEmpty(currentForecast)) {
      return (
        <div className='has_no_any_thing'>
          <Empty description='暂无预测数据，请上传文件' />
        </div>
      )
    }

    if (results.State === 'Success') {
      return (
        <SlickView dataList={results?.results || []} />
      )
    } else {
      return (
        <div className='is_running'>
          <Spin />
          <p>正在预测，请耐心等待结果</p>
        </div>
      )
    }
  }

  return (
    <div styleName='ResultViews'>
      {
        getView()
      }

    </div>
  )
}

export default ResultViews
