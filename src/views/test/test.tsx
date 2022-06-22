
import './test.module.less'
import FabricCanvas from '@src/components/DataSetVisual/FabricCanvas'

const Test = (props:any):JSX.Element => {
  console.log(props)

  return (
    <div styleName='test'>
      <FabricCanvas data={[]} url="http://s3.ceph.k8s.gddi.com/storage-0l6qoa/2021/04/25/09455a12a6e3c6d805ebc769b04a9d987eb07aa1.jpg"/>
    </div>
  )
}

export default Test
