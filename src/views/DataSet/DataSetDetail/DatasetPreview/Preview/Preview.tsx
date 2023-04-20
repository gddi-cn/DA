import PreviewHeader from './PreviewHeader'
import React, { useState } from 'react'
import ListView from './ListView'
import SlickView from './SlickView'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import './Preview.module.less'
import { currentDatasetAtom, currentSubDatasetAtom } from '../../store'
import { useAtom } from 'jotai'
import { Dataset } from '@src/shared/types/dataset'
import { DatasetScene } from '@src/shared/enum/dataset'

const Preview = (): JSX.Element => {
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)

  const detail = React.useMemo(() => {
    if (!datasetInfo) return {} as Dataset
    if (datasetInfo.scene === DatasetScene.FaceRecognition) {
      return {...datasetInfo, scene: DatasetScene.Classify}
    }
    return datasetInfo
  }, [datasetInfo])

  const currentId = currentSubDataset?.id

  const { scene, id } = detail
  const [viewType, setViewType] = useState<string>('grid')

  return (
    <div styleName='Preview'>
      <PreviewHeader setViewType={setViewType} />
      <div className='preview_content_wrap'>
        {
          viewType === 'grid' ? (
            <ListView
              key={currentId}
              scenes={scene}
              currentId={currentId}
              id={id}
            />
          ) : null
        }
        {
          viewType === 'slick' ? (
            <SlickView
              scenes={scene}
              currentId={currentId}
              id={id}
            />
          ) : null
        }
      </div>
    </div>
  )
}

export default Preview
