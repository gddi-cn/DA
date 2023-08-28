import { UIDatasetVisual, ReactCusScrollBar } from "@src/UIComponents";
import { useMemo, useState } from "react";
// import { isEmpty } from 'lodash'
import { Modal, Image } from "antd";
import { useGetDataInfo } from "../../../utils";
import "./Listview.module.less";
import { DatasetScene } from "@src/shared/enum/dataset";
import styled from "styled-components";
import ZoomArea from "@src/components/ZoomArea";

const ImgWrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  object-fit: contain;
  height: 100%;
  width: 100%;
`

const P: React.FC<{src?: string}> = (
  {
    src,
  }
) => {
  const s = src ? src + `?t=${Date.now()}` : undefined

  return (
    <ImgWrap>
      <ZoomArea>
        <Img
          src={s}
        />
      </ZoomArea>
    </ImgWrap>
  )
}

const ListItem = (props: any) => {
  const { data, model_type } = props;
  const [visible, setvisible] = useState(false);
  const datainfo = useGetDataInfo(data.value, model_type);
  const { dataSet } = datainfo || {}

  const view = useMemo(() => {
    const {
      // url,
      dataSet = [],
      // rawImgDataSet,
    } = datainfo;

    if (model_type === "keypoints_based_action") {
      return (
        <div
          onClick={() => setvisible(true)}
        >
          <Image src={data.src as any} preview={false} />
        </div>
      );
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
            model_type === DatasetScene.OcrRecognition ||
            model_type === DatasetScene.ImageRetrieval
          }
        />
      </div>
    );
  }, [datainfo, model_type, data]);


  return (
    <div className="ListItem_wrap">
      {view}
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
        {
          model_type === DatasetScene.KeyPointsBasedAction ? (
            <P src={(data as any)?.src} />
          ) : (
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
                model_type === DatasetScene.OcrRecognition ||
                model_type === DatasetScene.ImageRetrieval
              }
              key={data.src + "big"}
            />
          )
        }
      </Modal>
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
