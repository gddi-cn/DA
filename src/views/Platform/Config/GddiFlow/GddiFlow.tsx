import { useCallback, useRef, useMemo } from 'react'
import {
  AppCanvas,
  // ModuleDefinitions,
  AIAppType,
  Pipeline,

//   Module,
//   Connection,
} from 'gddi-app-canvas'

import { useDebounceFn } from 'ahooks'
// import { modDef1, pipeline1 } from './data'
// import Qs from 'qs'
import api from '@api'
// import { useLocation } from 'react-router-dom'

// import { useSelector } from 'react-redux'
import { isNil } from 'lodash'
import './GddiFlow.module.less'

const GddiFlow = (props: any): JSX.Element => {
  const { flowValue, appBaseInfo } = props
  // const location = useLocation()
  // const { search } = location
  // const { appId } = Qs.parse(search.substring(1))
  const daisyEntity = useRef<null | AIAppType>(null)
  const daisyEntityTag = useRef<any>(null)
  const { adapter_device, id } = appBaseInfo
  // const adapter_device = useSelector((state: any) => {
  //   return state.ApplicationDetailSlice.baseInfo.adapter_device
  // })

  // const appId = useSelector((state: any) => {
  //   return state.ApplicationDetailSlice.baseInfo.id
  // })

  const fetchModelList = useCallback(
    (
      pageOffset: number,
      pageSize: number,
      queryModelName: string
    ): Promise<any> => {
      console.log(pageOffset, pageSize)
      // models: ModelRes[];
      // totalCnt: number;
      return new Promise((resolve, reject) => {
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
      })
    }
    , [adapter_device, id])

  // const fetchLabelList = useCallback(
  //   (mod_result_id: string|number): Promise<any> => {
  //     console.log(mod_result_id, 'mod_result_id')
  //     return new Promise((resolve, reject) => {
  //       (
  //         async () => {
  //           try {
  //             const res = await api.get('/v2/model/labels', { result_id: mod_result_id, appId })
  //             if (res.code === 0) {
  //               resolve(res.data)
  //             } else {
  //               reject(res)
  //             }
  //           } catch (e) {
  //             console.log(e)
  //             reject(e)
  //           }
  //         }
  //       )()
  //     })
  //   },
  //   [appId]
  // )

  const handleAppLoad = useCallback((app: AIAppType) => {
    app.fitView()
    app.layoutGraph()
    console.log('app loaded', app)
    daisyEntity.current = app
  }, [])

  const updateFn = async (val:any) => {
    try {
      const res: any = await api.put(`/v3/apps/${id}`, {
        config: JSON.stringify(val),
        // name: '123'
      })
      console.log(res)
    } catch (e) {

    }
  }

  // 这个东西改变的应该比较高频率

  const handleValueChange = useDebounceFn((val: Pipeline) => {
    // todo 实时保存？
    console.log(val, 145)
    updateFn(val)
  }, {
    wait: 500
  })

  // const handleReset = () => {
  //   console.log('reset')
  //   daisyEntity.current?.resetModuleProps()
  // }

  // const handleClear = () => {
  //   console.log('reset')
  //   daisyEntity.current?.clear()
  // }

  const Flow = useMemo(() => {
    try {
      return (
        <AppCanvas

          // defaultValue={pipeline1 as Pipeline}
          // moduleDefinitions={modDef1 as ModuleDefinitions}
          {...flowValue}
          onLoad={handleAppLoad}
          onValueChange={handleValueChange.run}
          graphEditingDisabled={true}
          propEditingDisabled={false}
          hideDarkModeButton={true}
          fetchModelList={fetchModelList}
          // fetchLabelList={fetchLabelList}
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
