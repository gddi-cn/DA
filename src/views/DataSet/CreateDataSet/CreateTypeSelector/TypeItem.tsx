import React from 'react'
import styled from 'styled-components'

import {DatasetCreateType} from '@src/shared/enum/dataset'
import {useTypeItem} from './hook'

const Container = styled.div`
  position: relative;
  width: 416px;
  height: 446px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
          //outline 0.1s ease-in-out,
          box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0 1px 1px 0 rgba(0,0,0,0.14),0 1px 3px 0 rgba(0,0,0,0.12)
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
`
const Img = styled.img`
  width: 100%;
  object-fit: contain;
`

const Title = styled.h5`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #3693D1; 
`

interface TypeItemProp {
  type: DatasetCreateType;
}
const TypeItem: React.FC<TypeItemProp> = (
  {
    type,
  }
) => {
  const {
    containerRef,
    logo,
    title,
    handleClick,
  } = useTypeItem(type)

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <div style={{ width: 384, height: 353, display: 'grid', placeContent: 'center' }}>
        <Img src={logo} />
      </div>
      <Title>{title}</Title>
      {
        type === DatasetCreateType.LABELING ? (
          <div style={{position: 'absolute', bottom: 15, left: 0, right: 0}}>
            <p style={{textAlign: 'center', fontSize: 14, color: '#888'}}>
              目前支持&nbsp;<span style={{color: '#F7C5AA'}}>目标检测</span>&nbsp;算法，采用
              <span>自动化标注</span>
            </p>
          </div>
        ) : null
      }
    </Container>
  )
}

export default TypeItem
