import React from 'react'
import { Link } from 'react-router-dom'
import { APP_HOME } from '../../router'
import './test.module.less'

const Test = (props:any):JSX.Element => {
  console.log(props)
  return (
    <div styleName='test'>
      <Link
        to={APP_HOME}
      >
        <span>Test</span>
      </Link>
      <div className='test1'>热更新似乎不是很好用啊</div>
    </div>
  )
}

export default Test
