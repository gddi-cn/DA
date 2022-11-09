
import FabricCanvas from '@src/components/DataSetVisual/FabricCanvas'
import { ScaleRight, Tag, UploadFile } from '@src/UIComponents'

import { useMemo } from 'react'
import { Button } from 'antd'
import { UpCircleOutlined } from '@ant-design/icons'
import './test.module.less'

const Test = (props:any):JSX.Element => {
  const leftContent = useMemo(() => {
    return (
      <div className='leftContent'>
        <Button> <Tag /> </Button>

        <div className='upload_view'>
          <UpCircleOutlined />
          <UploadFile regExp={/\.(png|jpg|jpeg)$/} maxSize={2 * 1024 * 1024}>
            <Button>上传文件</Button>
          </UploadFile>
          <p>
            支持.jpg .jpeg .png 等图片文件且文件不得大于2MB
          </p>
        </div>

      </div>
    )
  }, [])

  const rightContent = useMemo(() => {
    return (
      <div className='rightContent'>
        <FabricCanvas data={[]} zoom url="http://s3.ceph.k8s.gddi.com/storage-0l6qoa/2021/04/25/09455a12a6e3c6d805ebc769b04a9d987eb07aa1.jpg" />
      </div>
    )
  }, [])

  return (
    <div styleName='test'>

      <div className='ScaleRight_wrap'>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </div>

    </div>
  )
}

export default Test
