import React from "react";
import { useAtomValue } from "jotai";
import { CssBaseline } from '@mui/material'
import { SimplePaletteColorOptions, ThemeProvider, createTheme } from '@mui/material/styles'

import {
  errorColorAtom,
  infoColorAtom,
  primaryColorAtom,
  secondaryColorAtom,
  successColorAtom,
  warningColorAtom,
  blackColorAtom,
  blueColorAtom,
  whiteColorAtom,
  hoverBlueAtom,
  selectedBlueAtom,
  primaryBlueAtom,
} from "@src/store/theme";

export interface DynamicThemeProps {
  children?: React.ReactNode;
}

declare module '@mui/material/styles' {
  interface Palette {
    blue: Palette['primary'];
    black: Palette['primary'];
    white: Palette['primary'];
    hoverBlue: Palette['primary'];
    selectedBlue: Palette['primary'];
    primaryBlue: Palette['primary'];
  }

  interface PaletteOptions {
    blue: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
    white: Palette['primary'];
    hoverBlue: Palette['primary'];
    selectedBlue: Palette['primary'];
    primaryBlue: Palette['primary'];
  }

  interface BreakpointOverrides {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    ll: true,
    xl: true,
    hd: true,
  }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string, contrastText?: SimplePaletteColorOptions['contrastText']) =>
  augmentColor({ color: { main: mainColor, contrastText } })

const useTheme = () => {
  const primaryColor = useAtomValue(primaryColorAtom)
  const secondaryColor = useAtomValue(secondaryColorAtom)
  const errorColor = useAtomValue(errorColorAtom)
  const warningColor = useAtomValue(warningColorAtom)
  const infoColor = useAtomValue(infoColorAtom)
  const successColor = useAtomValue(successColorAtom)
  const blackColor = useAtomValue(blackColorAtom)
  const blueColor = useAtomValue(blueColorAtom)
  const whiteColor = useAtomValue(whiteColorAtom)
  const hoverBlueColor = useAtomValue(hoverBlueAtom)
  const selectedBlueColor = useAtomValue(selectedBlueAtom)
  const primaryBlueColor = useAtomValue(primaryBlueAtom)

  return React.useMemo(() => createTheme({
    palette: {
      primary: createColor(primaryColor, '#fff'),
      secondary: createColor(secondaryColor),
      error: createColor(errorColor),
      warning: createColor(warningColor),
      info: createColor(infoColor),
      success: createColor(successColor),
      black: createColor(blackColor),
      blue: createColor(blueColor),
      white: createColor(whiteColor),
      hoverBlue: createColor(hoverBlueColor),
      selectedBlue: createColor(selectedBlueColor),
      primaryBlue: createColor(primaryBlueColor),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        ll: 1400,
        xl: 1536,
        hd: 1920,
      }
    }
  }), [
    primaryColor,
    secondaryColor,
    errorColor,
    warningColor,
    infoColor,
    successColor,
    blackColor,
    blueColor,
    whiteColor,
  ])
}

const DynamicTheme: React.FC<DynamicThemeProps> = (
  {
    children,
  }
) => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default DynamicTheme

