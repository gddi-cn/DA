import React from 'react'

import { useVersionSelector } from './hook'
import { Select } from 'antd'
import styled from 'styled-components'

const Label = styled.label`
  
`

const ModelVersionSelector: React.FC = () => {
  const { currentVersionId, optionsList, handleChange } = useVersionSelector()

  return (
    <Label>
      模型版本：
      <Select
        options={optionsList}
        onChange={handleChange}
        value={currentVersionId}
        style={{ width: 80 }}
      />
    </Label>
  )
}

export default ModelVersionSelector
