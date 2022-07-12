
import ChipItem from './ChipItem'
import { ReactCusScrollBar } from '@src/UIComponents'
import './ChipList.module.less'

const ChipList = (props: ModelTrainConfigType.ChipList): JSX.Element => {
  console.log(props)
  const { chipList, setSelected, selected } = props
  return (
    <div styleName='ChipList'>
      <ReactCusScrollBar autoHide id="scrollableDiv">
        <div className='ChipList_wrap'>
          {
            chipList.map((o, index) => {
              return (
                <ChipItem data={o} key={index} setSelected={setSelected} selected={selected}/>
              )
            })
          }
        </div>
      </ReactCusScrollBar>

    </div>
  )
}

export default ChipList
