import React, { useMemo, useState } from "react";
import VerticalTabHandle from "./VerticalTabHandle";

import Transversion from "./Transversion";
import ErrorAnalysis from "./ErrorAnalysis";
import ModelContrast from "./ModelContrast";
import ModelForecast from "./ModelForecast";
import ImgRetrieval from "./ImgRetrieval";

import ModelDetailType from "../types";
import "./TrainSuccess.module.less";

const TrainSuccess = (): JSX.Element => {
  const [tabIndex, setTabIndex] =
    useState<ModelDetailType.TabIndex>("train_process");

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
