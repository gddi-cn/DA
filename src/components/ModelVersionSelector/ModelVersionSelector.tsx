import React from 'react'

import { useVersionSelector } from './hook'
import { Select as AntSelect } from 'antd'
import styled from 'styled-components'

const Label = styled.label`
  
`

const Select = styled(AntSelect)`
  .ant-select-selector {
    border-radius: 4px!important;
  }
`

const ModelVersionSelector: React.FC = () => {
  const { currentVersionId, optionsList, handleChange } = useVersionSelector()

  return (
    <Label>
      模型版本：
      <Select
        options={optionsList}
        onChange={handleChange as any}
        value={currentVersionId}
        style={{ width: 80 }}
      />
    </Label>
  )
}

export default ModelVersionSelector
