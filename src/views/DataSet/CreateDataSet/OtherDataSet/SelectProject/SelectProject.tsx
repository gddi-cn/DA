
import './SelectProject.module.less'

type Props = {
    initPageInfo: any,
    setCurrentStep: any,
    thirdInfo: any,
    setThirdInfo: any
}
const SelectProject = (props: Props): JSX.Element => {
  console.log(props)
  const { initPageInfo, thirdInfo } = props

  return (
    <div styleName='SelectProject'>
      <div className='SelectProject_wrap'>
        <div className='party_name'>
          {initPageInfo?.name}
        </div>
        <div className='user_id_wrap'>
            账号：{thirdInfo?.user_open_id || '--'}
        </div>
      </div>
    </div>
  )
}

export default SelectProject
