import React from 'react'

import { SubTitle, Divider } from '../components'
import { useMeta  } from './hook'
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Link = styled.a`
  
`

const Meta: React.FC = () => {
  const { name, totalImage, createdAt, demandDocUrl } = useMeta()

  return (
    <Container>
      <SubTitle>需求信息</SubTitle>
      <Divider />
      <Text>需求名称：{name}</Text>
      <Text>任务量：{totalImage}</Text>
      <Text>创建时间：{createdAt}</Text>
      <Text>
        需求详情：
        {
          !demandDocUrl ? (
            <Link href={'https://www.baidu.com'} target={'_blank'} rel={'noreferrer'}>
              查看文档
            </Link>
          ) : '-'
        }
      </Text>
    </Container>
  )
}

export default Meta
