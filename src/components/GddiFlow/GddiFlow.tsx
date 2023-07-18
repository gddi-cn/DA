import { useCallback, useRef, useMemo } from 'react'
import {
  AppFlow,
  AIAppType,
  Pipeline,
} from 'gddi-app-flow'

import { useDebounceFn } from 'ahooks'
import api from '@api'
import './GddiFlow.module.less'
import modelAPI from '@src/apis/model'

const GddiFlow = (props: any): JSX.Element => {
  const { flowValue, appBaseInfo } = props
  const daisyEntity = useRef<null | AIAppType>(null)
  const daisyEntityTag = useRef<any>(null)
  const { adapter_device, id } = appBaseInfo

  const fetchModelList = ({
    name,
    page,
    page_size,
  }: {
    page: number,
    page_size: number,
    name?: string
  }): Promise<any> => {
    return modelAPI.modelList({ page, page_size, name, appId: id })
  }

  const handleAppLoad = (app: AIAppType) => {
    setTimeout(() => {
      app.fitView()
      app.layoutGraph()
    }, 100);
    daisyEntity.current = app
  }

  const updateFn = async (val: any) => {
    try {
      await api.put(`/v3/apps/${id}`, {
        config: JSON.stringify(val),
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleValueChange = useDebounceFn((val: Pipeline) => {
    updateFn(val)
  }, {
    wait: 500
  })

  return (
    <div styleName='GddiFlow'>
      <div className="AppCanvas_wrap" ref={daisyEntityTag} >
        {
          !flowValue?.moduleDefinitions ? null : (
            <AppFlow
              {...flowValue}
              onLoad={handleAppLoad}
              onValueChange={handleValueChange.run}
              graphEditingDisabled={true}
              propEditingDisabled={false}
              hideDarkModeButton={true}
              fetchModels={fetchModelList}
              version='v1'
              layoutVertically
            />
          )
        }
      </div>
    </div>
  )
}

export default GddiFlow
