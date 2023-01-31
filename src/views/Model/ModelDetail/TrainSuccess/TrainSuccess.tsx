import React, { useMemo, useState } from "react";
import VerticalTabHandle from "./VerticalTabHandle";

import Transversion from "./Transversion";
import ErrorAnalysis from "./ErrorAnalysis";
import ModelContrast from "./ModelContrast";
import ModelForecast from "./ModelForecast";
import ImgRetrieval from "./ImgRetrieval";

import ModelDetailType from "../types";
import "./TrainSuccess.module.less";
import { useAtom } from "jotai";
import { currentDatasetAtom } from "@src/views/DataSet/DataSetDetail/store";
import datasetAPI from "@src/apis/dataset";
import { useSelector } from "react-redux";
import { RootState } from "@src/controller/reducer";

const TrainSuccess = (): JSX.Element => {
  const [tabIndex, setTabIndex] =
    useState<ModelDetailType.TabIndex>("train_process");
  const [datasetDetail, setDatasetDetail] = useAtom(currentDatasetAtom);

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {};
  });

  const datasetId = activePipeLine?.APP_DATASET_DETAIL?.id;

  React.useEffect(() => {
    if (!datasetId) return;

    datasetAPI.detail(datasetId).then(({ success, data }) => {
      if (!success || !data) return;
      setDatasetDetail(data);
    });
  }, [datasetId]);

  const View = useMemo(() => {
    const ReactComp: {
      [index: string]: React.ReactNode;
    } = {
      train_process: <Transversion />,
      model_forecast: <ModelForecast />,
      model_contrast: <ModelContrast />,
      error_analysis: <ErrorAnalysis />,
      image_retrieval: <ImgRetrieval />,
    };

    return ReactComp[tabIndex] || null;
  }, [tabIndex]);
  return (
    <div styleName="TrainSuccess">
      <div className="view_control_wrap">
        <VerticalTabHandle setTabIndex={setTabIndex} tabIndex={tabIndex} />
      </div>

      <div className="model_detail_content">{View}</div>
    </div>
  );
};

export default TrainSuccess;
