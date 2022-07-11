import { FooterBar, GButton } from '@src/UIComponents'
import { useMemo } from 'react'
import FilterHeader from './SelectChip/FilterHeader'
import ChipList from './SelectChip/ChipList'
import './ModelTrainConfig.module.less'

const ModelTrainConfig = (): JSX.Element => {
  const rightContent = useMemo(() => {
    const handleGoback = () => {
    //   navigate({
    //     pathname: APP_DATA_SET_INDEX
    //   })
    }

    const goNext = () => {
    //   navigate({
    //     pathname: APP_MODEL_TRAIN_CONFIG
    //   })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [])
  return (
    <div styleName='ModelTrainConfig'>
      <div className='ModelTrainConfig_wrap'>
        <div className='ModelTrainConfig_wrap_left'>
            123
        </div>
        <div className='ModelTrainConfig_wrap_right'>
          <FilterHeader />
          <ChipList />
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default ModelTrainConfig
