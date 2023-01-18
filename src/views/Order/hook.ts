import React from 'react'
import {useAtom} from "jotai";
import {useSelector} from "react-redux";

import { orderDetailAtom } from './store'
import {RootState} from "@reducer";
import orderAPI from "@src/apis/order";

export const useOrder = () => {
  const [, setOrderDetail] = useAtom(orderDetailAtom)

  const { id } = useSelector((state: RootState) =>
    state.tasksSilce?.activeTaskInfo?.worker_order || { id: undefined }
  )

  // fetch order detail
  React.useEffect(
    () => {
      if (!id) return

      orderAPI
        .detail(id)
        .then(({ success, data }) => {
          if (!success || !data) return setOrderDetail(null)

          setOrderDetail(data)
        })
    },
    [id]
  )
}