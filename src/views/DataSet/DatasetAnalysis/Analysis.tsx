import React, {useMemo, useState} from 'react'
import {AnalyzeItem} from "@src/shared/enum/dataset";
import {ReactCusScrollBar} from "@src/UIComponents";
import styled from "styled-components";
import Details from "./Details";
import {useAtomValue} from "jotai";
import {analysisDataListAtom} from "@views/DataSet/DatasetAnalysis/store";
import Radar from "@views/DataSet/DatasetAnalysis/Radar";

const Container = styled.div`
  display: grid;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  grid-column-gap: 25px;
  padding: 0 20px;
`

const RadarWrap = styled.div`
  border-radius: 4px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #EDF8FF;
`

const DetailWrap = styled.div`
  border-radius: 4px;
  padding: 20px 20px 36px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #F8FCFF;
  border: 1px solid #76b9e7;
`

const Title = styled.p`
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: 18px;
`

const useAnalysis = () => {
  const [item, setItem] = useState<AnalyzeItem | undefined>(undefined)
  const dataList = useAtomValue(analysisDataListAtom)
  console.log({ dataList })

  const detailData = useMemo(
    () => {
      // 兼容旧数据
      if (item === AnalyzeItem.ImageSize || item === AnalyzeItem.FineSize) {
        const [data] = (dataList || [])
          .filter(x => x.sign === AnalyzeItem.ImageSize || x.sign === AnalyzeItem.FineSize)
          .filter(Boolean)

        return data || undefined
      }

      if (item === AnalyzeItem.SceneDiversity || item === AnalyzeItem.ImgDiscrimination) {
        const [data] = (dataList || [])
          .filter(x => x.sign === AnalyzeItem.SceneDiversity || x.sign === AnalyzeItem.ImgDiscrimination)
          .filter(Boolean)

        return data || undefined
      }

      const [data] = (dataList || []).filter(x => x.sign === item)

      return data || undefined
    },
    [dataList, item]
  )

  const handleItemChange = (item: AnalyzeItem) => {
    setItem(item)
  }

  return {
    detailData,
    dataList,
    handleItemChange,
  }
}

const Inner: React.FC = () => {
  const { detailData, dataList, handleItemChange } = useAnalysis()

  return (
    <ReactCusScrollBar id={'dataset_ana_right'}>
      <Container>
        <RadarWrap>
          <Title>数据分析维度</Title>
          <Radar dataList={dataList} onItemChange={handleItemChange} />
        </RadarWrap>
        <DetailWrap>
          <Title>数据分析详情</Title>
          <Details detail={detailData || {}} />
        </DetailWrap>
      </Container>
    </ReactCusScrollBar>
  )
}

const Analysis: React.FC = () => {
  return (
    <React.Suspense>
      <Inner />
    </React.Suspense>
  )
}

export default Analysis
