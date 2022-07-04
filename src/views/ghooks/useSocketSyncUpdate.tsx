import { useEffect } from 'react'

// 全局的sokcet更新
export const useSocketSyncUpdate = () => {
  console.log('1')
  useEffect(() => {
    // 这个是socket变换的，切换taskitem就重新链接一个socket
  }, [])

  useEffect(() => {
  // 监听当前active task info，变化了就都发回去，也不管啥的
  // 变化可能是某个页面数据变了，也可能页面变了，反正都是要发送的，但是怎么判断这个东西变了还是要研究研究
  }, [])

  useEffect(() => {
    // 接受更新
    // 如果页面不同、就navigate到页面
  }, [])
}
