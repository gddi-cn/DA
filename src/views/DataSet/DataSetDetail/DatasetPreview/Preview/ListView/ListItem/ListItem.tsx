import { useGetDataInfo } from '../../utils/getDataInfo'
import { UIDatasetVisual } from '@src/UIComponents'
import { useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import { Modal } from 'antd'
import './ListItem.module.less'

type Props={
    data:any,
    scenes: string,
}
const ListItem = (props: Props): JSX.Element => {
  const { data, scenes } = props
  const [visible, setvisible] = useState(false)
  const datainfo = useGetDataInfo(data, scenes)

  const view = useMemo(() => {
    if (isEmpty(datainfo)) {
      return null
    }
    const {
      thumbnailUrl,
      // url,
      dataSet,
      // rawImgDataSet,

    } = datainfo

    return (
      <div className='UIDatasetVisual_small_wrap' onClick={() => setvisible(true)}>
        <UIDatasetVisual
          url={thumbnailUrl}
          zoom={false}
          canvasData={dataSet || []}
          drawCanvasData={scenes === 'detection' || scenes === 'monocular_3d_detection'}
          hasHtmlTips={scenes === 'classify'}
        />
      </div>
    )
  }, [datainfo, scenes])

  const modalView = useMemo(() => {
    if (isEmpty(datainfo)) {
      return null
    }
    const {

      url,

      rawImgDataSet,

    } = datainfo
    return (
      <Modal
        title={null}
        visible={visible}
        // maskClosable={false}
        // keyboard={false}
        onOk={() => setvisible(false)}
        onCancel={() => setvisible(false)}
        destroyOnClose
        getContainer={document.getElementById('root') as HTMLDivElement}
        footer={[]}
        className='global_dataset_view_modal'
      >
        <UIDatasetVisual
          url={url}
          zoom={true}
          canvasData={rawImgDataSet || []}
          drawCanvasData={scenes === 'detection' || scenes === 'monocular_3d_detection'}
          hasHtmlTips={scenes === 'classify'}
        />
      </Modal>
    )
  }, [datainfo, scenes, visible])

  return (
    <div styleName='ListItem'>
      {view}
      {modalView}
    </div>
  )
}

export default ListItem
