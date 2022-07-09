
import { FooterBar, UploadFile } from '@src/UIComponents'
import { useState, useRef, useMemo } from 'react'
import { Select, message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'
import { ReactComponent as Tips } from './icon/tips.svg'

import UploadingView from './UploadingView'
import './SelectDatasetFile.module.less'

const { Option } = Select;

const regExp = /\.(zip|tar|gz)$/

const SelectDatasetFile = (props: any): JSX.Element => {
  console.log(props)
  const { createInfo, setCurrentStep, setCreateInfo } = props
  const [percent, setLocalPercent] = useState<any>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [fileInfo, setFileInfo] = useState({
    filename: '',
    size: 0
  })
  const uploadCurrent = useRef<any>(null)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });

  const handleOnuploadBigData = async (file:File|undefined) => {
    if (file) {
      setIsUploading(true)
      console.log(file)
      setFileInfo({ filename: file.name, size: file.size })
      const defaultInitConfig = {
        accessKeyId: 'HCIYFRUYM897VE1PUG47',
        secretAccessKey: 'krjFd3Tdhx2XcX0psfVJWfr0jkrfNKpEj40AsLDD',
        // bucket: 'test',
        endpoint: 's3.local.cdn.desauto.net',
        region: 'ceph',
        sslEnabled: false,
        s3ForcePathStyle: true
      }

      try {
        const tokenRes = await api.get('/v2/storage/s3/token');

        if (tokenRes.code !== 0) {
          return
        }
        const {
          data: {
            s3_server: s3Server,
            additional
          }
        } = tokenRes
        const myupload = uploadCurrent.current = new S3Uploader(s3Server || defaultInitConfig)
        // const hash = myupload.current.fileMd5(fileCurrent.current)
        const createParams: any = {
          Body: file,
          Bucket: additional?.allowed_bucket[0],
          // Key: hash,
          ACL: 'public-read',
          processCallback: (obj: any) => {
            const pre = timeRef.current.next
            const preLoad = timeRef.current.nextLoad
            console.log(obj.loaded, 'obj.loaded')
            timeRef.current = {
              pre: pre,
              next: new Date().valueOf() / 1000,
              preLoad: preLoad,
              nextLoad: obj.loaded
            }
            setLocalPercent(obj.percent || 0)
            // disPatch(setPercent(obj.percent || 0))
          },
          // 成功或者失败的
          callback: async (err: any, data: any) => {
            if (err) {
              console.log(err)
            }
            if (data) {
              // 先创建数据集、成了就扔进去
              try {
                const creteDatares = await api.post('/v2/datasets', createInfo);
                console.log(creteDatares, 'creteDatares')
                if (creteDatares.code === 0) {
                  console.log('90909090')
                  const { draft_id } = creteDatares.data
                  const { bucket, filename, key } = data

                  const res = await api.post(`/v2/draft/${draft_id}/upload`, {
                    bucket, filename, key
                  })

                  if (res.code === 0) {
                    message.success('创建数据集成功')
                    setCurrentStep(4)
                    // 创建成功就清理
                    setCreateInfo({})
                  }
                }
              } catch (e) {
                console.log(e)
              }
            }
          },

        }

        const createRes = await myupload.create(createParams)

        const { hasUploadParts } = createRes
        if (hasUploadParts) {
          myupload.continueOrRetry()
        } else {
          myupload.send()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const uploadview = useMemo(() => {
    return (
      <UploadingView fileInfo={fileInfo} percent={percent} timeRef={timeRef}></UploadingView>
    )
  }, [fileInfo, percent])

  const topview = useMemo(() => {
    return (
      <>
        <div className='select_percent'>
          <div className='select_wrap'>
            <div className='form_title'>
              <p>*</p><p>训练集与测试集比1例</p>
            </div>
            <div className='form_content'>
              <Select defaultValue="2" style={{ width: '100%' }} getPopupContainer={() => document.getElementById('SelectDatasetFile') as any} >
                <Option value="1">7:3</Option>
                <Option value="2">8:2（推荐使用）</Option>
                <Option value="3">9:1</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className='tips_wrap'>
          <Tips />
        </div></>
    )
  }, [])

  return (
    <div styleName='SelectDatasetFile' id='SelectDatasetFile'>
      <div className='SelectDatasetFile_wrap'>
        {
          topview
        }

        <div className='upload_wrap'>
          <div className='form_title'>
            <p>*</p><p>上传文件</p>
          </div>
          <div className='form_content'>
            {
              isUploading ? uploadview : (
                <UploadFile hasPreview={true} tips="支持.zip、tar、gz格式 " regExp={regExp} onUpload={handleOnuploadBigData}>

                </UploadFile>
              )
            }
          </div>
        </div>

      </div>
      <FooterBar rightContent={null} />
    </div>
  )
}

export default SelectDatasetFile
