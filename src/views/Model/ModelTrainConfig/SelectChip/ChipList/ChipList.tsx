
import ChipItem from './ChipItem'
import { ReactCusScrollBar } from '@src/UIComponents'
import './ChipList.module.less'
import { useEffect } from 'react'
import { isEmpty, isNil } from 'lodash'

const ChipList = (props: ModelTrainConfigType.ChipList): JSX.Element => {
  console.log(props, 'ChipList')
  const { chipList, onChange, value } = props
  useEffect(() => {
    if (isNil(value)) {
      if (!isEmpty(chipList)) {
        onChange(chipList[0])
      }
    }
  }, [chipList, onChange, value])

  const handleSelect = (data:any) => {
    onChange(data)
  }
  return (
    <div styleName='ChipList'>
      <ReactCusScrollBar autoHide id="scrollableDiv">
        <div className='ChipList_wrap'>
          {
            chipList.map((o, index) => {
              return (
                <ChipItem data={o} key={index} setSelected={handleSelect} selected={value}/>
              )
            })
          }
        </div>
      </ReactCusScrollBar>

    </div>
  )
}

export default ChipList
