
import { useState } from 'react'
import './TrainSuccess.module.less'

const TrainSuccess = (props: any): JSX.Element => {
  console.log(props, 1)
  const [tabIndex, setTabIndex] = useState()
  return (
    <div styleName='TrainSuccess'>
      <div className='view_control_wrap'>
        123
      </div>
      <div className='model_info_wrap'>
              123
      </div>
      <div className='model_detail_content'>
              123
      </div>
    </div>
  )
}

export default TrainSuccess
