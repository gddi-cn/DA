import { useState, useEffect } from "react";
import { transformModelOutputData } from "./transformModelOutputData";
import { isNil, isEmpty } from "lodash";

export const useGetDataInfo = (data: any, scenes: any) => {
  const [dataInfo, setDataInfo] = useState<any>({});

  useEffect(() => {
    try {
      if (isEmpty(data) || isNil(data)) {
        return;
      }

      // tm 的会不会代码复用啊，加个功能好几十个地方重复改
      // 你写的时候 ctrl c ctrl v 是舒服
      // 维护的人简直想杀人
      const iamwantyou = transformModelOutputData({ modelType: scenes, data });
      setDataInfo(iamwantyou);
    } catch (e) {
      console.error(e);
    }
  }, [data, scenes]);

  return dataInfo;
};
