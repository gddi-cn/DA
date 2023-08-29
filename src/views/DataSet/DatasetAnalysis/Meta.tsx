import React from 'react'
import styled from 'styled-components'
import {useAtomValue} from "jotai";
import {CircularProgress, Tooltip} from "@mui/material";
import {Image} from "antd";
import dayjs from 'dayjs'

import datasetDefault from '@src/asset/images/datasetDefault.png'

import {datasetDetailAtom} from "./store";
import {currentDatasetIdAtom} from "@src/store/dataset";
import {sceneNameMapping} from "@src/shared/mapping/dataset";

import {bytesToSize} from "@src/utils";
import Editor from "./Edditor";

const Container = styled.div`
  background-color: #EDF8FF;
  padding: 20px 10px;
  border-radius: 4px;
`

const FallbackContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 220px 0;
`

const Content = styled.div`
  overflow: hidden;
`

const Title = styled.p`
  font-size: 18px;
  line-height: 1.5;
  font-weight: 600;
  color: rgba(0, 0, 0, .85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Divider = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid #b8ddf5;
  height: 0;
  margin: 10px 0;
`

const Name = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Cover = styled.div`
  margin: 10px 0 20px;
  width: 100%;
  img {
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`

const Info = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, .85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.7;
`

const useMeta = () => {
  const key = useAtomValue(currentDatasetIdAtom)
  const dataset = useAtomValue(datasetDetailAtom)
  const {
    name,
    cover,
    username,
    created,
    updated,
    scene,
    train_set,
  } = dataset || {}

  const { size, image_count, annotation_count, class_count } = train_set || {}

  const createdAt = created ? dayjs(new Date(created * 1000)).format('YYYY/MM/DD') : '-'
  const updatedAt = updated ? dayjs(new Date(updated * 1000)).format('YYYY/MM/DD') : '-'
  const dataType = scene ? sceneNameMapping.get(scene) : '-'
  const dataSize = size ? bytesToSize(size) : '-'

  return {
    key,
    name: name ?? '-',
    cover,
    createdBy: username ?? '-',
    createdAt,
    updatedAt,
    dataType,
    dataSize,
    imgCount: image_count ?? '-',
    accCount: annotation_count ?? '-',
    classCount: class_count ?? '-'
  }
}

const Fallback: React.FC = () => {
  return (
    <FallbackContainer>
      <CircularProgress />
    </FallbackContainer>
  )
}

const Inner: React.FC = () => {
  const {
    key,
    name,
    cover,
    createdBy,
    createdAt,
    updatedAt,
    dataType,
    dataSize,
    imgCount,
    accCount,
    classCount,
  } = useMeta()

  return (
    <Content key={key}>
      <Tooltip title={name}>
        <Title>数据信息</Title>
      </Tooltip>
      <Divider />
      <Name>{name}</Name>
      <Cover>
        <Image src={cover || datasetDefault} fallback={datasetDefault} />
      </Cover>
      <Info>创建人：{createdBy}</Info>
      <Info>创建时间：{createdAt}</Info>
      <Info>更新时间：{updatedAt}</Info>
      <Divider />
      <Info>数据类型：{dataType}</Info>
      <Info>数据大小：{dataSize}</Info>
      <Info>数据量：{imgCount}</Info>
      <Info>标注数：{accCount}</Info>
      <Info>标签种类：{classCount}</Info>
      <Editor />
    </Content>
  )
}

const Meta: React.FC = () => {
  return (
    <Container>
      <React.Suspense fallback={<Fallback />}>
        <Inner />
      </React.Suspense>
    </Container>
  )
}

export default Meta
