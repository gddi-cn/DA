import React from 'react'
import { useAtom } from "jotai"
import { ModuleDefinition, Flow } from 'gddi-app-builder'

import { AppDetail } from "../enums"
import { appAtom, currentPageAtom } from "../store"
import http from '@src/utils/http'
import { useRefresh } from '../hook'

export const useConfig = () => {
  const [currentApp] = useAtom(appAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const [defaultValue, setDefaultValue] = React.useState<Flow>({} as Flow)
  const [init, setInit] = React.useState<boolean>(false)
  const [moduleDefinitions, setModuleDefinitions] =
    React.useState<ModuleDefinition>({} as ModuleDefinition)

  const { config_url, id, adapter_device } = currentApp || {}

  const refresh = useRefresh()

  const fetchConfig = async () => {
    try {
      if (!id || !config_url) {
        setDefaultValue({} as Flow)
        setModuleDefinitions({} as ModuleDefinition)
        return
      }

      const defaultValue = await http.get(config_url)

      if (!defaultValue?.version) {
        setDefaultValue({} as Flow)
        setModuleDefinitions({} as ModuleDefinition)
        return
      }

      const { data } = await http.get(`/v3/moduleDefinitions/${defaultValue.version}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (!data?.url) {
        setDefaultValue({} as Flow)
        setModuleDefinitions({} as ModuleDefinition)
        return
      }

      const moduleDefinitions = await http.get(data.url)

      if (!moduleDefinitions) {
        setDefaultValue({} as Flow)
        setModuleDefinitions({} as ModuleDefinition)
        return
      }

      setDefaultValue(defaultValue || {} as Flow)
      setModuleDefinitions(moduleDefinitions || {} as ModuleDefinition)
    } catch (e) {
      console.error(e)
    }

  }

  React.useEffect(
    () => {
      fetchConfig()
      .then(() => setTimeout(() => {
        setInit(true)
      }))
    },
    [id, config_url]
  )

  React.useEffect(
    () => {
      return () => {
        id && refresh(id)
        setModuleDefinitions({})
        setInit(false)
        setDefaultValue({} as Flow)
      }
    },
    []
  )


  const handleBack = () => {
    setCurrentPage(AppDetail.Page.INFO)
  }

  return {
    init,
    handleBack,
    flowValue: {
      defaultValue,
      moduleDefinitions,
    },
    appBaseInfo: {
      id,
      adapter_device,
    }
  }
}
