import { Button, Popover as AntPopover } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { useInfo } from './hook'
import { ReactComponent as EditIcon } from '../icons/edit.svg'
import { ReactComponent as MoreIcon } from '../icons/more.svg'
import Scrollbar from '@src/components/Scrollbar'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 36px;
  color: #061926;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Toolbars = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const Popover = styled(AntPopover)`
  padding: 0;
  .ant-popover-inner {
    border-radius: 8px;
  }
`

const MetaWrap = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 20px;
  height: 231px;
  overflow: hidden;
  width: 100%;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 10px;
`

const TagWrap = styled.div`
  display: flex;
  column-gap: 20px;
`

const TemplateName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  background: #2582C1;
  border-radius: 22px;
  padding: 0 10px;
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

const Device = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const DescWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`

const Description = styled.p`
  flex: 1;
  overflow: hidden;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
`

const Desc = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding: 8px;
  color: #061926;
  word-break: break-all;
`


const Cover = styled.img`
  display: block;
  width: 300px;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

const Info: React.FC = () => {
  const {
    name,
    cover,
    inputTip,
    InputIcon,
    template_name,
    adapter_device,
    created,
    updated,
    description,
  } = useInfo()

  return (
    <Container>
      <Content>
        <Header>
          <Title title={name}>{name}</Title>
          <Toolbars>
            <Btn icon={<EditIcon />} type={'text'} size={'large'}>
              重命名
            </Btn>
            <Popover
              trigger={['click']}
              placement='bottomRight'
              content={(
                <>
                  123
                </>
              )}
            >
              <div>
                <Btn icon={<MoreIcon />} type={'text'} size={'large'}>
                  更多
                </Btn>
              </div>
            </Popover>
          </Toolbars>
        </Header>
        <MetaWrap>
          <Meta>
            <TagWrap>
              <TemplateName>{template_name}</TemplateName>
              <Input>
                <InputIcon />
                <InputTip>{inputTip}</InputTip>
              </Input>
            </TagWrap>
            <Device>适用设备类型：{adapter_device}</Device>
            <Text>创建时间：{created}</Text>
            <Text>最后修改时间：{updated}</Text>
            <DescWrap>
              <Text>描述</Text>
              <Description>
                <Scrollbar autoHide>
                  <Desc>
                    {description}
                  </Desc>
                </Scrollbar>
              </Description>
            </DescWrap>
          </Meta>
          <Cover src={cover} alt='cover' />
        </MetaWrap>
      </Content>
    </Container>
  )
}

export default Info

