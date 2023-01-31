import { useAtom } from 'jotai'
import { consumeTypeAtom, fetchingAtom, pageAtom, pageSizeAtom, totalAtom, usageListAtom } from './store'
import userAPI from '@src/apis/user'
import React from 'react'
import { User } from '@src/shared/enum/user'
import { formatUnixTime } from '@src/utils/tools'
import { consumeTypeNameMapping } from '@src/shared/mapping/user'

const useRefreshConsume = () => {
  const [consume_type] = useAtom(consumeTypeAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [page_size] = useAtom(pageSizeAtom)
  const [loading, setLoading] = useAtom(fetchingAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [, setUsageList] = useAtom(usageListAtom)

  return async (firstPage?: boolean) => {
    if (loading) return

    setLoading(true)
    firstPage && setPage(1)

    const { success, data } = await userAPI.consumes({
      page: firstPage ? 1 : page,
      page_size,
      consume_type,
    })

    setLoading(false)

    if (!success || !data) {
      setTotal(0)
      setUsageList([])
      return
    }

    setTotal(data.total || 0)
    setUsageList(data.items || [])
  }
}

const useResetStore = () => {
  const [, setConsumeType] = useAtom(consumeTypeAtom)
  const [, setPage] = useAtom(pageAtom)
  const [, setPageSize] = useAtom(pageSizeAtom)
  const [, setLoading] = useAtom(fetchingAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [, setUsageList] = useAtom(usageListAtom)

  return () => {
    setLoading(true)
    setConsumeType(User.Consume.Type.ALL)
    setPage(1)
    setPageSize(10)
    setTotal(0)
    setUsageList([])
    setLoading(false)
  }
}

export const useUsage = () => {
  const [consume_type] = useAtom(consumeTypeAtom)
  const [page] = useAtom(pageAtom)
  const [page_size] = useAtom(pageSizeAtom)

  const refresh = useRefreshConsume()
  const resetStore = useResetStore()

  React.useEffect(
    () => {
      refresh(true)
    },
    [consume_type, page_size]
  )

  React.useEffect(
    () => {
      refresh()
    },
    [page]
  )

  React.useEffect(() => resetStore, [])
}

export const useFilter = () => {
  const [type, setType] = useAtom(consumeTypeAtom)

  const handleChange = (newType: any) => {
    setType(newType as User.Consume.Type)
  }

  return {
    type,
    handleChange,
  }
}

const getConsume = (type: User.Consume.Type, amount: number) => {
  amount = amount || 0

  if (type === User.Consume.Type.CALCULATE) {
    return `${(amount / 60).toFixed(1)} 小时`
  }

  if (type === User.Consume.Type.AUTH) {
    return  `${amount} 个`
  }

  return '-'
}

export const useList = () => {
  const [total] = useAtom(totalAtom)
  const [dataList] = useAtom(usageListAtom)
  const [loading] = useAtom(fetchingAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [pageSize, setPageSize] = useAtom(pageSizeAtom)

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const usageList = dataList.map(data => ({
    id: data.id,
    created: data.created ? formatUnixTime(data.created) : '-',
    type: data.consume_type ? consumeTypeNameMapping.get(data.consume_type) || '-' : '-',
    value: getConsume(data.consume_type, data.amount),
  }))

  return {
    usageList,
    total,
    loading,
    page,
    pageSize,
    handlePaginationChange,
    showNoData: !dataList.length
  }
}
