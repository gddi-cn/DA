
import PreviewHeader from './PreviewHeader'
import { useState } from 'react'
import ListView from './ListView'
import SlickView from './SlickView'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import './Preview.module.less'

type Props = {
    classInfo: any,
    datasetInfo: Data,
    currentId: any
}
const Preview = (props: Props): JSX.Element => {
  const { classInfo, datasetInfo, currentId } = props
  const { scene, id } = datasetInfo
  const [viewType, setViewType] = useState<string>('grid')

  const View = () => {
    if (viewType === 'grid') {
      return (
        <ListView
          scenes={scene}
          classInfo={classInfo}
          currentId={currentId}
          id={id}
        />
      )
    }

    if (viewType === 'slick') {
      return (
        <SlickView
          scenes={scene}
          classInfo={classInfo}
          currentId={currentId}
          id={id}
        />
      )
    }

    return null
  }

  return (
    <div styleName='Preview'>
      <PreviewHeader classInfo={classInfo} setViewType={setViewType} />
      <div className='preview_content_wrap'>
        <View />
      </div>
    </div>
  )
}

export default Preview
