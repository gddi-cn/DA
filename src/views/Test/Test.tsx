import React from 'react'

import ZoomArea from '@src/components/ZoomArea'
import styled from 'styled-components'
import { SwiperSlide as RawSwiperSlide, Swiper as RawSwiper } from 'swiper/react'

const Swiper = styled(RawSwiper)`
  width: 100%;
  height: 100%;
`

const SwiperSlide = styled(RawSwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
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

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cb7a4e;
  overflow: hidden;
`


const imageList = [
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0147c518f3ec3e15a02fc814af177bb4b10ade4a.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/28f451296c1754608ab7a6158a82d5de4ec4e7f4.png",
    "uid": "i_0_0"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/01675ba96669841d8a951f0544b7974be93b491e.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/74d3caf7dc8978e8b4d134947ab7ac741b1d1e2f.png",
    "uid": "i_0_1"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0223fa48626be9d1d8403da504c2509d36335f54.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/d17f09bc11bb8ef78f63c70d887f4d298d1ba28b.png",
    "uid": "i_0_2"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/038e8264bcb784bfc2bb6af2ab4b80b5e3889325.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/fb60da957dec190c90ba162a510b39ed8ab22a08.png",
    "uid": "i_0_3"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/03d0b99f5c87c975e7c343f9130c843c27d8dabc.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/b0718d01826ea8c230813f33b56929ed60929238.png",
    "uid": "i_0_4"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0505ce630c6da648db70eb0f0aafc10586f55344.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/52c92663dde3f2dc2efe43b16a901dfef3ddc02f.png",
    "uid": "i_0_5"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/05b11d451d8156d534b72520085771a5920bd97d.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/54f107ca838eb9b91aea3f548c5bac70fa165d29.png",
    "uid": "i_0_6"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0a4a5055591443bec3bf488f60b2c43bf54c21a2.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/cf80f970935d54f7661cd9ca628c04a7b48f5587.png",
    "uid": "i_0_7"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0b557ac7cfe19b1e85eef4fa534750cfd44af808.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/a164c08ef4a879604f5047d378fa49df13cb3efb.png",
    "uid": "i_0_8"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0ba08fd8368193525543873f9af2939893008018.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/8ca2ccd52b4269999c49df548d102b53c6557532.png",
    "uid": "i_0_9"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0c0e9014f536de6f419c64da3cfe2d88eec01599.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/ddb267d2e58c052feb6e128e8974558aeda8727b.png",
    "uid": "i_0_10"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0d01b3d3cd97da3d9b89126800a39433b621a762.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/75d9918879d41ca377f9af244e53c623259cadfe.png",
    "uid": "i_0_11"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0df6354d2743610970e96f3bf2aaf12e94655714.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/b5a5a4ff172010b49eb759454e25daf9325e6752.png",
    "uid": "i_0_12"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/0ee82c8f9ff41c9646eccaa5831514f446608bc3.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/24833b50a21ee628f791f0294c13134dec8708b7.png",
    "uid": "i_0_13"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/11df1bb9eb5a234098c30da35618edd4e38067a7.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/60fc96081f7db5c6a00d7948d5e95acb7a83c44c.png",
    "uid": "i_0_14"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/1426e94a3f68b9e81706f0dbb08e58e3ce1372b5.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/9aadc16227a5a83b77c0652c393293572827dfd1.png",
    "uid": "i_0_15"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/17914e57d06d8d8250bd9c20977ffc8e7445c640.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/9753796fb8812544fb8c932fee09e8c7131c5929.png",
    "uid": "i_0_16"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/17cd9d42a7768f9ba7db42475ea29b93a3a9d47b.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/5c02d4aed5e902ff201b0641f98558a8352d6edb.png",
    "uid": "i_0_17"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/18db398382ed31e465c912f9391a86a8b0e74153.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/c14797c32883f855dfbb9c47e2e396e19cb0bf5e.png",
    "uid": "i_0_18"
  },
  {
    "rawSrc": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/19d82c602ccf83591203d94297f6db03955e8015.png",
    "src": "http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/38f26982658610e74876db7377c527457b64341f.png",
    "uid": "i_0_19"
  }
]

const RawImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const Test: React.FC = () => {
  return (
    <Container>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </Container>
  )
}

export default Test
