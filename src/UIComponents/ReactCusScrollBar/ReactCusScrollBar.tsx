import Scrollbars from 'react-custom-scrollbars'
import { useMemo, useState } from 'react'
import type { UIEvent } from 'react'
import './ReactCusScrollBar.module.less'

type Props = {
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
  const { children, id } = props
  const [scrollTop, scrollProps] = useScrollTop();
  const Memo = useMemo(() => children, [children])
  return (
    <ReactScrollBar
      id={id}
      autoHide
      {...scrollProps}
      style={{
        boxShadow: scrollTop > 0 ? 'inset 0 5px 5px -5px rgb(0 0 0 / 0.4)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
      {Memo}
    </ReactScrollBar>

  )
}

export default ReactCusScrollBar
