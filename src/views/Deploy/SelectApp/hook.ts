import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { appDetailOpenAtom, appListAtom, createAppOpenAtom, currentAppIdAtom, selectedAppAtom } from "../store"
import { currentModelVersionIdAtom } from "@src/store/dataset"

export const useOpenCreateApp = () => {
  const setOpen = useSetAtom(createAppOpenAtom)

  return () => {
    setOpen(true)
  }
}

export const useAppList = () => {
  const appList = useAtomValue(appListAtom)
  const empty = appList.length <= 0
  const [selectedApp, setSelectedApp] = useAtom(selectedAppAtom)
  const setCurrentAppId = useSetAtom(currentAppIdAtom)
  const setOpen = useSetAtom(appDetailOpenAtom)
  const setCreateOpen = useSetAtom(createAppOpenAtom)

  const isSelected = (id: App.Instance['id']) => Boolean(selectedApp && selectedApp.id === id)

  const handleOpenCreate = () => {
    setCreateOpen(true)
  }

  const handleSelectChange = (app: App.Instance) => {
    setSelectedApp(app)
  }

  const handleDetail = (id: App.Instance['id']) => {
    setCurrentAppId(id)

    setTimeout(() => {
      setOpen(true)
    })
  }

  return {
    appList,
    empty,
    isSelected,
    handleSelectChange,
    handleDetail,
    handleOpenCreate,
  }
}

export const useDetail = () => {
  const [open, setOpen] = useAtom(appDetailOpenAtom)
  const [currentAppId, setCurrentAppId] = useAtom(currentAppIdAtom)
  const refreshAppList = useSetAtom(appListAtom)

  const handleClose = () => {
    setOpen(false)
    refreshAppList()
    setTimeout(() => {
      setCurrentAppId(null)
    });
  }

  return {
    open,
    currentAppId,
    handleClose,
  }
}

export const useSelectApp = () => {
  // const appList = [] as App.Instance[]
  const modelVersionId = useAtomValue(currentModelVersionIdAtom)
  const [open, setOpen] = useAtom(createAppOpenAtom)
  const refrshAppList = useSetAtom(appListAtom)

  const handleClose = () => {
    setOpen(false)
    refrshAppList()
  }

  return {
    open,
    modelVersionId,
    handleClose,
  }
}
