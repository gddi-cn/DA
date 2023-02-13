import React from 'react'
import styled from 'styled-components'

import Dialog from '@src/components/Dialog'
import add_template from '@src/asset/images/app/add_template.png'
import { SecondaryBtn } from '@src/components/Button'

const DialogContent = styled.div`
  width: 100%;
  height: 476px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
`

const Img = styled.img`
  display: block;
  width: 288px;
  height: 200px;
  object-fit: contain;
`

const Tip = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const DialogFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 18px 38px;
  display: flex;
  justify-content: flex-end;
`

const AddTemplate: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <SecondaryBtn width={97} onClick={handleClick}>定制模板</SecondaryBtn>
      <Dialog
        open={open}
        onCancel={() => setOpen(false)}
        title='定制模板'
        width={1400}
        centered={false}
      >
        <DialogContent>
          <Img src={add_template} alt={'定制模板'} />
          <Tip>请联系客服定制模版</Tip>
        </DialogContent>
        <DialogFooter>
          <SecondaryBtn width={97} onClick={_ => setOpen(false)}>关闭</SecondaryBtn>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddTemplate

