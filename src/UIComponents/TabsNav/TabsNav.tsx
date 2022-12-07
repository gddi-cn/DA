import { useMemo, useState, useRef, useLayoutEffect } from 'react'
import { isEmpty } from 'lodash'
import type { Dispatch, MouseEvent } from 'react'
import './TabsNav.module.less'

type Props<T>={
    dataList:Array<T>,
    renderItem:(data:T)=>React.ReactNode,
    getActiveNode: (data: T) => boolean,
    handleOnClick?:()=>void,

}

type ItemProps<T>={
    index:number,
    renderItem: (data: T) => React.ReactNode,
    data:T,
    setActiveStyle: Dispatch<any>,
    handleOnClick?: () => void,
    getActiveNode: (data: T) => boolean,
}

const updateUi = (element: HTMLDivElement, setActiveStyle: Dispatch<any>) => {
  const style = {
    width: element.offsetWidth, height: element.offsetHeight, top: element.offsetTop, left: element.offsetLeft
  }

  setActiveStyle(style)
}

function TabsNavItem <T> (props: ItemProps<T>) {
  const { index, renderItem, data, setActiveStyle, handleOnClick, getActiveNode } = props

  const div = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const yes = getActiveNode(data)
    if (yes && div?.current) {
      updateUi(div?.current, setActiveStyle)
    }
  }, [setActiveStyle, data, getActiveNode])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    // const info = div?.current?.getBoundingClientRect()
    if (div?.current) {
      updateUi(div?.current, setActiveStyle)
    }
    // 真正需要的click
    if (handleOnClick) {
      handleOnClick()
    }
  }

  const getCls = () => {
    const yes = getActiveNode(data)
    if (yes) {
      return 'Tabs_Nav_Item_active'
    }
  }
  return (
    <div
      key={index}
      onClick={handleClick}
      className={`Tabs_Nav_Item ${getCls()}`}
      ref={div}
    >
      {renderItem(data)}
    </div>
  )
}

function TabsNav<T> (props: Props<T>): JSX.Element {
  const { dataList = [], renderItem, handleOnClick, getActiveNode } = props

  const [activeStyle, setActiveStyle] = useState<any>({})

  const taskActiveMark = useMemo(() => {
    if (isEmpty(dataList)) {
      return null
    }
    return (
      <div className="hori-selector" style={activeStyle}>
        <div className="left"></div>
        <div className="right"></div>
      </div>
    )
  }, [activeStyle, dataList])

  const listView = useMemo(() => {
    return dataList.map((o, i) => {
      return (
        <TabsNavItem data={o} index={i} key={i} renderItem={renderItem} setActiveStyle={setActiveStyle} handleOnClick={handleOnClick} getActiveNode={getActiveNode}/>
      )
    })
  }, [dataList, renderItem, handleOnClick, getActiveNode])
  return (
    <div styleName='TabsNav' className='TabsNav_cus'>
      {
        listView
      }
      {
        taskActiveMark
      }
    </div>
  )
}

export default TabsNav
