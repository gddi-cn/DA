import { useAtom } from 'jotai'
import { falseTypeAtom } from '@views/Model/ModelDetail/TrainSuccess/ErrorAnalysis/store'
import { ModelFalseType } from '@src/shared/enum/model'
import { modelFalseTypeNameMapping } from '@src/shared/mapping/model'
import React from 'react'

export const useHeader = () => {
  const [, setCurrentTab] = useAtom(falseTypeAtom)

  const tabList: Array<{ label: string, primaryKey: string, icon: React.ReactNode}> =
    Object
      .values(ModelFalseType)
      .map(x => ({
        label: modelFalseTypeNameMapping.get(x as ModelFalseType) || '',
        primaryKey: x as string,
        icon: null as React.ReactNode,
      }))

  React.useEffect(
    () => {
      return () => {
        setCurrentTab(ModelFalseType.SCENE)
      }
    },
    []
  )

  return {
    tabList,
    defaultTab: ModelFalseType.SCENE,
    handleTabChange: (key: string) => setCurrentTab(key as ModelFalseType),
  }
}
