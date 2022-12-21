import React from 'react'
import {useAtom} from "jotai";

import orderAPI from "@src/apis/order";
import { orderDetailAtom } from '../store'
import {OrderStatus} from "@src/shared/enum/order";
import {formatUnixDate} from "@src/utils/tools";

import UnderReview from './UnderReview'
import Abort from './Abort'
import Acceptance from './Acceptance'
import Finish from './Finish'
import InProgress from './InProgress'

export const useDetail = () => {
  const [order] = useAtom(orderDetailAtom)

  const { status } = order || {}

  const child: React.ReactNode = React.useMemo(
    () => {
      switch (status) {
        case OrderStatus.NOT_START:
          return <UnderReview />
        case OrderStatus.ABROGATION:
          return <Abort />
        case OrderStatus.ACCEPTANCE:
          return <Acceptance />
        case OrderStatus.FINISHED:
          return <Finish />
        case OrderStatus.IN_PROGRESS:
          return <InProgress />
        case OrderStatus.REWORK:
          return <InProgress />
        default:
          return <></>
      }
    },
    [status]
  )

  return child
}

export const useInProgress = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const [order, setOrder] = useAtom(orderDetailAtom)
  const [total, setTotal] = React.useState<number>(0)
  const [done, setDone] =  React.useState<number>(0)

  const { name, expectTime, id } = order || {}

  const removeTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const syncOrder = async () => {
    if (!id) return

    const { success, data } = await orderAPI.detail(id)

    if (!success || !data) return

    setOrder(data)
  }

  const fetchProgress = async () => {
    if (!id) return

    const { success, data } = await orderAPI.getProgress(id)

    if (!success || !data) return

    const { allCount, completeCount, isTaskCompleted } = data

    setTotal(allCount || 0)
    setDone(completeCount || 0)

    isTaskCompleted && syncOrder()
  }

  React.useEffect(
    () => {
      removeTimer()

      fetchProgress()

      timerRef.current = setInterval(fetchProgress, 60e3)

      return removeTimer
    },
    []
  )


  return {
    name: name || '-',
    expectDate: expectTime ? formatUnixDate(expectTime) : '-',
    total,
    done,
  }
}

export const useAbort = () => {
  const [order] = useAtom(orderDetailAtom)
  const { abortReason } = order || {}

  return {
    reason: abortReason || '未知'
  }
}

export const useFinish = () => {
  const [order] = useAtom(orderDetailAtom)

  const { finishTime, expectTime } = order || {}

  return {
    finishDate: finishTime ? formatUnixDate(finishTime) : '-',
    expectDate: expectTime ? formatUnixDate(expectTime) : '-',
  }
}
