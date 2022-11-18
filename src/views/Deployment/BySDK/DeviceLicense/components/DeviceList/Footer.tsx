import React from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd'
import { deviceListPageAtom, devicesAtom, deviceTotalAtom, PAGE_SIZE } from './store'
import { useAtom } from 'jotai'

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0 36px 40px;
`

const Footer: React.FC = () => {
  const [total] = useAtom(deviceTotalAtom)
  const [, setPage] = useAtom(deviceListPageAtom)

  return (
    <Container>
      <Pagination
        pageSize={PAGE_SIZE}
        total={total}
        size={'small'}
        onChange={(p) => setPage(p)}
      />
    </Container>
  )
}

export default Footer
