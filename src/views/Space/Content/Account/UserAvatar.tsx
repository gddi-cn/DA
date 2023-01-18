import React from 'react'
import styled from 'styled-components'
import { Avatar as AntAvatar, Tooltip } from 'antd'

import defaultAvatar from '@src/asset/images/defaultAvatar.png'
import camera from '@src/asset/images/space/camera.png'
import { useAvatar } from './hook'

const AvatarWrap = styled.label`
  width: 100px;
  max-width: 100%;
  position: relative;
  cursor: pointer;
`

const Avatar = styled(AntAvatar)<{ bg?: React.CSSProperties['color'], cursor?: React.CSSProperties['cursor'] }>`
  background-color: ${props => props.bg || '#fff'};
  cursor: ${props => props.cursor || 'normal'};
`

const Camera = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  object-fit: contain;
`

const AvatarFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(98, 176, 229, .3);
  //background-color: #ccecff;
  display: flex;
  justify-content: center;
  padding: 4px 0;
`

const UserAvatar: React.FC = () => {
  const { avatar, handleChange } = useAvatar()

  return (
    <Tooltip title={'更换头像'}>
      <AvatarWrap>
        <Avatar src={avatar || defaultAvatar} size={100} shape={'square'} bg={'#EDF8FF'} />
        <AvatarFooter>
          <Camera src={camera} alt={'camera'} />
        </AvatarFooter>
        <input
          type={'file'} style={{ display: 'none' }}
          accept={'image/png, image/jpeg, image/jpg'}
          onChange={handleChange}
        />
      </AvatarWrap>
    </Tooltip>
  )
}

export default UserAvatar
