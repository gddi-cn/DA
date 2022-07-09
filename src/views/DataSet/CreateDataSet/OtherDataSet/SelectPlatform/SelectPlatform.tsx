
import PlatSelect from './PlatSelect'
import './SelectPlatform.module.less'

const SelectPlatform = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='SelectPlatform'>
      <div className='SelectPlatform_wrap'>
        <PlatSelect />
      </div>
    </div>
  )
}

export default SelectPlatform
