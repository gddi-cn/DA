
import './TabContent.module.less'

type Props = {
   children:React.ReactNode
}

// const colors={

// }
const TabContent = (props: Props): JSX.Element => {
  const { children } = props
  return (
    <div styleName='TabContent'>
      {children}
    </div>
  )
}

export default TabContent
