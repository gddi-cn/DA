// import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import './ClassTable.module.less'

const ClassTable = (): JSX.Element => {
  const Header = () => {
    return (
      <div className='header_wrap'>
        <div>标签封面</div>
        <div>标签名</div>
        <div>标注数</div>
        <div>占比</div>
      </div>
    )
  }

  const BodyItem = () => {
    return (
      <div className='body_item_wrap'>
        <div className='body_item'>1</div>
        <div className='body_item'>2</div>
        <div className='body_item'>3</div>
        <div className='body_item'>4</div>
      </div>
    )
  }
  const Body = () => {
    return (
      <div className='body_wrap'>
        {
          Array.from({ length: 10 }).fill('').map((o, i) => {
            return <BodyItem key={i}/>
          })
        }
      </div>
    )
  }
  return (
    <div styleName='ClassTable'>

      <Header />
      <Body />
      <div className='Pagination_wrap'>
        <Pagination size="small" total={50} showQuickJumper />
      </div>
    </div>
  )
}

export default ClassTable
