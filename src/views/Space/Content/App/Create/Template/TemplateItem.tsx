import React from 'react'
import styled from 'styled-components'

import { useTemplateItem } from './hook'

const Container = styled.div`
  background-color: #EDF8FF;
  width: 100%;
  height: 358px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow ease-in .2s;
  &:hover:not([selected]) {
    box-shadow: 1px 4px 6px rgba(177, 191, 202, 0.36);
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
`

const Img = styled.img`
  display: block;
  height: 180px;
  object-fit: cover;
`

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  flex: 1;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Input = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
`

const InputTip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #2582C1;
`

const TagList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-top: 20px;
`

const TagItem = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #62B0E5;
  padding: 0 10px;
  background: #D8EDFB;
  border: 1px solid #62B0E5;
  border-radius: 2px;
`

const Description = styled.div`
  margin-top: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #061926;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;    
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical
`

const TemplateItem: React.FC<App.Template.Instance> = (template) => {
  const {
    containerRef, cover, name,
    InputIcon, inputTip, tagList,
    description, handleClick,
  } = useTemplateItem(template)

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <Img src={cover} alt={'cover'} />
      <Content>
        <Header>
          <Title title={name}>{name}</Title>
          <Input>
            <InputIcon />
            <InputTip>{inputTip}</InputTip>
          </Input>
        </Header>
        <TagList>
          {
            tagList.map((tag, idx) => (
              <TagItem key={`${tag}_${idx}`}>{tag}</TagItem>
            ))
          }
        </TagList>
        <Description title={description}>
          {description}
        </Description>
      </Content>
    </Container>
  )
}

export default TemplateItem

