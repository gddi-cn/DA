import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Button, message, Modal, Popover } from 'antd'
import { ReactComponent as MoreIcon } from './more.svg'
import { ReactComponent as DeleteIcon } from './delete.svg'
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useTemplateItem } from './hook'
import appAPI from '@src/apis/app'

const Btn = styled(Button) <{
  gap?: React.CSSProperties['columnGap'],
  color?: React.CSSProperties['color']
}
  >`
  display: flex;
  align-items: center;
  column-gap: ${props => props.gap || '6px'};
  color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
  &:hover, &:active, &:focus {
    color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
  }
`

const Container = styled.div`
  background-color: #EDF8FF;
  width: 100%;
  height: 385px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow ease-in .2s;
  filter: drop-shadow(0px 0px 4px rgba(0, 56, 95, 0.25));
  &:hover:not([selected]) {
    filter: drop-shadow(0px 2px 6px rgba(0, 56, 95, 0.25));}
  &[selected] {
    outline: 2px solid #62b0e5;
  }
  overflow: hidden;
  position: relative;
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
  overflow: hidden;
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
  white-space: nowrap;
`

const Format = styled.div`
  margin-top: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #061926;
  overflow: hidden;
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

const DropdownContent: React.FC<{
  id: App.Template.Instance['id'],
  onDelete?(id: App.Template.Instance['id']): void
}> = ({ id, onDelete }) => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleDelete = () => {
    Modal.confirm({
      title: '删除模板',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该模板吗？',
      okText: '确定',
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        setLoading(true)
        const { success } = await appAPI.deleteTemplate(id)
        setLoading(false)

        if (!success) return

        message.success('删除成功')
        onDelete?.(id)
      },
    })
  }

  return (
    <Box>
      <Btn
        icon={<DeleteIcon />} type='text' gap='4px' color='#FF6177'
        onClick={handleDelete} disabled={loading}
      >
        删除
      </Btn>
    </Box>
  )
}

interface TemplateItemProps {
  template: App.Template.Instance
  onDelete?(id: App.Template.Instance['id']): void
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  template,
  onDelete,
}) => {
  const {
    containerRef, cover, name,
    InputIcon, inputTip, tagList,
    description, handleClick,
    format, buildIn,
  } = useTemplateItem(template)

  return (
    <Container ref={containerRef} onClick={handleClick}>
      {
        buildIn ? null : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: 4,
              backgroundColor: '#edf8ff',
              padding: '3px 6px',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#2582C1',
              }}
            >
              私有模板
            </Typography>
          </Box>
        )
      }
      {
        buildIn ? null : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Popover
              trigger={['click']}
              placement='bottomRight'
              getPopupContainer={(el: HTMLElement) => (el as any).parentNode}
              content={<DropdownContent id={template.id} onDelete={onDelete} />}
            >
              <div>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </div>
            </Popover>
          </Box>
        )
      }
      <Img src={cover} alt={'cover'} />
      <Content>
        <Header>
          <Title title={name}>{name}</Title>
          <Input>
            <InputIcon />
            <InputTip>{inputTip}</InputTip>
          </Input>
        </Header>
        <TagList title={tagList.join('，')}>
          {
            tagList.map((tag, idx) => (
              <TagItem key={`${tag}_${idx}`}>{tag}</TagItem>
            ))
          }
          {
            tagList.length === 0 ? (
              <div style={{ height: 23, width: '100%' }} />
            ) : null
          }
        </TagList>
        <Format>
          支持格式：{format}
        </Format>
        <Description title={description}>
          {description}
        </Description>
      </Content>
    </Container>
  )
}

export default TemplateItem

