
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
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
        left: '0',
        right: 'calc(100% - 18px)'
      }
    }

    return {
      left: 'calc((100% - 18px) /2)',
      right: 'calc((100% - 18px) /2)'
    }
  }

  const { left, right } = getWidth()

  console.log(left, right)

  return (
    <div styleName='ScaleRight'>
      <div className='left_wrap' style={{ width: left }}>
        {
          useMemo(() => leftContent, [leftContent])
        }
      </div>
      <div className='middle_wrap'>
        {
          scale ? (
            <span className='icon_btn' onClick={() => handleScale(false)}>
              <RightOutlined />
            </span>
          ) : (
            <span className='icon_btn' onClick={() => handleScale(true)}>
              <LeftOutlined />
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
