import { useState } from 'react'
import { Upload, message, notification } from 'antd';
import type { UploadProps } from 'antd';
import { isEmpty } from 'lodash'
// import { ReactComponent as Tips } from '../../icon/tips.svg'
import { ReactComponent as Container } from '../../icon/container.svg'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import api from '@api'
import './commonUpload.module.less'

const { Dragger } = Upload;

const CommonUpload = (props:any): JSX.Element => {
  const { thres, setLoading, fetchResult, model_type } = props
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const [rawFileList, setrawFileList] = useState([])

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

      if (model_type !== 'classify') {
        if (videoReg.test(o.name)) {
          videoList.push(o)
          continue
        }
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
    if (isEmpty(fileList)) {
      message.warning('请上传材料')
      return
    }
    if (fileList.length > 20) {
      handleReset()
      message.error('暂时不支持超过超过20个文件的预测')
      return
    }
    if (regFileFn(fileList)) {
      handleReset()
      return
    }

    const proList = (fileList as Array<any>).map((o: any) => {
      const { name, size } = o
      return api.get('/v2/file/upload', { params: { filename: name, size } })
    })
    setLoading(true)
    const urlArr: any = []
    Promise.all(proList).then((res) => {
      const uploadList = res.map((resObj: any, i: any) => {
        const { data, code, message } = resObj
        if (code === 0) {
          const { header, method, url, file_url: fileUrl } = data
          urlArr.push(fileUrl)
          const methodAxios: any = String(method).toLocaleLowerCase()
          delete header['content-length']
          return (api as any)[methodAxios](url, fileList[i], { headers: header })
        } else {
          throw new Error(message)
        }
      })
      Promise.all(uploadList).then(() => {
        const { id, iter } = versionInfo
        if (!iter || !id) {
          return
        }
        const fn = async () => {
          try {
            const predictionRes = await api.post(`/v2/models/${id}/versions/${iter?.id}/prediction`, {
              source: urlArr,
              thres: +thres
            })

            if (predictionRes.code === 0) {
            //   const { data: predictionResId } = predictionRes

              notification.success({
                message: '正在预测',
                description: '预测需要一定时间, 请耐心等待',
              });

              if (fetchResult) {
                fetchResult()
              }
              setLoading(false)
            } else {
              notification.error({
                message: '预测错误',
                description: predictionRes?.message,
              });
              setLoading(false)
            }
          } catch (e: any) {
            message.error(e?.message)
            setLoading(false)
          }
        }
        fn()
      }).catch((e) => {
        message.error(e?.message)
        setLoading(false)
      })
    }).catch((e) => {
      message.error(e?.message)
      setLoading(false)
    })
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

  const getText = () => {
    if (model_type === 'classify') {
      return '支持.jpg .jpeg . png'
    }
    return '支持.jpg .jpeg . png .mp4'
  }
  return (
    <div styleName='commonUpload'>
      {/* <Tips /> */}
      <div className='tips_wrap'>
        <p>单次预测项目总数量不多于20个</p>
        <p>单张图片不大于10 MB</p>
        <p>单个视屏不大于100 MB</p>
        <p>{getText()}</p>
      </div>
      <div className='upload_wrap'>
        <Dragger {...upProps}>
          <Container />
        </Dragger>

      </div>
    </div>
  )
}

export default CommonUpload
