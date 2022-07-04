import { useState } from 'react'
import './TagRadioSelect.module.less'

type Props<T> = {
  dataList: Array<T>,
  onChange?: (data: T) => void
}

function TagRadioSelect<T extends { label: string }> (props: Props<T>): JSX.Element {
  const { dataList, onChange } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const getCls = (index: number) => {
    if (index === activeIndex) {
      return 'TagRadioSelect_radio TagRadioSelect_radio_active'
    } else {
      return 'TagRadioSelect_radio'
    }
  }

  const handleSelect = (data: T, index: number) => {
    setActiveIndex(index)
    onChange && onChange(data)
  }
  return (
    <div styleName='TagRadioSelect'>
      {
        dataList.map((data, index) => {
          return (
            <div
              key={index}
              className={getCls(index)}
              onClick={() => handleSelect(data, index)}
            >
              {data.label}
            </div>
          )
        })
      }
    </div>
  )
}

export default TagRadioSelect
