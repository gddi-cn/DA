import React from 'react'
import styled from 'styled-components'
import { PrimaryBtn, SecondaryBtn } from '../../../../../../../components/Button'
import { useAtom } from 'jotai'
import { dialogOpenAtom, selectedDeviceAtom, stepAtom } from '../store'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-end;
`

const Footer: React.FC = () => {
  const [selected] = useAtom(selectedDeviceAtom)
  const [, setOpen] = useAtom(dialogOpenAtom)
  const [, setStep] = useAtom(stepAtom)

  return (
    <Container>
      <SecondaryBtn width={97} onClick={() => setOpen(false)}>取消</SecondaryBtn>
      <div style={{ marginLeft: 20 }}>
        <PrimaryBtn width={97} disabled={selected.length <= 0} onClick={() => setStep('date')}>下一步</PrimaryBtn>
      </div>
    </Container>
  )
}

export default Footer
