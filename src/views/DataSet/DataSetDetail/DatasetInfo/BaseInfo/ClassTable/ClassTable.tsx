import { useAtom } from 'jotai'

import './ClassTable.module.less'
import { DatasetScene } from '@src/shared/enum/dataset'
import { currentClassAtom, currentDatasetAtom, currentSubDatasetAtom } from '../../../store'
import InfiniteScroll from 'react-infinite-scroller'
import { useTableBody } from './hook'

type ItemProps<T> = {
  data: T,
  scene?: DatasetScene
}

type DataItem = {
  cover?: string,
  name?: string,
  annotation_count?: number,
}

function BodyItem<T extends DataItem> (props: ItemProps<T>) {
  const { data, scene } = props
  const [classInfo, setClassInfo] = useAtom(currentClassAtom)
  const [currentSet] = useAtom(currentSubDatasetAtom)

  const isKeyPoint = scene === DatasetScene.KeyPointsBasedAction

  const getPercent = () => {
    if (data?.annotation_count && currentSet?.annotation_count) {
      return (
        data.annotation_count / currentSet.annotation_count * 100).toFixed(2) + '%'
    }
    return 0
  }

  const handleClick = () => {
    setClassInfo(data as Dataset.Class)
  }

  const getCls = () => {
    if (classInfo?.name === data?.name) {
      return 'body_item_wrap body_item_wrap_active'
    }
    return 'body_item_wrap'
  }

  return (
    <div className={[getCls(), isKeyPoint ? 'col_3' : ''].join(' ')} onClick={handleClick}>
      {
        isKeyPoint ? null : (
          <div className='body_item'>
            <img alt='gddi_img' src={data?.cover} className='label_cover' />
          </div>
        )
      }
      <div className='body_item'>{data?.name}</div>
      <div className='body_item'>{data?.annotation_count}</div>
      <div className='body_item'>{getPercent()}</div>
    </div>
  )
}

const Header: React.FC = () => {
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const scene = datasetInfo?.scene
  const isKeyPoint = scene === DatasetScene.KeyPointsBasedAction

  return (
    <div className={['header_wrap', isKeyPoint ? 'col_3' : ''].join(' ')}>
      {
        isKeyPoint ? null : (
          <div>标签封面</div>
        )
      }
      <div>标签名</div>
      <div>标注数</div>
      <div>占比</div>
    </div>
  )
}

const Body: React.FC = () => {
  const { showClassList, datasetInfo, hasMore, loadMore } = useTableBody()
  // (items as Array<any>)
  return (
    <InfiniteScroll
      pageStart={0}
      hasMore={hasMore}
      loadMore={loadMore}
      useWindow={false}
    >
      <div className='body_wrap'>
        {
          (showClassList || [])?.map((o, i) => {
            return (
              <BodyItem key={i} data={o} scene={datasetInfo?.scene} />
            )
          })
        }
      </div>
    </InfiniteScroll>
  )
}

const ClassTable = (): JSX.Element => {
  return (
    <div styleName='ClassTable'>
      <Header />
      <Body />
    </div>
  )
}

export default ClassTable
