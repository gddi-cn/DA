
import './AuthDocuments.module.less'

const AuthDocuments = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='AuthDocuments'>
      <div className='list_item'>
        <div className='file_name'>XXX芯片</div>
        <a className='down_load'>下载</a>
      </div>
    </div>
  )
}

export default AuthDocuments
