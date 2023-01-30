import ModelDetailType from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reducer/index";
import { Select } from "antd";
import { GSelect } from "@src/UIComponents";
import { setCurrentVersion } from "@reducer/modelDetailSlice";
import { socketPushMsgForProject } from "@ghooks";
import "./VerticalTabHandle.module.less";

// import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useMemo } from "react";
import { DatasetScene } from "@src/shared/enum/dataset";

const { Option } = Select;

const VerticalTabHandle = (
  props: ModelDetailType.VerticalTabHandleProps
): JSX.Element => {
  const { tabIndex, setTabIndex } = props;
  const dispatch = useDispatch();

  const versionList = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionList;
  });

  const currentVersion = useSelector((state: RootState) => {
    return state.modelDetailSlice.currentVersion;
  });

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {};
  });

  const model_type = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo?.model_type;
  });

  const Title = (title: string) => {
    return <div className="title">{title}</div>;
  };
  const handleClick = (primaryKey: ModelDetailType.TabIndex) => {
    setTabIndex(primaryKey);
  };

  const getCls = (primaryKey: ModelDetailType.TabIndex) => {
    if (tabIndex === primaryKey) {
      return "tab_item tab_item_active";
    }

    return "tab_item";
  };

  const TabItem = (text: string, primaryKey: ModelDetailType.TabIndex) => {
    return (
      <div
        onClick={() => handleClick(primaryKey)}
        className={getCls(primaryKey)}
      >
        {text}
      </div>
    );
  };

  const GselectView = useMemo(() => {
    const handleChange = (value: any, option: any) => {
      console.log(option);
      try {
        if (option) {
          const { data } = option;
          const { id: version_id } = data;
          if (activePipeLine.APP_MODEL_TRAIN_DETAIL) {
            const _data = Object.assign(
              { ...activePipeLine.APP_MODEL_TRAIN_DETAIL },
              { version_id }
            );
            socketPushMsgForProject(activePipeLine, {
              APP_MODEL_TRAIN_DETAIL: _data,
            });
          }

          dispatch(setCurrentVersion(data));
          // dispatch(setAc)
        }
      } catch (e) {
        console.error(e);
      }
    };
    return (
      <GSelect onChange={handleChange} value={currentVersion.id}>
        {versionList.map((data) => {
          return (
            <Option key={data.id} value={data.id} data={data}>
              {data.name}
            </Option>
          );
        })}
      </GSelect>
    );
  }, [currentVersion, versionList, activePipeLine, dispatch]);

  const getMenuList = () => {
    if (model_type === "classify") {
      return (
        <>
          {TabItem("模型对比", "model_contrast")}
          {TabItem("错误分析", "error_analysis")}
        </>
      );
    }

    if (model_type === "detection") {
      return (
        <>
          {TabItem("模型对比", "model_contrast")}
          {TabItem("错误分析", "error_analysis")}
        </>
      );
    }
    if (model_type === "car_pose_detection") {
      return <>{TabItem("错误分析", "error_analysis")}</>;
    }
    if (
      model_type === "cityscapes_segment" ||
      model_type === "pose_detection"
    ) {
      return <>{TabItem("错误分析", "error_analysis")}</>;
    }

    if (model_type === DatasetScene.KeypointsDetection) {
      return (
        <>
          {
            TabItem('错误分析', 'error_analysis')
          }
        </>
      )
    }

    if (model_type === DatasetScene.ImageRetrieval) {
      return (
        <>
          {
            TabItem('错误分析', 'error_analysis')
          }
        </>
      )
    }
  };

  return (
    <div styleName="VerticalTabHandle">
      <div className="VerticalTabHandle_block">
        {Title("模型版本")}
        <div className="select_model_version_wrap">{GselectView}</div>
      </div>
      <div className="VerticalTabHandle_block">
        {Title("训练过程")}
        {TabItem("训练过程", "train_process")}
      </div>
      <div className="VerticalTabHandle_block">
        {Title("模型评估")}
        {TabItem("模型预测 ", "model_forecast")}
        {getMenuList()}
      </div>
    </div>
  );
};

export default VerticalTabHandle;
