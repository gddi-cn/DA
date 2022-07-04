import { Image, Upload } from 'antd';
// import { UploadFile } from 'antd/lib/upload/interface'
import { useState } from 'react'
import { bytesToSize, getBase64 } from '@src/utils'
import './UploadFIle.module.less'
import { isEmpty } from 'lodash';

interface Props {
  regExp?: RegExp,
  onUpload?: (file: File) => void,
  onError?: (file: Error) => void,
  maxSize?: number,
  // multiple?: boolean,
  children: React.ReactNode,
  className?: string,
  // 专门给表单用的额
  onChange?:(params:any)=>void,
  // 图片预览吧,应该也就是表单需要这个
  hasPreview?:boolean

}
const UploadFIle = (props: Props): JSX.Element => {
  const { regExp, onUpload, maxSize, children, className, onError, onChange, ...rest } = props

  const [file, setFile] = useState<string>('')

  const checkFile = async (fileSize: number | undefined, fileName: string | undefined) => {
    const checkMaxSize = new Promise(function (resolve, reject) {
      if (fileSize && maxSize) {
        if (fileSize > maxSize) {
          reject(new Error(`文件不能大于${bytesToSize(maxSize)}`))
        } else {
          resolve(true)
        }
      } else {
        reject(new Error('未知错误'))
      }
    })

    const checkFileNmae = new Promise(function (resolve, reject) {
      if (fileName) {
        if (regExp?.test(fileName)) {
          resolve(true)
        } else {
          const suffix = fileName.match(/\.(\w)*$/)
          if (suffix) {
            reject(new Error(`不支持${suffix[0]}文件类型`))
          } else {
            reject(new Error('不支持该类型文件'))
          }
        }
      } else {
        reject(new Error('未知错误'))
      }
    })

    await Promise.all([
      checkMaxSize,
      checkFileNmae
    ])
  }

  const singleUpload = async (file: File) => {
    try {
      const { name, size } = file
      console.log(file)
      if (regExp) {
        await checkFile(size, name)
        onUpload && onUpload(file)
      } else {
        onUpload && onUpload(file)
      }
    } catch (e:any) {
      console.log(e)
      onError && onError(e)
    }
  }

  const getFileSrc = async (file:File) => {
    const src = await getBase64(file)
    setFile(src)
  }

  const config = {
    beforeUpload: (file: File): boolean => {
      if (onUpload) {
        // 个人定义的
        singleUpload(file)
      } else {
        // 表单的
        onChange && onChange(file)
      }
      getFileSrc(file)
      return false;
    },
  }

  const getUploadView = () => {
    return (
      <Upload {...config} {...rest} itemRender={() => null}>
        {
          children
        }
      </Upload>
    )
  }

  const previewOrUpload = () => {
    if (isEmpty(file)) {
      return getUploadView()
    } else {
      return (
        <Image
          width={200}
          src={file}
        />
      )
    }
  }

  const getView = () => {
    if (props?.hasPreview) {
      return previewOrUpload()
    }
    return getUploadView()
  }
  return (
    <div styleName='UploadFIle' className={className}>
      {
        getView()
      }
    </div>
  )
}

export default UploadFIle
