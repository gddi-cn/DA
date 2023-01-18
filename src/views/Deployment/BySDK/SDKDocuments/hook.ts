import React from 'react'
import { RootState } from "@src/controller/reducer"
import { useSelector } from "react-redux"
import sdkAPI from '@src/apis/sdk'

export const useDocument = () => {
  const [docList, setDocList] = React.useState<Array<SDK.Document.Instance>>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const model_iter_id = useSelector((state: RootState) =>
    state.tasksSilce.activePipeLine?.APP_MODEL_TRAIN_DETAIL?.version_id
  )

  const fetchDocList = async () => {
    if (loading) return

    setLoading(true)
    const { success,data } = await sdkAPI.documentList({ model_iter_id })
    setLoading(false)

    if (!success || !data) {
      setDocList([])
      return
    }

    setDocList(data || [])
  }

  React.useEffect(
    () => {
      fetchDocList()
      return () => {
        setDocList([])
      }
    },
    []
  )

  return {
    docList,
    noData: !docList.length,
  }
}