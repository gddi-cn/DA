import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { appListAtom, createAppOpenAtom } from "../store"
import { currentVersionIdAtom } from "@src/components/ModelVersionSelector/store"

export const useOpenCreateApp = () => {
  const setOpen = useSetAtom(createAppOpenAtom)

  return () => {
    setOpen(true)
  }
}

export const useAppList = () => {
  const appList = useAtomValue(appListAtom)
  const empty = appList.length <= 0
  return {
    appList,
    empty,
  }
}

export const useSelectApp = () => {
  // const appList = [] as App.Instance[]
  const modelVersionId = useAtomValue(currentVersionIdAtom)
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