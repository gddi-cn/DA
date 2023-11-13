import { ReactCusScrollBar } from '@src/UIComponents'
import { ReactComponent as Xunliancanshu } from './icon/训练参数.svg'
import { ReactComponent as Xunlianjingdu } from './icon/训练精度.svg'
import { ReactComponent as Yuceshili } from './icon/预测示例.svg'
import ModelInfomations from '../ModelInfomations'
import TabsHeader from '@src/UIComponents/ControlledTabsHeader'

import ForecastExample from './ForecastExample'
import TrainingAccuracy from './TrainingAccuracy'
import TrainingParameters from './TrainingParameters'
import './Transversion.module.less'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@src/controller/reducer'
import { DatasetScene } from '@src/shared/enum/dataset'
// import ModelDetailType from '../../types'

type SubTabIndex = 'ForecastExample' | 'TrainingAccuracy' | 'TrainingParameters'
const Transversion = (): JSX.Element => {
  const [subTabIndex, setSubTabIndex] = useState<SubTabIndex>('ForecastExample')


  const model_type = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo?.model_type;
  });

  const dataList = React.useMemo(() => {
    const list =
    [
      {
        label: '训练参数',
        primaryKey: 'TrainingParameters',
        icon: <Xunliancanshu />
      },
    ]

    if (model_type !== DatasetScene.OcrRecognition) {
      list.push({
        label: '训练精度',
        primaryKey: 'TrainingAccuracy',
        icon: <Xunlianjingdu />
      })
    }

    if (model_type !== DatasetScene.FaceRecognition && model_type !== DatasetScene.CowFaceRecognition) {
      list.unshift({
        label: '预测示例',
        primaryKey: 'ForecastExample',
        icon: <Yuceshili />
      })
    }
    return list
  }, [model_type])

  React.useEffect(
    () => {
      if (model_type === DatasetScene.FaceRecognition || model_type === DatasetScene.CowFaceRecognition) {
        setSubTabIndex('TrainingAccuracy')
      } else {
        setSubTabIndex('ForecastExample')
      }
    },
    [model_type]
  )


  const handleChangeTab = (key: any) => {
    setSubTabIndex(key)
  }

  const View = useMemo(() => {
    const ReactComp: {
          [index: string]: React.ReactNode
      } = {

        ForecastExample: <ForecastExample />,
        TrainingAccuracy: <TrainingAccuracy />,
        TrainingParameters: <TrainingParameters />,
      }

    return ReactComp[subTabIndex] || null
  }, [subTabIndex])

  return (
    <div styleName='Transversion'>
      {
        useMemo(() => {
          return (
            <div className='model_info_wrap'>
              <ReactCusScrollBar id='ReactCusScrollBar' autoHide>
                <ModelInfomations />
              </ReactCusScrollBar>

            </div>
          )
        }, [])
      }
      <div className='Transversion_wrap'>
        <div className='Transversion_header'>
          <TabsHeader
            dataList={dataList}
            handleChangeTab={handleChangeTab}
            activeKey={subTabIndex}
          />
        </div>
        <div className='Transversion_content'>
          {View}
        </div>
      </div>
    </div>
  )
}

export default Transversion
