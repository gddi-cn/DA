import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { appListAtom, fetchingAppListAtom, filterAtom, totalAtom } from "../store"
import { selectedAppListAtom } from '../../store'
import appAPI from "@src/apis/app"
import React from "react"

export const useRefreshAppList = () => {
  const filter = useAtomValue(filterAtom)
  const setLoading = useSetAtom(fetchingAppListAtom)
  const setAppList = useSetAtom(appListAtom)
  const setTotal = useSetAtom(totalAtom)

  return async () => {
    if (!filter.device) return
    setLoading(true)
    const { success, data } = await appAPI.list(filter)
    setLoading(false)

    if (!success || !data) {
      setTotal(0)
      setAppList([])
      return
    }

    setTotal(data?.total ?? 0)
    setAppList(data?.items ?? [])
  }
}

export const useList = () => {
  const filter = useAtomValue(filterAtom)
  const refresh = useRefreshAppList()
  const appList = useAtomValue(appListAtom)
  const [selectedAppList, setSelectedAppList] = useAtom(selectedAppListAtom)

  const getSelect = (id: App.Instance['id']) => selectedAppList.some(x => x.id === id)

  const handleSelectChange = (app: App.Instance, selected: boolean) => {
    if (selected && !getSelect(app.id)) {
      setSelectedAppList(pre => [app, ...pre])
    } else {
      setSelectedAppList(pre => pre.filter(x => x.id !== app.id))
    }
  }

  React.useEffect(
    () => {
      refresh()
    },
    [filter]
  )

  return {
    appList,
    getSelect,
    handleSelectChange,
  }
}