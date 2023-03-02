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

const ModelVersionSelector: React.FC<{
  disabled?: boolean,
  disabledAutoSelect?: boolean;
}> = (
  {
    disabled = false,
    disabledAutoSelect = false,
  }
) => {
  const { currentVersionId, optionsList, handleChange } = useVersionSelector(disabledAutoSelect)

  return (
    <Label>
      模型版本：
      <Select
        options={optionsList}
        onChange={handleChange as any}
        value={currentVersionId}
        style={{ width: 120 }}
        disabled={disabled}
      />
    </Label>
  )
}

export default ModelVersionSelector
