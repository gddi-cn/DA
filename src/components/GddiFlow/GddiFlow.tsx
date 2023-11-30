import { useCallback, useRef, useMemo } from 'react'

import { useDebounceFn } from 'ahooks'
import api from '@api'
import './GddiFlow.module.less'
import modelAPI from '@src/apis/model'
// import AppBuilder from 'app-builder'
import AppBuilder, { Flow, ModuleDefinition } from "gddi-app-builder"

const GddiFlow = (props: any): JSX.Element => {
  const { flowValue, appBaseInfo } = props
  console.log({ appBaseInfo })
  const { defaultValue, moduleDefinitions } = flowValue || {}
  const daisyEntityTag = useRef<any>(null)
  const { adapter_device, id } = appBaseInfo

  const fetchModelList = (
    page: number,
    page_size: number,
    name?: string,
  ): Promise<{ items: Array<any>, total: number }> => {
    return modelAPI.modelList({ page, page_size, name, appId: id })
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

  const handleValueChange = useDebounceFn((val: Flow) => {
    updateFn(val)
  }, {
    wait: 500
  })

  return (
    <div styleName='GddiFlow'>
      <div className="AppCanvas_wrap" ref={daisyEntityTag} >
        {/*{*/}
        {/*  !flowValue?.moduleDefinitions ? null : (*/}
        {/*    <AppFlow*/}
        {/*      {...flowValue}*/}
        {/*      onLoad={handleAppLoad}*/}
        {/*      onValueChange={handleValueChange.run}*/}
        {/*      graphEditingDisabled={true}*/}
        {/*      propEditingDisabled={false}*/}
        {/*      hideDarkModeButton={true}*/}
        {/*      fetchModels={fetchModelList}*/}
        {/*      version='v1'*/}
        {/*      layoutVertically*/}
        {/*    />*/}
        {/*  )*/}
        {/*}*/}
        {
          !flowValue?.moduleDefinitions ? null : (
            <AppBuilder
              defaultFlow={defaultValue}
              modules={moduleDefinitions || {}}
              nodeAndEdgeDisabled
              getModelList={fetchModelList}
              version='v3'
              onFlowChange={handleValueChange.run}
            />
          )
        }
      </div>
    </div>
  )
}

export default GddiFlow
