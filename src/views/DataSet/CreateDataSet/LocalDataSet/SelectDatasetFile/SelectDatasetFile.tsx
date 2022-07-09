
import { FooterBar, UploadFile } from '@src/UIComponents'
import { useState, useRef } from 'react'
import { Select, message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'
import { ReactComponent as Tips } from './icon/tips.svg'
import { pick } from 'lodash'
import './SelectDatasetFile.module.less'

const { Option } = Select;

const regExp = /\.(zip|tar|gz)$/

const SelectDatasetFile = (props: any): JSX.Element => {
  console.log(props)
  const [percent, setLocalPercent] = useState<any>(0)
  const uploadCurrent = useRef<any>(null)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });

  const handleOnuploadBigData = async (file:File|undefined) => {
    if (file) {
      console.log(file)
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
              // 删除张宇的会话
              // 获取地址搞事情  await api.deletes(`/v2/storage/s3/sessions/${hash}`)
              const res = await api.post(`/v2/draft/${1}/upload`, {
                ...pick(['bucket', 'filename', 'key'], data)
              })
              if (res.code === 0) {
                message.success('上传成功')
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

      }
    }
  }

  return (
    <div styleName='SelectDatasetFile' id='SelectDatasetFile'>
      <div className='SelectDatasetFile_wrap'>

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
          <Tips/>
        </div>

        <div className='upload_wrap'>
          <div className='form_title'>
            <p>*</p><p>上传文件</p>
          </div>
          <div className='form_content'>
            <UploadFile hasPreview={true} tips="支持.zip、tar、gz格式 " regExp={regExp} onUpload={handleOnuploadBigData}>

            </UploadFile>
          </div>
        </div>
        {percent}
      </div>
      <FooterBar rightContent={null} />
    </div>
  )
}

export default SelectDatasetFile
