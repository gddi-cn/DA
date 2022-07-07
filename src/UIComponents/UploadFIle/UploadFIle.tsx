import { Image, Upload } from 'antd';
// import { UploadFile } from 'antd/lib/upload/interface'
import React, { useState, useEffect } from 'react'
import { ReactComponent as UploadIcon } from './icon/upload-cloud.svg'
import { bytesToSize, getBase64 } from '@src/utils'
import { CloseCircleOutlined } from '@ant-design/icons'
import './UploadFIle.module.less'
import { isEmpty } from 'lodash';

interface Props {
  regExp?: RegExp,
  onUpload?: (file: File | undefined) => void,
  onError?: (file: Error) => void,
  maxSize?: number,
  // multiple?: boolean,
  children?: React.ReactNode,
  className?: string,
  // 专门给表单用的额
  onChange?: (params: any) => void,
  // 图片预览吧,应该也就是表单需要这个
  hasPreview?: boolean,
  type?: 'image' | 'nomalFile',
  tips?: React.ReactNode,
  value?:any

}

const UplaodImageView = (type: string | undefined, tips: React.ReactNode | undefined) => {
  return (
    <div className='UplaodImageView'>
      <div>
        <UploadIcon />
      </div>
      <div className='tips_text'>
        将文件拖到此处，或点击上传
      </div>
      <div className='tips_text'>
        {tips}
      </div>
    </div>
  )
}

const UploadFIle = (props: Props): JSX.Element => {
  const { regExp, onUpload, maxSize, children, className, onError, onChange, tips, type, value, ...rest } = props

  const [filesrc, setFilesrc] = useState<string>('')

  useEffect(() => {
    console.log(value, 'valuevaluevalue')
    setFilesrc(value || '')
  }, [value])

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
    } catch (e: any) {
      console.log(e)
      onError && onError(e)
    }
  }

  const getFileSrc = async (file: File) => {
    const src = await getBase64(file)
    setFilesrc(src)
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
    const getContent = () => {
      if (children) {
        return children
      }
      return UplaodImageView(type, tips)
    }
    return (
      <Upload {...config} {...rest} itemRender={() => null}>
        {
          getContent()
        }
      </Upload>
    )
  }

  const handleDelete = () => {
    setFilesrc('')
    onChange && onChange(undefined)
    onUpload && onUpload(undefined)
  }

  const previewOrUpload = () => {
    if (isEmpty(filesrc)) {
      return getUploadView()
    } else {
      return (
        <div className='preview_wrap'>
          <Image
            width={200}
            src={filesrc}
          />
          <div className='delete_btn' onClick={handleDelete}>
            <CloseCircleOutlined />
          </div>
        </div>
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
    <div styleName='UploadFIle' className={`UploadFIle_container ${className}`}>
      {
        getView()
      }
    </div>
  )
}

export default UploadFIle
