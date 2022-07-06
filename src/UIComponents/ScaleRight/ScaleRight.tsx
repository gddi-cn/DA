
import { ReactComponent as Arrow } from './icon/Arrow.svg'
import { useMemo, useState } from 'react'
import './ScaleRight.module.less'

type Content = React.ReactNode
type Props={
    leftContent?: Content;
    rightContent?: Content;
    afterScale?: ()=>void;
}

const ScaleRight = (props: Props): JSX.Element => {
  const {
    leftContent, rightContent
  } = props

  const [scale, setScale] = useState(false)

  const handleScale = (value:boolean) => {
    setScale(value)
  }

  const getWidth = () => {
    if (scale) {
      return {
        left: {
          width: '0',
          opacity: '0'
        },
        right: 'calc(100% - 55px)'
      }
    }

    return {
      left: {
        width: '33%',
        opacity: '1'
      },
      right: 'calc(100% - 33% - 55px)'
    }
  }

  const { left, right } = getWidth()

  console.log(left, right)

  return (
    <div styleName='ScaleRight'>
      <div className='left_wrap' style={left}>
        {
          useMemo(() => leftContent, [leftContent])
        }
      </div>
      <div className='middle_wrap'>
        {
          scale ? (
            <span className='icon_btn' onClick={() => handleScale(false)}>
              <Arrow className='icon_ratate' />
            </span>
          ) : (
            <span className='icon_btn' onClick={() => handleScale(true)}>
              <Arrow />
            </span>
          )
        }
      </div>
      <div className='right_wrap' style={{ width: right }}>
        {
          useMemo(() => rightContent, [rightContent])
        }
      </div>
    </div>
  )
}

export default ScaleRight
