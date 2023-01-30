import api from "@api";
import { useState, useEffect, useRef, useCallback } from "react";
import { ImageSlider, UIDatasetVisual, FlvMp4 } from "@src/UIComponents";
import { processData } from "../utils/getDataInfo";
import { isEmpty } from "lodash";

import "./SlickView.module.less";
import { DatasetScene } from "@src/shared/enum/dataset";
import { useAtom } from "jotai";
import { keypointOrderAtom } from "../../../store";

export type FectData = {
  isInit?: boolean;

  callback?: () => void;
};

type RenderViewProps = {
  data: any;
  scenes: string;
  orderList?: Array<[number, number]>;
};
type Props = {
  scenes: string;
  classInfo: any;
  currentId: any;
  id: string;
};

const RenderView = (props: RenderViewProps) => {
  const { data, scenes, orderList } = props;
  const datainfo = processData(data, scenes, orderList);
  if (isEmpty(datainfo?.url)) {
    return null;
  }

  const { url, rawImgDataSet } = datainfo;

  if (scenes === "keypoints_based_action") {
    return <FlvMp4 src={url as any} />;
  }
  // 这里不能让react复用、我猜是离屏canvas导致的缓存问题~
  return (
    <UIDatasetVisual
      key={Math.random().toString(36).slice(2)}
      url={url}
      zoom={true}
      canvasData={rawImgDataSet || []}
      drawCanvasData={
        scenes === "detection" ||
        scenes === "monocular_3d_detection" ||
        scenes === DatasetScene.KeypointsDetection ||
        scenes === DatasetScene.ImageRetrieval
      }
      hasHtmlTips={scenes === "classify" || scenes === DatasetScene.ImageRetrieval}
    />
  );
};

const SlickView = (props: Props): JSX.Element => {
  const { currentId, scenes, classInfo, id } = props;
  const { name } = classInfo || {};
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [total, setTotal] = useState<number>(0);
  const [orderList] = useAtom(keypointOrderAtom);

  const params = useRef({
    page_size: 10,
    scene: undefined,
  });

  const page = useRef(0);

  const fetchData = useCallback(
    async (funcInfo?: FectData) => {
      try {
        if (funcInfo) {
          // 初始化
          const { isInit } = funcInfo;
          if (isInit) {
            const scrollRef = document.getElementById("scrollableDiv")
              ?.firstChild as any;
            if (scrollRef) {
              scrollRef?.scrollTo({
                top: 0,
                // behavior: 'smooth'
              });
            }

            page.current = 1;
          }
        }
        if (!name) {
          return;
        }
        const res = await api.get(
          `/v3/datasets/${id}/sub-datasets/${currentId}/images`,
          { params: { ...params.current, page: page.current, class: name } }
        );
        if (res.code === 0) {
          const { items, total } = res.data;
          setDataList(items || []);
          setTotal(total);

          funcInfo?.callback && funcInfo.callback();
        } else {
        }
      } catch (e) {}
    },
    [currentId, id, name]
  );

  useEffect(() => {
    fetchData({ isInit: true });
    // const fn = () => {
    //   fetchData({ isInit: true })
    // }
    // window.addEventListener('resize', fn)
    // return () => {
    //   window.removeEventListener('resize', fn)
    // }
  }, [fetchData]);

  const renderView = (data: any) => {
    return <RenderView data={data} scenes={scenes} orderList={orderList} />;
  };

  const renderDotView = (o: any) => {
    return <img className="img_dot_btn" src={o?.thumbnail} />;
  };
  return (
    <div styleName="SlickView">
      <ImageSlider
        needCache={true}
        page={page}
        fetchData={fetchData}
        total={total}
        dataList={dataList}
        renderView={renderView}
        renderDotView={renderDotView}
      />
    </div>
  );
};

export default SlickView;
