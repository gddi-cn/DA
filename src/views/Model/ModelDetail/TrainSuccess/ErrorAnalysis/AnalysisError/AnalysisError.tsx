import TopErrorList from '../TopErrorList'
import './AnalysisError.module.less'

const AnalysisError = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='AnalysisError'>
      <TopErrorList />
      <div className='SencesError_wrap'>
              123
      </div>
    </div>
  )
}

export default AnalysisError
