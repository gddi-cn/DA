import { useState } from 'react'
import './TagRadioSelect.module.less'

type Props<T> = {
  dataList: Array<T>,
  onChange?: (data: T) => void,
  value?: any
}

function TagRadioSelect<T extends { label: string, id: string }> (props: Props<T>): JSX.Element {
  const { dataList, onChange, value } = props
  const [activeIndex, setActiveIndex] = useState(value)
  const getCls = (data: any) => {
    if (data.id === activeIndex) {
      return 'TagRadioSelect_radio TagRadioSelect_radio_active'
    } else {
      return 'TagRadioSelect_radio'
    }
  }

  const handleSelect = (data: T, id: any) => {
    setActiveIndex(id)
    onChange && onChange(data)
  }
  return (
    <div styleName='TagRadioSelect'>
      {
        dataList.map((data, index) => {
          return (
            <div
              key={index}
              className={getCls(data)}
              onClick={() => handleSelect(data, data.id)}
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
