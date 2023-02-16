import React from 'react'
import styled from 'styled-components'
import { Avatar as AntAvatar, Tooltip } from 'antd'

import { useMeta } from './hook'
import Scrollbar from '@src/components/Scrollbar'
import camera from '@src/asset/images/space/camera.png'

const AvatarWrap = styled.label`
  width: 300px;
  height: 100%;
  position: relative;
  cursor: pointer;
`

const Camera = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  object-fit: contain;
`

const CoverFooter = styled.div`
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

const Container = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 20px;
  height: 231px;
  overflow: hidden;
  width: 100%;
`

const MetaWrap = styled.div`
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

const Description = styled.div`
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

const Meta: React.FC = () => {
  const {
    cover,
    inputTip,
    InputIcon,
    template_name,
    adapter_device,
    created,
    updated,
    description,
    handleCoverChange,
    loading,
  } = useMeta()

  return (
    <Container>
      <MetaWrap>
        <TagWrap>
          <TemplateName>{template_name}</TemplateName>
          <Input>
            <InputIcon />
            <InputTip>{inputTip}</InputTip>
          </Input>
        </TagWrap>
        <Device>适用设备类型：{adapter_device}</Device>
        <Text>创建时间：{created}</Text>
        <Text>修改时间：{updated}</Text>
        <DescWrap>
          <Text>描述：</Text>
          <Description>
            <Scrollbar autoHide>
              <Desc>
                {description}
              </Desc>
            </Scrollbar>
          </Description>
        </DescWrap>
      </MetaWrap>
      <Tooltip title={'更换封面'} placement='right'>
        <AvatarWrap>
          <Cover src={cover} alt='cover' />
          <CoverFooter>
            <Camera src={camera} alt={'camera'} />
          </CoverFooter>
          <input
            type={'file'} style={{ display: 'none' }}
            accept={'image/png, image/jpeg, image/jpg'}
            onChange={handleCoverChange}
            disabled={loading}
          />
        </AvatarWrap>
      </Tooltip>
    </Container>
  )
}

export default Meta

