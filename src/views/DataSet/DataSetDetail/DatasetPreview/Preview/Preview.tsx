
import PreviewHeader from './PreviewHeader'
import { useMemo, useState } from 'react'
import ListView from './ListView'
import SlickView from './SlickView'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import './Preview.module.less'
import { currentDatasetAtom, currentSubDatasetAtom } from '../../store'
import { useAtom } from 'jotai'

const Preview = (): JSX.Element => {
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)

  const currentId = currentSubDataset?.id

  const { scene, id } = datasetInfo || {} as Data
  const [viewType, setViewType] = useState<string>('grid')

  return (
    <div styleName='Preview'>
      <PreviewHeader setViewType={setViewType} />
      <div className='preview_content_wrap'>
        {
          viewType === 'grid' ? (
            <ListView
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
