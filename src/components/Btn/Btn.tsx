import { Button, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    black: true,
    blue: true,
  }
  interface IconButtonPropsColorOverrides {
    black: true,
    blue: true,
  }
}

export {
  LoadingButton,
  IconButton,
}

export default Button
