import { Dialog } from '@mui/material'
import { AppDetail } from '@src/components/AppDetail/enums'
import { SecondaryBtn } from '@src/components/Btn'
import CreateApp from '@src/components/CreateApp/CreateApp'
import { useSetAtom } from 'jotai'
import React from 'react'
import { useRefreshAppList } from '../List/hook'
import { currentAppIdAtom, defaultPageAtom, detailOpenAtom } from '../store'

const useCreate = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const refresh = useRefreshAppList()
  const setDetaailOpen = useSetAtom(detailOpenAtom)
  const setDefailtpage = useSetAtom(defaultPageAtom)
  const setCurrentApp = useSetAtom(currentAppIdAtom)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onCreate = (app: App.Instance) => {
    refresh()
    setOpen(false)
    setDefailtpage(AppDetail.Page.CONFIG)
    setCurrentApp(app.id)
    setTimeout(() => setDetaailOpen(true))
  }

  return {
    open,
    handleOpen,
    handleClose,
    onCreate,
  }
}

const Create: React.FC = () => {
  const {
    open,
    handleOpen,
    handleClose,
    onCreate,
  } = useCreate()

  return (
    <>
      <SecondaryBtn onClick={handleOpen}>
        创建应用
      </SecondaryBtn>
      <CreateApp
        open={open}
        onCancel={handleClose}
        onCreate={onCreate}
      />
    </>
  )
}

export default Create
