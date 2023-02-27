import React from 'react'
import styled from 'styled-components'

import { useTemplateLabelFilter } from './hook'
import RemoteSearch from '@src/components/RemoteSearch'

const Container = styled.div`
  width: 171px;
  overflow: hidden;
`

type Options = {
  key: string
  value: string
  label: string
}

const TemplateLabelFilter: React.FC = () => {
  const { getOptions, selectedTemplateLabelOption, handleChange } = useTemplateLabelFilter()

  return (
    <Container>
      <RemoteSearch<Options>
        fetchOptions={getOptions}     
        onChange={handleChange}
        value={selectedTemplateLabelOption}
        allowClear
        showSearch
        placeholder={'全部应用类型'}
        style={{
          width: '100%'
        }}
      />
    </Container>
  )
}

export default TemplateLabelFilter

