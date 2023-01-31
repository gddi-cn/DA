import empty from "@src/asset/images/empty.png";
import { isEmpty, isNil } from "lodash";
import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import { DatasetScene } from "@src/shared/enum/dataset";
import _ from "lodash";
import { useAtom } from "jotai";
import { keypointOrderAtom } from "../../../store";

const transformColor = (color: string, alpha: number) => {
  return color.trim().replace(/\s{0,}\d{0,}\.{0,}\d{0,}\)$/, alpha + ")");
};

// cityscapes_segment: '通用分割',
//   portrait_segment: '肖像分割',

// thumbnailUrl: '',
//   url: '',
//     dataSet: [],
//       rawImgDataSet: [],
//         width: 0,
//           height: 0

export const processData = (
  data: any,
  scenes: any,
  orderList?: Array<[number, number]>
) => {
  let iamwantyou: any = {};
  let dataSet: any = [];
  let rawImgDataSet: any = [];

  const {
    position,
    thumbnail_width: tw,
    thumbnail_height: th,
    thumbnail,
    url,
    width,
    height,
    annotations = [],
  } = data;

  // if (scenes === 'keypoints_based_action'){

  // }

  if (
    (scenes as string).includes("segment") ||
    scenes === "pose_detection" ||
    scenes === "car_pose_detection" ||
    scenes === "keypoints_based_action"
  ) {
    const first = annotations[0];
    if (first) {
      const { position } = first;
      const { render } = position;
      iamwantyou = {
        thumbnailUrl: render || url,
        url: render || url,
        dataSet: [],
        rawImgDataSet: [],
      };
    } else {
      iamwantyou = {
        thumbnailUrl: url,
        url: url,
        dataSet: [],
        rawImgDataSet: [],
      };
    }

    return iamwantyou;
  }

  if (scenes === DatasetScene.KeypointsDetection) {
    annotations.forEach((anno: any) => {
      const { class: label, position } = anno;

      const box_color = randomColor({
        seed: label + "_box",
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });

      const line_color = randomColor({
        seed: label + "_line",
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });

      position.forEach((p: any) => {
        const { bbox, keypoints } = p;
        const pointList = _.chunk(keypoints, 3) as Array<
          [number, number, number]
        >;

        pointList.forEach((point) => {
          const [x, y, v] = point as [number, number, number];
          if (v < 0) return;

          rawImgDataSet.push({
            type: "circle",
            circle: {
              fill: line_color,
              radius: 4,
              top: y * height - 4,
              left: x * width - 4,
            },
          });

          dataSet.push({
            type: "circle",
            circle: {
              fill: line_color,
              radius: 4,
              top: y * th - 4,
              left: x * tw - 4,
            },
          });
        });
        (orderList || []).forEach(([s_idx, e_idx]) => {
          const s_point = pointList[s_idx];
          const e_point = pointList[e_idx];

          if (s_point?.length !== 3 || e_point?.length !== 3) return;

          if (s_point[2] < 0 || e_point[2] < 0) return;

          const r_line = [
            s_point[0] * width,
            s_point[1] * height,
            e_point[0] * width,
            e_point[1] * height,
          ];

          const line = [
            s_point[0] * tw,
            s_point[1] * th,
            e_point[0] * tw,
            e_point[1] * th,
          ];

          rawImgDataSet.push({
            type: "line",
            stroke: line_color,
            line: r_line,
          });

          dataSet.push({
            type: "line",
            stroke: line_color,
            line,
          });
        });

        const [x1, y1, x2, y2] = bbox;

        rawImgDataSet.push({
          stroke: box_color,
          // x y w h
          rectData: [
            x1 * width,
            y1 * height,
            (x2 - x1) * width,
            (y2 - y1) * height,
          ],
          label: "",
          type: "CustomRect",
        });

        dataSet.push({
          stroke: box_color,
          rectData: [x1 * tw, y1 * th, (x2 - x1) * tw, (y2 - y1) * th],
          label: "",
          type: "CustomRect",
        });
      });
    });
  }

  if (scenes === "monocular_3d_detection") {
    position?.map((dso: any) => {
      const { position } = dso;
      const label = dso.class;
      // 返回的数据有点迷惑性
      const percnetPoints = JSON.parse(position).position;
      const absolutionPoints = percnetPoints?.map((o: any) => {
        const [p1, p2] = o;

        return {
          x: p1 * width,
          y: p2 * height,
        };
      });

      const thumbnailAbsolutionPoints = percnetPoints?.map((o: any) => {
        const [p1, p2] = o;
        return {
          x: p1 * tw,
          y: p2 * th,
        };
      });
      // 绝对坐标的8个点
      const [p1, p2, p3, p4, p5, p6, p7, p8] = absolutionPoints;
      // 算法那边定的面的顺序
      const surfaces = [
        [p1, p2, p3, p4], // bottom
        [p7, p6, p2, p3], // font
        [p7, p8, p4, p3], // right
        [p8, p5, p1, p4], // end
        [p8, p5, p6, p7], // top
        [p6, p5, p1, p2], // left
      ];

      // 绝对坐标的8个点
      const [tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8] =
        thumbnailAbsolutionPoints;
      // 算法那边定的面的顺序
      const tsurfaces = [
        [tp1, tp2, tp3, tp4], // bottom
        [tp7, tp6, tp2, tp3], // font
        [tp7, tp8, tp4, tp3], // right
        [tp8, tp5, tp1, tp4], // end
        [tp8, tp5, tp6, tp7], // top
        [tp6, tp5, tp1, tp2], // left
      ];
      const color = randomColor({
        seed: label,
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });

      for (let i = 0; i < surfaces.length; i++) {
        const rData: any = {
          fill: transformColor(color, 0.15), // 迷一样
          stroke: color,
          // x y w h
          points: surfaces[i],
          // labelText: label + (persent === undefined ? '' : '-' + persent)

          type: "CustomPolygon",
        };

        const nData: any = {
          fill: transformColor(color, 0.15), // 迷一样
          stroke: color,
          // x y w h
          points: tsurfaces[i],
          // labelText: label + (persent === undefined ? '' : '-' + persent)

          type: "CustomPolygon",
        };
        if (i === 3) {
          rData.label = label;
          nData.label = label;
        }
        rawImgDataSet.push(rData);
        dataSet.push(nData);
      }

      return "";
    });
  }

  if (scenes === "detection") {
    for (let i = 0; i < annotations.length; i++) {
      const { position = [], class: label } = annotations[i];
      const color = randomColor({
        seed: label,
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });
      for (let j = 0; j < position.length; j++) {
        const [x, y, w, h] = position[j];
        rawImgDataSet.push({
          fill: transformColor(color, 0.35), // 迷一样
          stroke: color,
          // x y w h
          rectData: [
            x * width,
            y * height,
            w * width - x * width,
            h * height - y * height,
          ],
          // labelText: label + (persent === undefined ? '' : '-' + persent)
          label: label,
          type: "CustomRect",
        });

        dataSet.push({
          fill: transformColor(color, 0.35), // 迷一样
          stroke: color,
          rectData: [x * tw, y * th, w * tw - x * tw, h * th - y * th],
          // labelText: label + (persent === undefined ? '' : '-' + persent)
          label: label,
          type: "CustomRect",
        });
      }
    }
  }

  if (scenes === "classify" || scenes === DatasetScene.ImageRetrieval) {
    dataSet = annotations?.map((dso: any) => {
      const label = dso.class;
      const color = randomColor({
        seed: label,
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });
      // console.warn(colorMap)
      return {
        fill: transformColor(color, 0.35),
        stroke: color,

        // labelText: label + (persent === undefined ? '' : '-' + persent)
        label,
      };
    });

    rawImgDataSet = annotations?.map((dso: any) => {
      const label = dso.class;
      const color = randomColor({
        seed: label,
        format: "rgba",
        luminosity: "bright",
        alpha: 1,
      });
      return {
        fill: transformColor(color, 0.35),
        stroke: color,
        label,
      };
    });
  }

  const getUrl = () => {
    if (
      scenes !== "classify" &&
      scenes !== "detection" &&
      scenes !== "monocular_3d_detection" &&
      scenes !== DatasetScene.KeypointsDetection &&
      scenes !== DatasetScene.ImageRetrieval
    ) {
      return position;
    } else {
      return url;
    }
  };

  const getthumbnail = () => {
    if (
      scenes !== "classify" &&
      scenes !== "detection" &&
      scenes !== "monocular_3d_detection" &&
      scenes !== DatasetScene.KeypointsDetection &&
      scenes !== DatasetScene.ImageRetrieval
    ) {
      return position;
    } else {
      return thumbnail || empty;
    }
  };

  iamwantyou = {
    thumbnailUrl: getthumbnail(),
    url: getUrl(),
    dataSet,
    rawImgDataSet,
    width,
    height,
  };

  return iamwantyou;
};

export const useGetDataInfo = (data: any, scenes: any) => {
  const [dataInfo, setDataInfo] = useState<any>({});
  const [orderList] = useAtom(keypointOrderAtom);

  useEffect(() => {
    try {
      if (isEmpty(data) || isNil(data)) {
        return;
      }

      const iamwantyou = processData(data, scenes, orderList);

      setDataInfo(iamwantyou);
    } catch (e) {
      console.log(e);
    }
  }, [data, scenes]);

  return dataInfo;
};
