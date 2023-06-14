import { useAtomValue } from "jotai"

import { currentUserAtom } from "@src/store/user"

const useGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return '早上好'
  if (hour >= 12 && hour < 13) return '中午好'
  if (hour >= 13 && hour < 18) return '下午好'
  if (hour >= 18 && hour < 24) return '晚上好'
  return '凌晨好'
}

export const useNav = () => {
  const currentUser = useAtomValue(currentUserAtom)
  const greeting = useGreeting()

  return {
    greeting,
    nickname: currentUser?.nick_name || '共达地用户',
    balance: currentUser?.quota || 0,
  }
}
