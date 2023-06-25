import React from 'react'
import {
  AppFlow,
  AIAppType,
  Pipeline,
  ModuleDefinitions,
} from 'gddi-app-flow-pro'
import appFlowAPI from '@src/apis/appFlow'
import { pipelineAtom } from './store'
import { useSetAtom } from 'jotai'

const useConfig = () => {
  const [version, setVersion] = React.useState<AppFlow.ModuleDefinition.Version['version'] | undefined>(undefined)
  const [moduleDefinitions, setModuleDefinitions] = React.useState<ModuleDefinitions | undefined>(undefined)
  const setPipeline = useSetAtom(pipelineAtom)


  React.useLayoutEffect(
    () => {
      appFlowAPI
        .getDefaultConfig()
        .then(({ success, data }) => {
          if (!success || !data) return
          const { moduleDefinitions, version } = data
          setVersion(version || '')
          setModuleDefinitions(moduleDefinitions || {})
        })
    },
    []
  )

  return {
    version,
    moduleDefinitions,
    handleChange: setPipeline,
  }
}

const Config: React.FC = () => {
  const {
    version,
    moduleDefinitions,
    handleChange,
  } = useConfig()

  return (
    <AppFlow
      moduleDefinitions={moduleDefinitions || {}}
      hideDarkModeButton
      onValueChange={handleChange}
      propEditingDisabled={false}
      graphEditingDisabled={false}
    />
  )
}

export default Config

