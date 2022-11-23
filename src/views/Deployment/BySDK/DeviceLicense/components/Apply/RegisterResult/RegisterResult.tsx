import React from 'react'
import { useAtom } from 'jotai'
import { registerResultAtom, stepAtom } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/store'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { DeviceRegisterResult } from '@src/shared/types/device'
import { DeviceRegisterRes } from '@src/shared/enum/device'
import { deviceRegisterResultNameMapping } from '@src/shared/mapping/device'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`

const Content = styled.div`
  width: 436px;
`

const Title = styled.p`
  padding-top: 0;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #061926;
`

const Item = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`

const ItemName = styled.p`
  margin: 0 0 0 12px;
  padding: 0;
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ItemRes = styled.p<{ type?: 'success' | 'failed' }>`
  text-align: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.type === 'success' ? '#19a051' : '#ff6177' }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-end;
`

const ListItem: React.FC<DeviceRegisterResult> = (
  {
    name,
    result,
  }
) => {

  const icon = React.useMemo(
    () => {
      switch (result) {
        case DeviceRegisterRes.REPEATED:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
        case DeviceRegisterRes.UNSUPPORTED:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
        case DeviceRegisterRes.SUCCESS:
          return <CheckCircleFilled style={{ color: '#19a051' }} />
        default:
          return <CloseCircleOutlined style={{ color: '#ff6177' }} />
      }
    },
    [result]
  )

  return (
    <Item>
      { icon }
      <ItemName>{name}</ItemName>
      <ItemRes type={result === DeviceRegisterRes.SUCCESS ? 'success' : 'failed'}>
        { deviceRegisterResultNameMapping.get(result) || '未知错误' }
      </ItemRes>
    </Item>
  )
}

const RegisterResult: React.FC = () => {
  const [resList, setResList] = useAtom(registerResultAtom)
  const [, setStep] = useAtom(stepAtom)

  React.useEffect(
    () => {
      return () => {
        setResList([])
      }
    },
    []
  )

  return (
    <>
      <Container>
        <Content>
          <Title>注册结果</Title>
          {
            resList.map(res => (
              <ListItem key={res.sn} {...res} />
            ))
          }
        </Content>
      </Container>
      <Footer>
        <SecondaryBtn width={97} onClick={() => setStep('register')}>继续注册</SecondaryBtn>
        <div style={{ marginLeft: 20 }}>
          <PrimaryBtn width={97} onClick={() => setStep('device')}>返回列表</PrimaryBtn>
        </div>
      </Footer>
    </>
  )
}

export default RegisterResult
