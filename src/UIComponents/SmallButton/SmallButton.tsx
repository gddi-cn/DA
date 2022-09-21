import type { MouseEvent } from 'react'
import './SmallButton.module.less'

type Props = {
  type: 'nomal' | 'delete' | 'primary',
  children: React.ReactNode,
  onClick?: (e: MouseEvent<HTMLDivElement>) => void,
  className?: string,
  disabled?: boolean
}

const SmallButton = (props: Props): JSX.Element => {
  const { children, type, onClick, className, disabled } = props
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onClick && onClick(e)
    }
  }

  const getCls = () => {
    let clsText = `SmallButton_btn ${type}`
    if (disabled) {
      clsText = clsText + ' ' + 'SmallButton_disabled'
    }
    return clsText
  }
  return (
    <span styleName='SmallButton' onClick={handleClick} className={className}>
      <span className={getCls()}>
        {children}
      </span>
    </span>
  )
}

export default SmallButton
