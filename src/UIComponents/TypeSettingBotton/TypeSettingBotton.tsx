
import { useState } from 'react'
import { ReactComponent as Grid } from './icon/grid.svg'
import { ReactComponent as Slick } from './icon/slick.svg'
import './TypeSettingBotton.module.less'

type Props={
  onChange:(key:string)=>void
}

const TypeSettingBotton = (props: Props): JSX.Element => {
  const { onChange } = props
  const [activeKey, setActiveKey] = useState('grid')
  const handleClick = (key:string) => {
    onChange(key)
    setActiveKey(key)
  }

  const getCls = (key:string) => {
    if (activeKey === key) {
      return 'TypeSettingBotton_btn TypeSettingBotton_btn_atv'
    }
    return 'TypeSettingBotton_btn'
  }
  return (
    <div styleName='TypeSettingBotton'>
      <div className={getCls('grid')} onClick={() => handleClick('grid')}>
        <Grid />
      </div>
      <div className={getCls('slick')} onClick={() => handleClick('slick')}>
        <Slick />
      </div>
    </div>
  )
}

export default TypeSettingBotton
