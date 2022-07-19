import { useRef } from 'react'
import { Button, Upload } from 'antd'
// import { bytesToSize } from '@src/utils/tools'

// import { useDebounceFn } from 'ahooks'
import { UploadOutlined } from '@ant-design/icons'
import './UploadGxtBtn.module.less'

const UploadGxtBtn = (props:any) => {
  const { onChange } = props

  // const fileList = useRef<any>([])

  // const uploadFile = useDebounceFn(
  //   () => {
  //     const formData = new FormData();
  //     fileList.current.map((item: any) => formData.append('files', item))
  //     onChange && onChange(formData)
  //   }, {
  //     wait: 200
  //   }
  // )
  const UploadProps = useRef(
    {
      maxCount: 100,
      multiple: true,
      // directory: true,
      accept: '.gxt',
      beforeUpload: (): any => {
        return false
      },
      onChange: ({ fileList }:any) => {
        onChange(fileList)
      },

    }
  );
  return (
    <div styleName='UploadGxtBtn' className='UploadGxtBtn'>

      <Upload {...{ ...UploadProps.current }} >
        <Button className='upload_btn'><UploadOutlined /> 上传.gtx文件</Button>
      </Upload>

    </div>
  )
}

export default UploadGxtBtn
