import datasetAPI from "@src/apis/dataset";
import { Dataset } from "@src/shared/types/dataset";
import React from "react";

export const useImportHistory = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    handleClose,
  }
}

export const useList = (id: Dataset['id']) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [dataList, setDataList] = React.useState<Array<Dataset.Import.History.Instance>>([])

  React.useEffect(
    () => {
      if(!id || loading) return

      setLoading(true)
      datasetAPI.importHistory(id, {})
        .then(({ success, data }) => {
          if (!success || !data) return

          setDataList(data || [])
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [id]
  )

  return {
    dataList,
    empty: !dataList.length
  }
}
