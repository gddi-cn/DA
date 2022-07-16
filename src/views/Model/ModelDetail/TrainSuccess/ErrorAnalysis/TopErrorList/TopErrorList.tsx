import { ReactCusScrollBar, ModelOpreationTitle } from '@src/UIComponents'
import { isEmpty } from 'lodash'
import './TopErrorList.module.less'

const TopErrorList = (props:any): JSX.Element => {
  const { dataList = [], selectError, titleText } = props

  const getColorBar = (data:any) => {
    const getColor = () => {
      if (isEmpty(dataList)) {
        return 'transparent'
      }

      const { value } = dataList[0]

      const apha = data.value / value

      return apha
    }
    return (
      <div className='getColorBar' style={{ backgroundColor: `rgba(8,80,130,${getColor()})` }}></div>
    )
  }

  return (
    <div styleName='TopErrorList'>
      <div className='title'>
        为提高模型准确率，请按照错误指示补充相关数据后进行版本迭代
      </div>
      <div className='error_list'>
        <ReactCusScrollBar id='ReactCusScrollBar'>
          <div className='TopErrorList_list_wrap'>

            <div className='TopErrorList_list'>
              <ModelOpreationTitle text={titleText || `TOP${dataList.length} 识别错误的标签`}></ModelOpreationTitle>
              <div className='list'>
                {
                  dataList.map((o:any, i:any) => {
                    return (
                      <div key={i} className='error_item' onClick={() => selectError(o?.data)} >
                        {getColorBar(o)}
                        {o.label}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </ReactCusScrollBar>
      </div>
    </div>
  )
}

export default TopErrorList
