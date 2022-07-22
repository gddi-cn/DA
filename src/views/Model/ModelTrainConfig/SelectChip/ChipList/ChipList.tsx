
import ChipItem from './ChipItem'
import { ReactCusScrollBar } from '@src/UIComponents'
import './ChipList.module.less'

const ChipList = (props: ModelTrainConfigType.ChipList): JSX.Element => {
  console.log(props, 'ChipList')
  const { chipList, onChange, value } = props

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
