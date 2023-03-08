import { UIDatasetVisual, ReactCusScrollBar } from "@src/UIComponents";
import { useMemo, useState } from "react";
// import { isEmpty } from 'lodash'
import { Modal, Image } from "antd";
import { useGetDataInfo } from "../../../utils";
import "./Listview.module.less";
import { DatasetScene } from "@src/shared/enum/dataset";

const ListItem = (props: any) => {
  const { data, model_type } = props;
  const [visible, setvisible] = useState(false);
  const datainfo = useGetDataInfo(data.value, model_type);

  const view = useMemo(() => {
    const {
      // url,
      dataSet = [],
      // rawImgDataSet,
    } = datainfo;

    if (model_type === "keypoints_based_action") {
      return <Image src={data.src as any} />;
    }

    return (
      <div
        className="UIDatasetVisual_small_wrap"
        onClick={() => setvisible(true)}
      >
        <UIDatasetVisual
          url={data.src}
          zoom={false}
          canvasData={dataSet}
          drawCanvasData={
            model_type === "detection" ||
            model_type === "monocular_3d_detection" ||
            model_type === DatasetScene.ImageRetrieval
          }
          hasHtmlTips={
            model_type === "classify" ||
            model_type === DatasetScene.ImageRetrieval
          }
        />
      </div>
    );
  }, [datainfo, model_type, data]);

  const modalView = useMemo(() => {
    const { dataSet } = datainfo || {};
    return (
      <Modal
        title={null}
        open={visible}
        // maskClosable={false}
        // keyboard={false}
        onOk={() => setvisible(false)}
        onCancel={() => setvisible(false)}
        destroyOnClose
        getContainer={document.getElementById("root") as HTMLDivElement}
        footer={[]}
        className="global_dataset_view_modal"
      >
        <UIDatasetVisual
          url={data.src}
          zoom={true}
          canvasData={dataSet || []}
          drawCanvasData={
            model_type === "detection" ||
            model_type === "monocular_3d_detection" ||
            model_type === DatasetScene.ImageRetrieval
          }
          hasHtmlTips={
            model_type === "classify" ||
            model_type === DatasetScene.ImageRetrieval
          }
          key={data.src + "big"}
        />
      </Modal>
    );
  }, [datainfo, model_type, visible, data]);
  return (
    <div className="ListItem_wrap">
      {view}
      {modalView}
    </div>
  );
};

const Listview = (props: any): JSX.Element => {
  const { dataList, versionInfo } = props;
  const { model_type } = versionInfo;
  return (
    <div styleName="Listview">
      <ReactCusScrollBar id="ReactCusScrollBar">
        <div className="Listview_wrap">
          {(dataList as any[]).map((o) => {
            return <ListItem data={o} key={o.src} model_type={model_type} />;
          })}
        </div>
      </ReactCusScrollBar>
    </div>
  );
};

export default Listview;
