import { FabricCanvas } from '@src/components'
import { isEmpty, isNil } from 'lodash'
import './UIDatasetVisual.module.less'

type Props={
    url:string,
    canvasData:any,
    zoom?:boolean,
    drawCanvasData?: boolean,
    hasHtmlTips?: boolean,
}
const UIDatasetVisual = (props: Props): JSX.Element => {
  const { url, canvasData, zoom, drawCanvasData, hasHtmlTips } = props

  return (
    <div styleName='UIDatasetVisual'>
      {
        hasHtmlTips && (
          <div className='hasHtmlTips'>
            {
              !isEmpty(canvasData) && !isNil(canvasData) && canvasData.map((o: any, i: any) => {
                return (
                  <div
                    key={i}
                    className='hasHtmlTips-item'
                    style={{
                      backgroundColor: o?.fill,
                      borderColor: o?.stroke,
                      color: '#fff',
                    }}
                  >
                    {o?.label}
                  </div>
                )
              })
            }
          </div>
        )
      }
      <FabricCanvas zoom={zoom} url={url} data={canvasData} drawCanvasData={drawCanvasData} ></FabricCanvas>
    </div>
  )
}

export default UIDatasetVisual
