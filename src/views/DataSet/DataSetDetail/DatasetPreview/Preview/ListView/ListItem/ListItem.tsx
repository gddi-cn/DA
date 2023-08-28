import { useGetDataInfo } from "../../utils/getDataInfo";
import { UIDatasetVisual, FlvMp4 } from "@src/UIComponents";

import { useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { Modal } from "antd";
import "./ListItem.module.less";
import { DatasetScene } from "@src/shared/enum/dataset";

type Props = {
  data: any;
  scenes: string;
};
const ListItem = (props: Props): JSX.Element => {
  console.log({ props })
  const { data, scenes } = props;
  const [visible, setvisible] = useState(false);
  const datainfo = useGetDataInfo(data, scenes);
  console.log({ datainfo })

  // console.log(data)
  const view = useMemo(() => {
    if (isEmpty(datainfo)) {
      return null;
    }
    const {
      thumbnailUrl,
      url,
      dataSet,
      // rawImgDataSet,
    } = datainfo;

    if (scenes === "keypoints_based_action") {
      return <FlvMp4 src={url as any} />;
    }

    return (
      <div
        className="UIDatasetVisual_small_wrap"
        onClick={() => setvisible(true)}
      >
        <UIDatasetVisual
          url={thumbnailUrl || url}
          zoom={false}
          canvasData={dataSet || []}
          drawCanvasData={
            scenes === "detection" ||
            scenes === "monocular_3d_detection" ||
            scenes === DatasetScene.KeypointsDetection ||
            scenes === DatasetScene.ImageRetrieval
          }
          hasHtmlTips={
            scenes === "classify" ||
            scenes === DatasetScene.OcrRecognition ||
            scenes === DatasetScene.ImageRetrieval
          }
        />
      </div>
    );
  }, [datainfo, scenes]);

  const modalView = useMemo(() => {
    if (isEmpty(datainfo)) {
      return null;
    }
    const {
      url,

      rawImgDataSet,
    } = datainfo;
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
          url={url}
          zoom={true}
          canvasData={rawImgDataSet || []}
          drawCanvasData={
            scenes === "detection" ||
            scenes === "monocular_3d_detection" ||
            scenes === DatasetScene.KeypointsDetection
          }
          hasHtmlTips={
            scenes === "classify" ||
            scenes === DatasetScene.OcrRecognition ||
            scenes === DatasetScene.ImageRetrieval
          }
        />
      </Modal>
    );
  }, [datainfo, scenes, visible]);

  return (
    <div styleName="ListItem">
      {view}
      {modalView}
    </div>
  );
};

export default ListItem;
