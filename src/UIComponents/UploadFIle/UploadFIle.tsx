import { Image, Upload, Spin } from 'antd';
// import { UploadFile } from 'antd/lib/upload/interface'
import React, { useState, useEffect } from 'react'
import { ReactComponent as UploadIcon } from './icon/upload-cloud.svg'
import { bytesToSize } from '@src/utils'
import api from '@api'
import { CloseCircleOutlined } from '@ant-design/icons'

import { isEmpty } from 'lodash';
import './UploadFIle.module.less'

interface Props {
  regExp?: RegExp,
  onUpload?: (file: File | undefined) => void,
  onError?: (err_list:string[]) => void,
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
  value?:any,
  isShowFileName?:boolean
  [key: string]: any;
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
  const {
    regExp, onUpload, maxSize, children,
    className, onChange, tips, type,
    value, onError, isShowFileName,
    ...rest
  } = props

  const [filesrc, setFilesrc] = useState<string>('')
  const [loading, setloading] = useState<any>(false)

  const [filename, setFilename] = useState('')

  const [errList, setErrList] = useState<string[]>([])

  useEffect(() => {
    setFilesrc(value || '')
  }, [value])

  const checkFile = (fileSize: number | undefined, fileName: string | undefined) => {
    const err_list_tips:string[] = []
    const checkMaxSize = () => {
      if (fileSize && maxSize) {
        if (fileSize > maxSize) {
          err_list_tips.push(`文件不能大于${bytesToSize(maxSize)}`)
        }
      }
    }

    const checkFileNmae = () => {
      if (fileName) {
        if (!regExp?.test(fileName)) {
          const suffix = fileName.match(/\.(\w)*$/)
          if (suffix) {
            err_list_tips.push(`不支持${suffix[0]}文件类型`)
          } else {
            err_list_tips.push('不支持该类型文件')
          }
        }
      }
    }
    checkMaxSize()
    checkFileNmae()
    if (err_list_tips.length > 0) {
      throw (new Error(err_list_tips.join('-')))
    }
  }

  const singleUpload = async (file: File) => {
    try {
      const { name, size } = file
      console.log(file)
      if (regExp) {
        checkFile(size, name)
        onUpload && onUpload(file)
      } else {
        onUpload && onUpload(file)
      }
      setErrList([])
    } catch (e: any) {
      const { message } = e
      const arr = (message as string).split('-')
      if (onError) {
        onError(arr)
      } else {
        setErrList(arr)
      }
    }
  }

  // const getFileSrc = async (file: File) => {
  //   const src = await getBase64(file)
  //   setFilesrc(src)
  // }

  const formOnChange = async (file: File) => {
    try {
      const { name, size } = file
      checkFile(size, name)
      setloading(true)
      const ossUrl = await api.get('/v2/file/upload', { params: { filename: name, size } })
      if (ossUrl.code === 0) {
        const { file_url: fileUrl, header, method, url } = ossUrl.data
        const methodAxios: any = String(method).toLocaleLowerCase()

        const uploadAws = await (api as any)[methodAxios](url, file, { headers: header })

        if (uploadAws.code === 0) {
          onChange && onChange(fileUrl)
          setFilename(name)
          setloading(false)
        } else {
          setloading(false)
          // onChange && onChange(undefined)
        }
      } else {
        setloading(false)
      }
      setErrList([])
    } catch (e:any) {
      const { message } = e

      setErrList((message as string).split('-'))
      setloading(false)
    }
  }

  const config = {
    beforeUpload: (file: File): boolean => {
      if (onUpload) {
        // 个人定义的
        singleUpload(file)
      } else {
        // 表单的
        formOnChange(file)
      }

      // getFileSrc(file)
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
      <Spin spinning={loading}>
        <div className='UploadFIle_upload_wrap'>
          {
            getView()
          }
        </div>
      </Spin>
      {
        isShowFileName ? <span className='filename'>{filename}</span> : null
      }

      <div className='err_list_wrap'>
        {
          errList.map((o) => {
            return (
              <div key={o}>{o}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default UploadFIle
