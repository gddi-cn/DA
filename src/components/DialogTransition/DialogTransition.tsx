import React from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { Grow } from '@mui/material'

const DialogTransition = React.forwardRef(function Transtion(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} {...props} children={props.children} />
})

export default DialogTransition
