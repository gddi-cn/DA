import {DatasetScene} from '@src/shared/enum/dataset'
import {Model} from '@src/shared/enum/model'
import {sceneNameMapping} from '@src/shared/mapping/dataset'
import {modelVersionStatusNameMapping} from '@src/shared/mapping/model'
import {Select} from 'antd'
import {isNaN, parseInt} from 'lodash'
import React from 'react'
import styled from 'styled-components'
import {useChipFilter, useModelTypeFilter, useSorter, useStatusFilter} from './hook'
import ChipSelector from "@src/components/ChipSelector";
import {useAllDatasetScene} from "@src/hooks/dataset";

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  column-gap: 10px;
`

const sorterOptions = [
  { key: 5, value: 5, label: '创建时间降序' },
  { key: 6, value: 6, label: '创建时间升序' },
  { key: 9, value: 9, label: '更新时间降序' },
  { key: 10, value: 10, label: '更新时间升序' },
]


const statusOptions = Object
  .values(Model.TrainStatus)
  .filter((x: any) => !isNaN(parseInt(x)) && x !== 0)
  .map(status => ({
    key: status,
    value: status,
    label: modelVersionStatusNameMapping.get(status as Model.TrainStatus) || '-'
  }))

const Sorter: React.FC = () => {
  const { value, handleChange } = useSorter()

  return (
    <Select
      bordered={false}
      options={sorterOptions}
      value={value}
      onChange={handleChange}
    />
  )
}

const StatusFilter: React.FC = () => {
  const { value, handleChange } = useStatusFilter()

  return (
    <Select
      allowClear
      style={{ width: 150 }}
      placeholder='模型训练状态'
      options={statusOptions}
      value={value}
      onChange={handleChange}
    />
  )
}

const ModelTypeFilter: React.FC = () => {
  const { value, handleChange } = useModelTypeFilter()
  const allScene = useAllDatasetScene()
  const modelTypeOptions = allScene
    .map(datasetScene => ({
      key: datasetScene,
      value: datasetScene,
      label: sceneNameMapping.get(datasetScene) || '-'
    }))

  return (
    <Select
      allowClear
      style={{ width: 150 }}
      placeholder='算法类型'
      options={modelTypeOptions}
      value={value}
      onChange={handleChange}
    />
  )
}


const ChipFilter: React.FC = () => {
  const {
    value,
    handleChange,
  } = useChipFilter()

  return (
    <ChipSelector value={value} onChange={handleChange} />
  )
}

const AdditionalFilter: React.FC = () => {
  return (
    <>
      <Container>
        <ModelTypeFilter />
        <StatusFilter />
        <Sorter />
      </Container>
      <Container>
        <ChipFilter />
      </Container>
    </>
  )
}

export default AdditionalFilter

