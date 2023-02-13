import React from 'react'
import styled from 'styled-components'

import defaultCover from '@src/asset/images/platform/defaultCover.png'
import { formatUnixDate } from '@src/utils/tools'

import { useAppItem } from './hook'
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'

const Card = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 208px;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition:
          box-shadow ease-in-out .3s;
  &:not([selected]) {
    /* box-shadow: 0 2px 4px rgba(177, 191, 202, 0.36); */
    /* box-shadow: 0 0 4px #48a2df; */
  }
  &:hover:not([selected]) {
    /* box-shadow: 1px 4px 6px rgba(177, 191, 202, 0.36); */
    box-shadow: 0 0 4px #48a2df;
    /* filter: drop-shadow(0 0 4px 0 #48a2df) */
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
`

const CardMedia = styled.img`
  height: 130px;
  display: block;
  object-fit: cover;
`

const Meta = styled.div`
  flex: 1;
  background-color: #EDF8FF;;
  padding: 10px 15px;
`

const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #2582C1;
  margin: 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Time = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #2582C1;
`

const OptionsWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0 10px;
`

const AppItem: React.FC<App.Instance> = (props) => {
  const { containerRef, handleClick, handleDelete } = useAppItem(props)

  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      style: {
        color: '#FF6177'
      },
      onClick: handleDelete
    }
  ]

  return (
    <Card ref={containerRef} onClick={handleClick}>
      <CardMedia src={props.cover || defaultCover} alt={'cover'} />
      <Meta>
        <Name>{props.name}</Name>
        <Time>{ props.create_time ? formatUnixDate(props.create_time) : '-' }</Time>
      </Meta>
      <OptionsWrap>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <EllipsisOutlined />
          </a>
        </Dropdown>
      </OptionsWrap>
    </Card>
  )
}

export default AppItem
