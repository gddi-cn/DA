import React from 'react'

import { Button as AntButton } from 'antd'
import { SwiperSlide as RawSwiperSlide, Swiper as RawSwiper } from 'swiper/react'
import { StepBackwardOutlined as PreIcon, StepForwardOutlined as NextIcon } from '@ant-design/icons'

import { useSlider } from './hook'

import Item from './Item'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  .__album_control {
    display: none;
  }
  &:hover {
    .__album_control {
      display: flex;
    }
  }
`

const Swiper = styled(RawSwiper)`
`

const SwiperSlide = styled(RawSwiperSlide)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`

const Pre = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
  .ant-btn {
    height: unset;
  }
`

const Next = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
  .ant-btn {
    height: unset;
  }
`

const Button = styled(AntButton)`
  font-size: 28px;
`

const Slider: React.FC = () => {
  const {
    imageList,
    handleInit,
    handleNextPage,
    handlePrePage,
    disabledNext,
    disabledPre,
  } = useSlider()

  return (
    <Container>
      <Swiper
        style={{ height: '100%' }}
        freeMode onInit={handleInit}
        slidesPerView={7} spaceBetween={10}
      >
        {
          imageList.map((image, idx) => (
            <SwiperSlide key={image.uid}>
              <Item {...image} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Pre className={'__album_control'}>
        <Button type={'link'} disabled={disabledPre} onClick={handlePrePage} title={'上一页'}>
          <PreIcon />
        </Button>
      </Pre>
      <Next className={'__album_control'}>
        <Button type={'link'} disabled={disabledNext} onClick={handleNextPage} title={'下一页'}>
          <NextIcon />
        </Button>
      </Next>
    </Container>
  )
}

export default Slider
