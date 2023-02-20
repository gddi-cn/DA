import { formatUnixTime } from "@src/utils/tools"
import { useAtom } from "jotai"
import React from "react"
import { AppDetail } from "../enums"
import { currentPageAtom, currentRecordAtom } from "../store"

const setSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.setAttribute('selected', '')
}

const removeSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.removeAttribute('selected')
}

export const useDeploy = () => {
  const [deploy, setDeploy] = useAtom(currentRecordAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const allRef = React.useRef<HTMLDivElement | null>(null)
  const successRef = React.useRef<HTMLDivElement | null>(null)
  const pendingRef = React.useRef<HTMLDivElement | null>(null)
  const failRef = React.useRef<HTMLDivElement | null>(null)
  const [currentState, setCurrentState] =
    React.useState<Sync.Instance['sync_state'] | 'All'>('All')

  const {
    create_time,
    total,
    pending_count,
    success_count,
    failed_count,
    devices,
  } = deploy || {}

  const handleClose = () => {
    setCurrentPage(AppDetail.Page.INFO)
  }

  const handleClick = (state: Sync.Instance['sync_state'] | 'All') => {
    if (state === currentState) return
    setCurrentState(state)
  }

  React.useEffect(
    () => {
      switch(currentState) {
        case 'All':
          setSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Done':
          removeSelected(allRef)
          setSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'InProgress':
          removeSelected(allRef)
          removeSelected(successRef)
          setSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Failure':
          removeSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          setSelected(failRef)
          break
        default:
          break
      }
    },
    [currentState]
  )

  React.useEffect(
    () => {
      return () => {
        setDeploy(undefined)
      }
    },
    []
  )


  const deviceList = React.useMemo(() => {
    if (currentState === 'All') return devices || []

    return (devices || []).filter(d =>
      d.sync_state === (currentState as Sync.Instance['sync_state'])
    )
  }, [currentState])

  return {
    handleClose,
    created: create_time ? formatUnixTime(create_time) : '--',
    total,
    pending_count,
    success_count,
    failed_count,
    allRef,
    successRef,
    pendingRef,
    failRef,
    handleClick,
    deviceList,
  }
}
