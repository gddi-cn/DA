import { useGetDataInfo } from '../../hooks'
import { UIDatasetVisual } from '@src/UIComponents'
import { useMemo, useState } from 'react'

import { Modal } from 'antd'
import './ListItem.module.less'

const ListItem = (props: any) => {
  const { data, model_type } = props
  const [visible, setvisible] = useState(false)
  const datainfo = useGetDataInfo(data.value, model_type)

  const view = useMemo(() => {
    const {

      // url,
      dataSet,
      // rawImgDataSet,

    } = datainfo

    return (
      <div className='UIDatasetVisual_small_wrap' onClick={() => setvisible(true)}>
        <UIDatasetVisual
          url={data.src}
          zoom={false}
          canvasData={dataSet || []}
          drawCanvasData={model_type === 'detection' || model_type === 'monocular_3d_detection'}
          hasHtmlTips={model_type === 'classify'}
        />
      </div>
    )
  }, [datainfo, model_type, data])

  const modalView = useMemo(() => {
    const {

      dataSet,

    } = datainfo
    return (
      <Modal
        title={null}
        open={visible}
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
          url={data.src}
          zoom={true}
          canvasData={dataSet || []}
          drawCanvasData={model_type === 'detection' || model_type === 'monocular_3d_detection'}
          hasHtmlTips={model_type === 'classify'}
        />
      </Modal>
    )
  }, [datainfo, model_type, visible, data])
  return (
    <div styleName='ListItem'>
      {view}
      {modalView}
    </div>
  )
}
export default ListItem
