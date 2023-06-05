import { useCallback, useRef, useMemo } from 'react'
import {
  AppFlow,
  AIAppType,
  Pipeline,
} from 'gddi-app-flow-pro'

import { useDebounceFn } from 'ahooks'
import api from '@api'
import { isNil } from 'lodash'
import './GddiFlow.module.less'

const GddiFlow = (props: any): JSX.Element => {
  const { flowValue, appBaseInfo } = props
  const daisyEntity = useRef<null | AIAppType>(null)
  const daisyEntityTag = useRef<any>(null)
  const { adapter_device, id } = appBaseInfo

  const fetchModelList = useCallback(
    (
      pageOffset: number,
      pageSize: number,
      queryModelName: string
    ): Promise<any> => new Promise((resolve, reject) => {
        (
          async () => {
            try {
              const res = await api.get('/v2/model/list', {
                params: {
                  page: pageOffset,
                  page_size: pageSize,
                  adapter_device: adapter_device,
                  appId: id,
                  name: queryModelName
                }
              })
              if (res.code === 0) {
                const { items } = res.data
                if (isNil(items)) {
                  resolve({
                    models: [],
                    totalCnt: res.data.total
                  })
                } else {
                  const _temp = items.map((o: any) => {
                    o.mod_created_at = new Date(o.mod_created_at * 1000)
                    return o
                  })
                  console.log(_temp, '_temp_temp_temp')
                  resolve({
                    models: _temp,
                    totalCnt: res.data.total
                  })
                }
              } else {
                reject(res)
              }
            } catch (e) {
              console.log(e)
              reject(e)
            }
          }
        )()
      }
    ),
    [adapter_device, id]
  )

  const handleAppLoad = useCallback((app: AIAppType) => {
    app.fitView()
    app.layoutGraph()
    daisyEntity.current = app
  }, [])

  const updateFn = async (val:any) => {
    try {
      await api.put(`/v3/apps/${id}`, {
        config: JSON.stringify(val),
      })
    } catch (e) {
      console.error(e)
    }
  }

  // 这个东西改变的应该比较高频率

  const handleValueChange = useDebounceFn((val: Pipeline) => {
    updateFn(val)
  }, {
    wait: 500
  })

  const Flow = useMemo(() => {
    try {
      return (
        <AppFlow
          {...flowValue}
          onLoad={handleAppLoad}
          onValueChange={handleValueChange.run}
          graphEditingDisabled={true}
          propEditingDisabled={false}
          hideDarkModeButton={true}
          fetchModelList={fetchModelList}
        />
      )
    } catch (e) {
      console.log(e)
    }
  }, [fetchModelList, flowValue, handleAppLoad, handleValueChange.run])

  return (
    <div styleName='GddiFlow' >
      <div className="AppCanvas_wrap" ref={daisyEntityTag} >
        {Flow}
      </div>
    </div>
  )
}

export default GddiFlow
