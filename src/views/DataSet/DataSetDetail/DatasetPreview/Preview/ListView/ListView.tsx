import React from 'react'
import { ReactCusScrollBar } from "@src/UIComponents";
import { useState, useEffect, useRef, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { isNil } from "lodash";
import ListItem from "./ListItem";
import api from "@api";
import "./ListView.module.less";
import { currentClassAtom } from '../../../store';
import { useAtom } from 'jotai';

export type FectData = {
  isInit?: boolean;
  callback?: () => void;
};

type Props = {
  scenes: string;
  currentId: any;
  id: string;
};

const ListView = (props: Props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { currentId, scenes, id } = props;
  const [classInfo] = useAtom(currentClassAtom)

  const { name } = classInfo || {};
  const [show, setShow] = useState(false);

  const params = useRef({
    page: 1,
    page_size: 50,
    scene: undefined,
  });

  const [datasetTotal, setDatasetTotal] = useState(0);
  const datasetList = useRef<Array<any>>([]);
  const [dataListLen, setDataListLen] = useState(0);

  const lastId = useRef<string>("");

  useEffect(() => {
    setShow(true);
  }, []);

  const fetchData = async (funcInfo?: FectData) => {
    if (!currentId || loading || !name) {
      return;
    }

    try {
      let _datasetList = funcInfo?.isInit ? [] : [...datasetList.current];

      if (funcInfo?.isInit || lastId.current !== currentId) {
        const scrollRef = document.getElementById("scrollableDiv")
          ?.firstChild as any;
        if (scrollRef) {
          scrollRef?.scrollTo({
            top: 0,
            // behavior: 'smooth'
          });
        }
        _datasetList = [];
        params.current.page = 1;
      }
      lastId.current = currentId;

      setLoading(true)
      const res = await api.get(
        `/v3/datasets/${id}/sub-datasets/${currentId}/images`,
        { params: { ...params.current, class: name } }
      );
      setLoading(false)

      if (res.code !== 0 || !res.data) return 

      const { items, total } = res.data;

      if (!isNil(items)) {
        datasetList.current = [..._datasetList.concat(items)];
      }

      setDataListLen(datasetList.current.length);
      setDatasetTotal(total);

      funcInfo?.callback && funcInfo.callback();
    } catch (e) {}
  }

  useEffect(() => {
    fetchData({ isInit: true });
  }, [currentId, id, name]);

  const fetchMoreData = () => {
    params.current.page++;
    fetchData();
  };

  const list = useMemo(() => {
    console.log('gen...')
    if (dataListLen === 0 || datasetTotal === 0) {
      return null;
    }
    return datasetList.current.map((o, idx) => {
      return (
        <ListItem key={o.hash + "-" + currentId + "_" + idx} data={o} scenes={scenes} />
      );
    });
  }, [dataListLen, name, datasetTotal, scenes, currentId]);

  return (
    <div styleName="ListView">
      <ReactCusScrollBar
        id="scrollableDiv"
      >
        {show ? (
          <InfiniteScroll
            dataLength={datasetList.current.length}
            next={fetchMoreData}
            hasMore={datasetList.current.length < datasetTotal}
            loader={
              <div className="loader">
                <Spin spinning={true} tip="loading"></Spin>
              </div>
            }
            scrollableTarget={
              document.getElementById("scrollableDiv")?.firstChild as any
            }
          >
            <div className="dataset_list_wrap">{list}</div>
          </InfiniteScroll>
        ) : null}
      </ReactCusScrollBar>
    </div>
  );
};

export default ListView;
