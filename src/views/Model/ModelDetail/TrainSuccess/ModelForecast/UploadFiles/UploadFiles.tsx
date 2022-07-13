import { useState, useRef } from 'react'
import { Input, Upload, message } from 'antd';
import { ReactComponent as Tips } from '../icon/tips.svg'
import { ReactComponent as Container } from '../icon/container.svg'
import type { UploadProps } from 'antd';
import { isEmpty } from 'lodash'
import { useDebounceFn } from 'ahooks'
import './UploadFiles.module.less'

const { Dragger } = Upload;

const UploadFiles = (props: any): JSX.Element => {
  console.log(props)
  const [rawFileList, setrawFileList] = useState([])

  const [loading, setLoading] = useState<any>(false);

  const regFileFn = (fileList: any) => {
    // 首先检测一下是不是符合、如果不是就告诉他们啥错了，重置上传
    // 然后都对了就开始测试大小
    // 如果大小出了问题就告诉他们那个文件出了问题，并且告知

    const imageReg = /\.(png|jpg|jpeg)$/

    const videoReg = /\.(mp4)$/

    class Msg {
      list = []
      getMsg = () => {
        if (!isEmpty(this.list)) {
          return this.list.reduce((a: any, b: any, index: number) => {
            if (index === 0) {
              return b.name
            }
            return a + '、' + b.name
          }, '')
        }
      }
    }

    const imgList: any = []
    const videoList: any = []

    const errorList: any = new Msg()

    const imgListErr: any = new Msg()

    const videoListErr: any = new Msg()

    for (const o of fileList) {
      if (imageReg.test(o.name)) {
        imgList.push(o)
        continue
      }

      if (videoReg.test(o.name)) {
        videoList.push(o)
        continue
      }

      errorList.list.push(o)
    }

    if (!isEmpty(errorList.list)) {
      message.error(`${errorList.getMsg()}不符合文件格式规定`)
      return true
    }

    if (!isEmpty(imgList)) {
      for (const o of imgList) {
        if (o.size > 10 * 1024 * 1024) {
          imgListErr.list.push(o)
        }
      }
    }

    if (!isEmpty(imgListErr.list)) {
      message.error(`${imgListErr.getMsg()}大于10MB`)
      return true
    }

    if (!isEmpty(videoList)) {
      for (const o of videoList) {
        if (o.size > 100 * 1024 * 1024) {
          videoListErr.list.push(o)
        }
      }
    }

    if (!isEmpty(videoListErr.list)) {
      message.error(`${videoListErr.getMsg()}大于100MB`)
      return true
    }
  }

  const handleReset = () => {
    setrawFileList([])
  }

  const handleOnChange = useDebounceFn((fileList: any) => {
    console.log(fileList)
    if (fileList.length > 20) {
      handleReset()
      message.error('暂时不支持超过超过20个文件的预测')
      return
    }
    if (regFileFn(fileList)) {
      handleReset()
    }
  }, { wait: 200 })

  const upProps: UploadProps = {
    name: 'file',
    multiple: true,
    itemRender: () => null,
    beforeUpload: (file: any, FileList: any): any => {
      handleOnChange.run(FileList)
      return false;
    },
    fileList: rawFileList
  };
  return (
    <div styleName='UploadFiles'>
      <div className='forecast_paramas_block'>
        <div className='title'>
                  阈值设置
        </div>
        <div className='input_content'>
          <Input placeholder="Basic usage" />
        </div>
      </div>

      <div className='forecast_paramas_block'>
        <div className='title'>
                  上传文件
        </div>
        <div className='upload_content'>
          <Tips />
          <div className='upload_wrap'>
            <Dragger {...upProps}>
              <Container />
            </Dragger>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFiles
