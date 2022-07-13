
import ModelDetailType from '../../types'
import './VerticalTabHandle.module.less'

const VerticalTabHandle = (props: ModelDetailType.VerticalTabHandleProps): JSX.Element => {
  const { tabIndex, setTabIndex } = props
  const Title = (title:string) => {
    return (
      <div className='title'>{title}</div>
    )
  }
  const handleClick = (primaryKey: ModelDetailType.TabIndex) => {
    console.log(primaryKey)
    setTabIndex(primaryKey)
  }

  const getCls = (primaryKey: ModelDetailType.TabIndex) => {
    if (tabIndex === primaryKey) {
      return 'tab_item tab_item_active'
    }

    return 'tab_item'
  }

  const TabItem = (text: string, primaryKey: ModelDetailType.TabIndex) => {
    return (
      <div onClick={() => handleClick(primaryKey)} className={getCls(primaryKey)}>
        {text}
      </div>
    )
  }
  return (
    <div styleName='VerticalTabHandle'>
      <div className='VerticalTabHandle_block'>
        {
          Title('训练过程')
        }
        {
          TabItem('训练过程', 'train_process')
        }
      </div>
      <div className='VerticalTabHandle_block'>
        {
          Title('模型评估')
        }
        {
          TabItem('模型预测 ', 'model_forecast')
        }
        {
          TabItem('模型对比', 'model_contrast')
        }
        {
          TabItem('错误分析', 'error_analysis')
        }
      </div>

    </div>
  )
}

export default VerticalTabHandle
