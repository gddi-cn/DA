import Scrollbars from 'react-custom-scrollbars'
import type { ScrollbarProps } from 'react-custom-scrollbars'
import { useMemo, useState } from 'react'
import type { UIEvent } from 'react'
import './ReactCusScrollBar.module.less'

interface Props extends ScrollbarProps {
    children?: React.ReactNode,
    id:string
}

const ReactScrollBar: any = Scrollbars

function useScrollTop (): [number, { onScroll: (e: UIEvent<HTMLDivElement>)=>void}] {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = (event: UIEvent<HTMLDivElement>) => setScrollTop(event?.currentTarget?.scrollTop);
  return [scrollTop, { onScroll }];
}

const ReactCusScrollBar = (props: Props): JSX.Element => {
  const { children, id, ...rest } = props
  const [scrollTop, scrollProps] = useScrollTop();
  const Memo = useMemo(() => children, [children])

  return (
    <div styleName='ReactCusScrollBar'>
      <ReactScrollBar

        renderView={() => {
          return (
            <div className='ReactScrollBar_cus_render_view'>

            </div>
          )
        }}
        id={id}
        {...rest}
        autoHide
        {...scrollProps}
        style={{
          boxShadowTop: scrollTop > 0 ? "0px 1px 3px 0px rgba(0,0,0,0.12)" : 'none',
          transition: 'box-shadow 0.3s',
        }}>
        {Memo}
      </ReactScrollBar>
    </div>
  )
}

export default ReactCusScrollBar
