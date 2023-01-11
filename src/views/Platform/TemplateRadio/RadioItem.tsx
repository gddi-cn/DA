import React from 'react'
import styled from 'styled-components'

import watermark from '@src/asset/images/platform/watermark.png'

interface RadioItem extends App.Template.Instance {
  onClick: (id: App.Template.Instance['id']) => void
  selected?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: #EDF8FF;
  border-radius: 4px;
  height: 210px;
  overflow: hidden;
  padding: 20px 10px;
  cursor: pointer;
  z-index: 2;
  transition:
          box-shadow ease-in-out .2s;
  &:not([selected]) {
    box-shadow: 0 2px 4px rgba(177, 191, 202, 0.36);
  }
  &:hover:not([selected]) {
    box-shadow: 1px 4px 6px rgba(177, 191, 202, 0.36);
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
  * {
    user-select: none;
  }
`

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #2582C1;
  z-index: 2;
`

const SubTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #2582C1;
`

const Content = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #2582C1;
`

const WaterMark = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  width: 80px;
  height: 35px;
  display: block;
  object-fit: contain;
`

const RadioItem: React.FC<RadioItem> = (
  {
    id,
    name,
    description,
    sample,
    onClick,
    selected = false,
  }
) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  return (
    <Container onClick={() => onClick(id)} ref={containerRef}>
      <WaterMark src={watermark} alt={'watermark'} />
      <Title>{name}</Title>
      {
        description ? (
          <div>
            <SubTitle>描述</SubTitle>
            <Content>{description}</Content>
          </div>
        ) : null
      }
      {
        sample ? (
          <div>
            <SubTitle>例如：</SubTitle>
            <Content>{sample}</Content>
          </div>
        ) : null
      }
    </Container>
  )
}

export default RadioItem
