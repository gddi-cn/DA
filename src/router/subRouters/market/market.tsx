
import {
  APP_GUIDE_PAGE,
  APP_DATA_SET_INDEX,
  APP_MODEL_INDEX,
  APP_DATASET_DETAIL,
  APP_DATASET_CREATE_TYPE,

  APP_DATASET_ANALYSE,
  APP_MODEL_TRAIN_CONFIG,
  APP_MODEL_TRAIN_DETAIL,
  APP_SELECT_DEPLOY_TYPE,
  APP_SelectModule,
  APP_SetModuleConfig,
  APP_ForecastModule,
  APP_SelectDevice,
  APP_AfterDeployed,
  APP_SDK_Documents,
  APP_DEVICE_INDEX,
  APP_IncreaseData,
  APP_UNREMARKED_CREATE,
  APP_ORDER_PROCESS,
  APP_EXPERIENCE,
  APP_PLATFORM, SPACE, SPACE_ACCOUNT, SPACE_API, SPACE_DEVICE, SPACE_DEPLOY
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'
import localfile from '../localfile';
import thirdparty from '../thirdparty';

const NotFound = lazy(() => import('@src/views/NotFound'));

const App = lazy(() => import('@src/views/container/app'));
const NoScoketLayout = lazy(() => import('@src/views/container/NoScoketLayout'));
const AutoMLLayout = lazy(() => import('@src/views/container/AutoMLLayout'));

const TaskStepLayout = lazy(() => import('@src/views/container/TaskStepLayout'));

const GuideHome = lazy(() => import('@src/views/GuideHome'));

const DataSetIndex = lazy(() => import('@src/views/DataSet/DataSetIndex'));

const IncreaseData = lazy(() => import('@src/views/DataSet/IncreaseData'));

const DataSetDetail = lazy(() => import('@src/views/DataSet/DataSetDetail'));

const ModelIndex = lazy(() => import('@src/views/Model/ModelIndex'));

// const SelectCreateType = lazy(() => import('@src/views/DataSet/CreateDataSet/SelectCreateType'));
const SelectCreateType = lazy(() => import('@src/views/DataSet/CreateDataSet/CreateTypeSelector'));

// 曼浮
const CreateUnremarked = lazy(() => import('@src/views/DataSet/CreateDataSet/Unremarked'))
const OrderDetail = lazy(() => import('@src/views/Order'))

const DatasetAnalysis = lazy(() => import('@src/views/DataSet/DatasetAnalysis'));

// const ModelTrainConfig = lazy(() => import('@src/views/Model/ModelTrainConfig'));
const ModelTrainConfig = lazy(() => import('@src/views/Model/TrainConfig'));

const ModelDetail = lazy(() => import('@src/views/Model/ModelDetail'));

// const SelectDeployType = lazy(() => import('@src/views/Deployment/SelectDeployType'));
const DeployTypeSelector = lazy(() => import('@src/views/Deployment/TypeSelector'));

const Documents = lazy(() => import('@src/views/Deployment/BySDK/Documents'));

// 部署
// 体验
const Experience = lazy(() => import('@src/views/Experience'))
// 平台
const Platform = lazy(() => import('@src/views/Platform'))

const Space = lazy(() => import('@src/views/Space'))
const Account = lazy(() => import('@src/views/Account'))
const ApiKey = lazy(() => import('@src/views/ApiKey'))
const Device = lazy(() => import('@src/views/SpaceDevice'))
const SpaceDeploy = lazy(() => import('@src/views/SpaceDeploy'))

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    // 仅有头部任务的
    {
      element: SuspenseFn(NoScoketLayout),
      children: [
        {
          path: SPACE,
          element: SuspenseFn(Space),
          children: [
            {
              path: SPACE_ACCOUNT,
              element: SuspenseFn(Account),
            },
            {
              path: SPACE_API,
              element: SuspenseFn(ApiKey),
            },
            {
              path: SPACE_DEVICE,
              element: SuspenseFn(Device),
            },
            {
              path: SPACE_DEPLOY,
              element: SuspenseFn(SpaceDeploy),
            },
          ],
        }
      ]

    },
    {

      element: SuspenseFn(AutoMLLayout),
      children: [
        {
          path: APP_GUIDE_PAGE,
          element: SuspenseFn(GuideHome),

        },
        {
          path: APP_DATASET_CREATE_TYPE,
          element: SuspenseFn(SelectCreateType),
        },
        {
          path: APP_UNREMARKED_CREATE,
          element: SuspenseFn(CreateUnremarked)
        },
        {
          path: APP_ORDER_PROCESS,
          element: SuspenseFn(OrderDetail)
        },
        // 本地文件上传

        localfile,

        // 第三方
        thirdparty,

        // 有步骤条的
        {
          path: '/app/',
          strict: true,
          element: SuspenseFn(TaskStepLayout),
          children: [
            {
              path: APP_MODEL_INDEX,
              element: SuspenseFn(ModelIndex),

            },
            {
              path: APP_DATA_SET_INDEX,
              element: SuspenseFn(DataSetIndex),

            },
            {
              path: APP_DATASET_DETAIL,
              element: SuspenseFn(DataSetDetail),

            },
            {
              path: APP_DATASET_ANALYSE,
              element: SuspenseFn(DatasetAnalysis),

            },
            {
              path: APP_MODEL_TRAIN_CONFIG,
              element: SuspenseFn(ModelTrainConfig),

            },
            {
              path: APP_MODEL_TRAIN_DETAIL,
              element: SuspenseFn(ModelDetail),

            },

            {
              path: APP_SELECT_DEPLOY_TYPE,
              element: SuspenseFn(DeployTypeSelector),

            },
            {
              path: APP_EXPERIENCE,
              element: SuspenseFn(Experience)
            },
            {
              path: APP_PLATFORM,
              element: SuspenseFn(Platform)
            },
            {
              path: APP_SDK_Documents,
              element: SuspenseFn(Documents),

            },

            {
              path: APP_IncreaseData,
              element: SuspenseFn(IncreaseData),

            },

            {
              path: '*',
              element: SuspenseFn(NotFound),
            },
          ]
        },
        {
          path: '*',
          element: SuspenseFn(NotFound),
        },
      ]
    },

  ]
}
