import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import {
  deviceCurrentTabAtom,
  sortAtom,
  sortByAtom,
  useResetStore,
} from './store'

import { DeviceType } from '@src/shared/enum/device'


export const useDevice = () => {
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const [currentTab, setCurrentTab] = useAtom(deviceCurrentTabAtom)
  const setSortBy = useSetAtom(sortByAtom)
  const setSort = useSetAtom(sortAtom)

  const showTerminal = currentTab === DeviceType.TERMINAL
  const showEdge = currentTab === DeviceType.EDGE
  useResetStore()

  const handleTabChange = (key: string) => {
    setCurrentTab(key as DeviceType.TERMINAL | DeviceType.EDGE)
    setSortBy('registered_time')
    setSort('desc')
  }

  React.useEffect(
    () => {
      const $c = contentRef.current
      if (!$c) return

      if (currentTab === DeviceType.TERMINAL) {
        $c.setAttribute('terminal', '')
      } else {
        $c.removeAttribute('terminal')
      }
    },
    [currentTab]
  )

  return {
    contentRef,
    showTerminal,
    showEdge,
    handleTabChange,
  }
}
