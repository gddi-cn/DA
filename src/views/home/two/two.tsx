import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@src/controller/reducer/globalSlice'
import { Button } from 'antd'
import './two.module.less'

const Home = (props: any): JSX.Element => {
  console.log(props)
  const disPatch = useDispatch()
  const test = useSelector((state: any) => {
    return state.globalSlice.userInfo.test
  })

  useEffect(() => {
    setTimeout(() => {
      disPatch(getUserInfo({ test: '777' }))
    }, 2000)
  }, [disPatch])

  return (
    <div styleName='home'>

      <div className='test1'>热更新似乎a不是s111很好用asd啊22222222222222222222{test}</div>
      <Button type='primary'>123</Button>
    </div>
  )
}

export default Home
