import type { MouseEvent } from 'react'
import './SmallButton.module.less'

type Props ={
    type:'nomal'|'delete'|'primary',
    children:React.ReactNode,
    onClick?: (e:MouseEvent<HTMLDivElement>)=> void,
    className?:string
}

const SmallButton = (props: Props): JSX.Element => {
  const { children, type, onClick, className } = props
  return (
    <span styleName='SmallButton' onClick={onClick} className={className}>
      <span className={`SmallButton_btn ${type}`}>
        {children}
      </span>
    </span>
  )
}

export default SmallButton
