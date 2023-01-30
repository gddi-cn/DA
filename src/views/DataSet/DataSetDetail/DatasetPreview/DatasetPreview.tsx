import TabsHeader from "./TabsHeader";
// import { useState } from 'react'
import TabContent from "./TabContent";
import Preview from "./Preview";
import type { SetStateAction, Dispatch } from "react";
import type { Data } from "@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard";
import "./DatasetPreview.module.less";

type Props = {
  setWhichSet: Dispatch<SetStateAction<any>>;
  classInfo: any;
  datasetInfo: Data | null;
  currentId: any;
};
const DatasetPreview = (props: Props): JSX.Element => {
  const { setWhichSet, classInfo, datasetInfo, currentId } = props;

  const handleChangeTab = (key: string) => {
    setWhichSet(key);
  };

  return (
    <div styleName="DatasetPreview">
      <TabsHeader handleChangeTab={handleChangeTab} />
      <TabContent>
        <Preview
          classInfo={classInfo}
          datasetInfo={datasetInfo}
          currentId={currentId}
        />
      </TabContent>
    </div>
  );
};

export default DatasetPreview;
