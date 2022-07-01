import { Upload } from 'antd';
// import { UploadFile } from 'antd/lib/upload/interface'
import { bytesToSize } from '@src/utils'
import './UploadFIle.module.less'

interface Props {
  regExp?: RegExp,
  onUpload?: (file: File) => void,
  onError?: (file: Error) => void,
  maxSize?: number,
  // multiple?: boolean,
  children: React.ReactNode,
  className?: string,
  // 专门给表单用的额
  onChange?:(params:any)=>void

}
const UploadFIle = (props: Props): JSX.Element => {
  const { regExp, onUpload, maxSize, children, className, onError, onChange, ...rest } = props

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
  const config = {
    beforeUpload: (file: File): boolean => {
      if (onUpload) {
        // 个人定义的
        singleUpload(file)
      } else {
        // 表单的
        onChange && onChange(file)
      }

      return false;
    },
  }
  return (
    <div styleName='UploadFIle' className={className}>
      <Upload {...config} {...rest} itemRender={() => null}>
        {
          children
        }
      </Upload>
    </div>
  )
}

export default UploadFIle
