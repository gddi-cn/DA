
import PreviewHeader from './PreviewHeader'
import { useMemo, useState } from 'react'
import ListView from './ListView'
import SlickView from './SlickView'
import './Preview.module.less'

type Props = {
    classInfo: any
}
const Preview = (props: Props): JSX.Element => {
  const { classInfo } = props
  const [viewType, setViewType] = useState<string>('grid')

  const view = useMemo(() => {
    if (viewType === 'grid') {
      return <ListView></ListView>
    }

    if (viewType === 'slick') {
      return (
        <SlickView />
      )
    }

    return null
  }, [viewType])

  return (
    <div styleName='Preview'>
      <PreviewHeader classInfo={classInfo} setViewType={setViewType} />
      <div className='preview_content_wrap'>
        {view}
      </div>
    </div>
  )
}

export default Preview
