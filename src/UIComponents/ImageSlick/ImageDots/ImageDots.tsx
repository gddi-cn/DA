
import { SetStateAction, Dispatch } from 'react'
import { ReactComponent as Left } from '../icon/lfet.svg'
import { ReactComponent as Right } from '../icon/right.svg'
import './ImageDots.module.less'

// type Record = {
//     [key: string]: any
// }

type Props = {
  // 某一页
  dataList: Array<any>,
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>,
  renderDotView: (data: any, active_index: number, index:number) => React.ReactNode,

  leftDotClick: () => void,
  rightDotClick: () => void,
}

const ImageDots = (props: Props): JSX.Element => {
  const { dataList, activeIndex, renderDotView, setActiveIndex, rightDotClick, leftDotClick } = props

  const getCls = (index: number) => {
    if (activeIndex === index) {
      return 'img_dot_btn_wrap img_dot_btn_wrap_active'
    }

    return 'img_dot_btn_wrap'
  }

  const handleDotsClick = (index:number) => {
    setActiveIndex(index)
  }

  const handleGetNextPage = () => {
    rightDotClick()
  }

  const handleGetPrevious = () => {
    leftDotClick()
  }

  return (
    <div styleName='ImageDots' className='data_list_wrap'>
      <div className='dots_btn_previous' onClick={handleGetPrevious}>
        <Left/>
      </div>
      <div className='images_dots_list'>
        {
          dataList.map((o: any, index: number) => {
            return (

              <div className={getCls(index)} key={index} onClick={() => handleDotsClick(index)}>

                {renderDotView(o, activeIndex, index)}

              </div>

            )
          })
        }
      </div>
      <div className='dots_btn_next' onClick={handleGetNextPage}>
        <Right />
      </div>
    </div>
  )
}

export default ImageDots
