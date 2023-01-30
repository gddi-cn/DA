import {
  CarPoseFalseAnalysis,
  CarPoseFalseItem,
  ClassifyFalseAnalysis,
  ClassifyFalseItem,
  DetectionFalseAnalysis,
  DetectionFalseItem,
  KeyPointFalseAnalysis,
  KeyPointFalseItem,
  ModelFalseAnalysis,
  ModelFalseAnalysisItem,
  PoseFalseAnalysis,
  PoseFalseItem,
  SegmentFalseAnalysis,
  SegmentFalseItem,
} from "@src/shared/types/model";
import { ModelFalseItem, ModelFalseType } from "@src/shared/enum/model";
import { modelFalseItemNameMapping } from "@src/shared/mapping/model";
import { DatasetScene } from "@src/shared/enum/dataset";
import _, { isEmpty } from "lodash";
import randomColor from "randomcolor";

// 单目连线规则
const carPoseLinePointArr: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [4, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

// 单目 3d 线条颜色
const carPoseLineColorList: Array<Painter.Color> = [
  [0, 255, 0],
  [0, 255, 0],
  [255, 128, 0],
  [255, 128, 0],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [0, 255, 0],
  [255, 128, 0],
  [0, 255, 0],
  [255, 128, 0],
];

const poseLinePointArr: Array<[number, number]> = [
  [15, 13],
  [13, 11],
  [16, 14],
  [14, 12],
  [11, 12],
  [5, 11],
  [6, 12],
  [5, 6],
  [5, 7],
  [6, 8],
  [7, 9],
  [8, 10],
  [1, 2],
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
];

const poseLineColorList: Array<Painter.Color> = [
  [0, 255, 0],
  [0, 255, 0],
  [255, 128, 0],
  [255, 128, 0],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [0, 255, 0],
  [255, 128, 0],
  [0, 255, 0],
  [255, 128, 0],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
  [51, 153, 255],
];

const array2PointList = (arr: Array<number>): Array<Painter.Point> => {
  if (arr.length === 0 || arr.length % 3 !== 0) return [];
  return _.chunk(arr, 3).map((p) => {
    const [x, y, visible] = p;
    return {
      x,
      y,
      visible: visible > 0.3,
    };
  });
};

const carPosePoints2Line = (
  points: Array<Painter.Point>
): Array<Painter.Line> => {
  if (points?.length !== 8) return [];

  const lines: Array<Painter.Line> = [];

  carPoseLinePointArr.forEach(([si, ei], idx) => {
    const color = carPoseLineColorList[idx];

    const start = points[si];
    const end = points[ei];

    const show = Boolean(start.visible && end.visible);

    lines.push({
      start,
      end,
      color,
      show,
    });
  });

  return lines;
};

const keypointPoint2Line = (
  points: Array<Painter.Point>,
  color: Painter.Color,
  orderList?: Array<[number, number]>
): Array<Painter.Line> => {
  if (!orderList) return []

  const lineList: Array<Painter.Line> = []

  orderList.forEach(([s_idx, e_idx]) => {
    const start = points[s_idx]
    const end = points[e_idx]

    if (!start?.visible || !end?.visible) return

    lineList.push({
      start,
      end,
      color,
      show: true,
    })
  })

  return lineList
}

const posePoints2Line = (points: Array<Painter.Point>): Array<Painter.Line> => {
  if (points?.length !== 17) return [];

  const lines: Array<Painter.Line> = [];

  poseLinePointArr.forEach(([si, ei], idx) => {
    const color = poseLineColorList[idx];

    const start = points[si];
    const end = points[ei];

    const show = Boolean(start.visible && end.visible);

    lines.push({
      start,
      end,
      color,
      show,
      width: 2,
    });
  });

  return lines;
};

const formatDetectionData = (
  rawData?: DetectionFalseItem
): Array<Painter.ImgMeta> => {
  if (!rawData || isEmpty(rawData)) return [];

  return Object.entries(rawData).map(([src, meta]) => {
    const bBoxes: Painter.BBox[] = meta.map((box) => {
      const [label, sx, sy, ex, ey, prob] = box;
      return {
        label,
        leftTop: { x: sx, y: sy },
        rightBottom: { x: ex, y: ey },
        prob,
        fill: true,
      };
    });

    return {
      src,
      bBoxes,
    };
  });
};

const formatClassifyData = (
  rawData?: ClassifyFalseItem
): Array<Painter.ImgMeta> => {
  if (!rawData || isEmpty(rawData)) return [];
  return Object.entries(rawData).map(([src, [label, prob]]) => {
    return {
      src,
      classLabel: {
        label,
        prob,
      },
    };
  });
};

const formatCarPoseData = (
  rawData?: CarPoseFalseItem
): Array<Painter.ImgMeta> => {
  if (!rawData || isEmpty(rawData)) return [];

  return Object.entries(rawData).map(([src, meta]) => {
    const bBoxes: Array<Painter.BBox> = [];
    const lines: Array<Painter.Line> = [];

    meta.forEach(({ box, label, keypoint }) => {
      const [sx, sy, w, h, prob] = box;
      const lineList = carPosePoints2Line(array2PointList(keypoint));

      lines.push(...lineList);

      bBoxes.push({
        label,
        prob: Number(prob.toFixed(2)),
        leftTop: { x: sx, y: sy },
        rightBottom: { x: sx + w, y: sy + h },
        fill: false,
      });
    });

    return {
      src,
      bBoxes,
      lines,
    };
  });
};

const formatKeyPotintData = (
  rawData?: KeyPointFalseItem,
  orderList?: Array<[number, number]>
): Array<Painter.ImgMeta> => {
  if (!rawData || isEmpty(rawData)) return [];

  return Object.entries(rawData).map(([src, meta]) => {
    const bBoxes: Array<Painter.BBox> = [];
    const lines: Array<Painter.Line> = [];

    meta.forEach(({ box, label, keypoint }) => {
      const [sx, sy, w, h, prob] = box;
      const pointList = array2PointList(keypoint)

      const color =
        randomColor({
          seed: label + '_line',
          format: 'rgbArray',
          luminosity: 'bright'
        }) as any

      lines.push(...keypointPoint2Line(pointList, color, orderList))

      bBoxes.push({
        label,
        prob: Number(prob.toFixed(2)),
        leftTop: { x: sx, y: sy },
        rightBottom: { x: sx + w, y: sy + h },
        fill: false,
      });
    });

    return {
      src,
      bBoxes,
      lines,
    };
  });
};

const formatPoseData = (rawData?: PoseFalseItem): Array<Painter.ImgMeta> => {
  if (!rawData || isEmpty(rawData)) return [];

  return Object.entries(rawData).map(([src, meta]) => {
    const bBoxes: Array<Painter.BBox> = [];
    const lines: Array<Painter.Line> = [];

    meta.forEach(({ box, label, keypoint }) => {
      const [sx, sy, w, h, prob] = box;
      const lineList = posePoints2Line(array2PointList(keypoint));

      lines.push(...lineList);

      bBoxes.push({
        label,
        prob: Number(prob.toFixed(2)),
        leftTop: { x: sx, y: sy },
        rightBottom: { x: sx + w, y: sy + h },
        fill: false,
      });
    });

    return {
      src,
      bBoxes,
      lines,
    };
  });
};

const formatCityscapesSegmentData = (
  rawData?: SegmentFalseItem
): Array<Painter.ImgMeta> => {
  if (!rawData) return [];

  return Object.entries(rawData).map(([rawSrc, src]) => ({
    rawSrc,
    src,
  }));
};

const formatDetection = (
  falseAnalysis: DetectionFalseAnalysis,
  scene: ModelFalseType
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score || 0,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatDetectionData(value.bbox),
      })
    );
  }

  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.bbox,
          }));
      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatDetectionData(data),
      };
    }
  );
};

const formatClassify = (
  falseAnalysis: ClassifyFalseAnalysis,
  scene: ModelFalseType
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score || 0,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatClassifyData(value.bbox),
      })
    );
  }

  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.bbox,
          }));
      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatClassifyData(data),
      };
    }
  );
};

const formatCarPoseDetection = (
  falseAnalysis: CarPoseFalseAnalysis,
  scene: ModelFalseType
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatCarPoseData(value.results),
      })
    );
  }

  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.results,
          }));

      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatCarPoseData(data),
      };
    }
  );
};

const formatKeyPointDetection = (
  falseAnalysis: KeyPointFalseAnalysis,
  scene: ModelFalseType,
  orderList?: Array<[number, number]>
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatKeyPotintData(value.results, orderList),
      })
    );
  }
  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.results,
          }));

      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatKeyPotintData(data, orderList),
      };
    }
  );
};

const formatCityscapesSegment = (
  falseAnalysis: SegmentFalseAnalysis,
  scene: ModelFalseType,
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatCityscapesSegmentData(value.results),
      })
    );
  }

  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.results,
          }));

      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatCityscapesSegmentData(data),
      };
    }
  );
};

const formatPoseDetection = (
  falseAnalysis: PoseFalseAnalysis,
  scene: ModelFalseType
): Array<ModelFalseAnalysisItem> => {
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false)) return [];

    return Object.entries(falseAnalysis.scene_false).map(
      ([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score,
        sceneTip: {
          label:
            modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) ||
            analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: "",
          wrongLabel: "",
          wrongNum: 0,
        },
        dataList: formatPoseData(value.results),
      })
    );
  }

  if (isEmpty(falseAnalysis.confusion_matrix)) return [];

  return Object.entries(falseAnalysis.confusion_matrix).map(
    ([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value)
        ? [{ wrongLabel: "", wrongNum: 0, data: undefined }]
        : Object.entries(value).map(([wrongLabel, res]) => ({
            wrongLabel,
            wrongNum: res.cnt,
            data: res.results,
          }));

      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: "",
          advice: "",
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatPoseData(data),
      };
    }
  );
};

export const formatFalseAnalysis = (
  scene: DatasetScene,
  falseAnalysis: ModelFalseAnalysis,
  falseType: ModelFalseType,
  orderList?: Array<[number, number]>
): Array<ModelFalseAnalysisItem> => {
  switch (scene) {
    case DatasetScene.Detection:
      return formatDetection(
        falseAnalysis as DetectionFalseAnalysis,
        falseType
      );
    case DatasetScene.Classify:
      return formatClassify(falseAnalysis as ClassifyFalseAnalysis, falseType);
    case DatasetScene.CarPoseDetection:
      return formatCarPoseDetection(
        falseAnalysis as CarPoseFalseAnalysis,
        falseType
      );
    case DatasetScene.KeypointsDetection:
      return formatKeyPointDetection(
        falseAnalysis as KeyPointFalseAnalysis,
        falseType,
        orderList,
      )
    case DatasetScene.CityscapesSegment:
      return formatCityscapesSegment(
        falseAnalysis as SegmentFalseAnalysis,
        falseType
      );
    case DatasetScene.PoseDetection:
      return formatPoseDetection(falseAnalysis as PoseFalseAnalysis, falseType);
    default:
      return [];
  }
};
