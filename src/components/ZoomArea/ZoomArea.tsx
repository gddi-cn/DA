import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction, wheelAction } from '@use-gesture/react'

const useGesture = createUseGesture([dragAction, wheelAction])


interface ZoomAreaProps {
  maxScale?: number
  minScale?: number
  children?: React.ReactNode
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Area = styled(animated.div)`
  display: block;
  object-fit: contain;
  position: relative;
  will-change: transform;
  cursor: all-scroll;
  width: 100%;
  height: 100%;
  touch-action: none;
  &:active {
    cursor: grabbing;
  }
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
  }
`

const ZoomArea: React.FC<ZoomAreaProps> = (
  {
    maxScale = 2,
    minScale = 0.5,
    children
  }
) => {
  const animatedDivRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handler = (e: any) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }))

  useGesture({
    onDrag: ({ offset: [x, y] }) => {
      api.start({ x, y })
    },
    onWheel: ({ direction: [, y] }) => {
      const isDown = y > 0
      api.start({ scale: Math.max(minScale, Math.min(maxScale, style.scale.get() + (isDown ? -0.3 : 0.3))) })
    },
  }, {
    target: animatedDivRef,
    drag: { from: () => [style.x.get(), style.y.get()] },
  })

  return (
    <Container>
      <Area ref={animatedDivRef} style={style}>
        {children}
      </Area>
    </Container>
  )
}

export default ZoomArea
