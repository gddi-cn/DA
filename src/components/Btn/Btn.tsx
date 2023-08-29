import { Button, IconButton, ButtonProps } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    black: true,
    blue: true,
    primaryBlue: true,
  }
  interface IconButtonPropsColorOverrides {
    black: true,
    blue: true,
    primaryBlue: true,
  }
}

export {
  LoadingButton,
  IconButton,
}

export const PrimaryBtn: React.FC<ButtonProps & { target?: string }> = (props) => (
  <Button
    {...props}
    color='black'
    size='small'
    variant='contained'
    sx={{
      minWidth: 97,
    }}
  />
)

export const SecondaryBtn: React.FC<ButtonProps & { target?: string }> = (props) => (
  <Button
    {...props}
    color='black'
    size='small'
    variant='outlined'
    sx={{
      minWidth: 97,
      '&:hover': {
        color: '#000'
      }
    }}
  />
)

export const PrimaryLoadingBtn: React.FC<LoadingButtonProps & { target?: string }> = (props) => (
  <LoadingButton
    color='black'
    size='small'
    variant='contained'
    sx={{
      minWidth: 97,
    }}
    {...props}
  />
)

export const SecondaryLoadingBtn: React.FC<LoadingButtonProps & { target?: string }> = (props) => (
  <LoadingButton
    {...props}
    color='black'
    size='small'
    variant='outlined'
    sx={{
      minWidth: 97,
      '&:hover': {
        color: '#000'
      }
    }}
  />
)

export default Button
