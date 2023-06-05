import { useAtomValue } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { totalAtom } from './store'

const Text = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #606266;
  display: block;
  width: 100%;
  padding: 4px 20px 0;
  line-height: 1;
  vertical-align: middle;
`

const Footer: React.FC = () => {
  const total = useAtomValue(totalAtom)

  return (
    <Text>
      共 {total} 个任务
    </Text>
  )
}

export default Footer

