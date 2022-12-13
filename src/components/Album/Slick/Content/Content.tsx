import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useContent } from './hook'
import Painter from '../../Painter'
import Next from './Next'
import Pre from './Pre'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .__album_content_controls {
    display: none;
  }
  &:hover {
    .__album_content_controls {
      display: flex;
    }
  }
`

const Content: React.FC = () => {
  const {
    imgList,
    handleInit,
    handleActiveChange,
    showView,
  } = useContent()

  return (
    <Container>
      <Swiper
        style={{ height: '100%' }}
        onInit={handleInit}
        onActiveIndexChange={handleActiveChange}
        touchStartForcePreventDefault={false}
        zoom={{ toggle: true, minRatio: 0.5, maxRatio: 2 }}
      >
        {
          imgList.map((image, idx) => (
            <SwiperSlide key={image.uid}>
              {
                showView(idx) ? (
                  <Painter {...image} />
                ) : null
              }
            </SwiperSlide>
          ))
        }
        <Pre />
        <Next />
      </Swiper>
    </Container>
  )
}

export default Content
