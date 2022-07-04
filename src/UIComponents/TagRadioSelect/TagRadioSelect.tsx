import { useState } from 'react'
import './TagRadioSelect.module.less'

type Props<T>={
  dataList: Array<T>
}

function TagRadioSelect<T> (props: Props<T>): JSX.Element {
  console.log(props)
  const { dataList } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const getCls = (index:number) => {
    if (index === activeIndex) {
      return 'TagRadioSelect_radio TagRadioSelect_radio_active'
    } else {
      return 'TagRadioSelect_radio'
    }
  }

  const handleSelect = (data: T, index:number) => {
    setActiveIndex(index)
  }
  return (
    <div styleName='TagRadioSelect'>
      {
        dataList.map((data, index) => {
          return (
            <div
              key={index}
              className={getCls(index + 1)}
              onClick={() => handleSelect(data, index)}
            >
              123
            </div>
          )
        })
      }
    </div>
  )
}

export default TagRadioSelect
