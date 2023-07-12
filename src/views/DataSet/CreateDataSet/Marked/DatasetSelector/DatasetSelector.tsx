import { FooterBar, UploadFile, GSelect } from '@src/UIComponents'
import React, { useState, useRef, useMemo } from 'react'
import { Select, message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'

import UploadingView from './UploadingView'
import { useNavigate } from 'react-router-dom'
import { useDebounceFn } from 'ahooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './DatasetSelector.module.less'
import { isEmpty } from 'lodash';
import { useBack2DatasetIndex } from '@src/hooks/task';
import { SecondaryBtn } from '@src/components/Button';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { baseFormAtom, currentStepAtom, exampleURLAtom, proportionAtom, trainTypeAtom, uploadingAtom } from '../store';
import { EMarked } from '../enums';

const { Option } = Select;

const regExp = /\.(zip|tar|gz)$/

const RightActions: React.FC = () => {
  const uploading = useAtomValue(uploadingAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)
  const handleClick = () => {
    setCurrentStep(EMarked.Step.BASE_FORM)
  }

  return (
    <SecondaryBtn onClick={handleClick} disabled={uploading}>
      上一步
    </SecondaryBtn>
  )
}

const DatasetSelector = (): JSX.Element => {
  const uploadCurrent = useRef<any>(null)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });

  const handleBack = useBack2DatasetIndex()

  const [loading, setLoading] = useState(false)
  const [percent, setLocalPercent] = useState<any>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [checking, setChecking] = useState<boolean>(false)
  const [backing, setBacking] = useState<boolean>(false)
  const [fileInfo, setFileInfo] = useState({
    filename: '',
    size: 0
  })

  const setCurrentStep = useSetAtom(currentStepAtom)
  const [proporition, setProportion] = useAtom(proportionAtom)
  const scene = useAtomValue(trainTypeAtom)
  const { name, cover, summary } = useAtomValue(baseFormAtom)
  const exampleUrl = useAtomValue(exampleURLAtom)

  const handleCnasel = useDebounceFn(
    async () => {
      // source.cancel('fire-in-the-hole')
      // 好像不管是否取消成功，这边都应该失效
      try {
        if (uploadCurrent.current) {
          const res: any = await uploadCurrent.current.cansel()
          if (res) {
            message.success('取消上传')
          }
          setIsUploading(false)
        }
      } catch (e) {
        setIsUploading(false)
      }
    },
    {
      wait: 300
    }
  )

  const handleCancel = async () => {
    if (backing) return
    setBacking(true)
    if (uploadCurrent.current) {
      try {
        const res = await uploadCurrent.current.cansel()
        if (res) {
          message.success("取消上传")
        }
      } catch (e) {
        console.error(e)
      }
      setIsUploading(false)
      uploadCurrent.current = null
      handleBack()
    } else {
      handleBack()
    }
    setBacking(false)
  }

  const goNext = async (s3info: any) => {
    if (isEmpty(s3info)) {
      return
    }


    const { bucket, filename, key, hash, size } = s3info

    const createInfo = {
      scene,
      name,
      summary,
      cover,
      key,
      filename,
      source: 1,
      bucket,
      val_share: proporition,
      hash,
      size,
    }

    try {
      setLoading(true)
      const creteDatares = await api.post('/v3/datasets', createInfo);
      if (creteDatares.code === 0) {
        message.success('创建数据集成功')
        setLoading(false)
        setCurrentStep(EMarked.Step.RESULT)
      } else {
        setLoading(false)
        message.warn('创建数据集失败')
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const handleOnuploadBigData = async (file: File | undefined) => {
    if (!file) return

    setIsUploading(true)
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

      const createParams: any = {
        Body: file,
        Bucket: additional?.allowed_bucket[0],
        ACL: 'public-read',
        processCallback: (obj: any) => {
          const pre = timeRef.current.next
          const preLoad = timeRef.current.nextLoad
          timeRef.current = {
            pre: pre,
            next: new Date().valueOf() / 1000,
            preLoad: preLoad,
            nextLoad: obj.loaded
          }
          obj.percent >= 100 && setChecking(true)
          setLocalPercent(obj.percent || 0)
        },
        // 成功或者失败的
        callback: async (err: any, data: any) => {
          if (err) {
            console.log(err)
            return
          }
          if (data) {
            goNext(data)
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

  const uploadview = useMemo(() => {
    return (
      <UploadingView
        fileInfo={fileInfo}
        percent={percent}
        timeRef={timeRef}
        handleCnasel={handleCnasel.run}
        checking={checking}
      />
    )
  }, [fileInfo, percent, handleCnasel])

  const handleProportionChange = (value: number) => {
    setProportion(value)
  }

  const topview = (
      <>
        <div className='select_percent'>
          <div className='select_wrap'>
            <div className='form_title'>
              <p>*</p><p>训练集与测试集比例</p>
            </div>
            <div className='form_content'>
              <GSelect value={proporition} style={{ width: '100%' }} onChange={handleProportionChange}>
                <Option value={0.3}>7:3</Option>
                <Option value={0.2}>8:2（推荐使用）</Option>
                <Option value={0.1}>9:1</Option>
              </GSelect>
            </div>
          </div>
        </div>

        <div>
          <div className='tips_wrap'>
            <p>文件格式：</p>
            <p>1.请按照引导示例文件构建压缩包，并严格按照示例文件夹名称命名。
              <a href={exampleUrl} target='_blank' rel='noreferrer'>下载示例</a>
            </p>

            <p>2.压缩包支持zip、tar、gz格式。</p>

          </div>
          <div className='tips_wrap'>
            <p>图片格式：</p>
            <p>1.目前支持图片类型分别为：png、jpg、jpeg。 </p>

          </div>
          <div className='tips_wrap'>
            <p>图片内容：</p>
            <p>1.图片采集环境和实际场景要一致，如拍摄分辨率、拍摄视觉范围等。</p>
            <p>2.图片需要涵盖更多实际场景变化，如拍照角度、光线阴暗变化，场景多，模型的泛能力越强。</p>

          </div>
        </div>
      </>
  )

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
      <FooterBar
        leftContent={
          <SecondaryBtn loading={backing} width={132} onClick={handleCancel}>
            取消
          </SecondaryBtn>
        }
        rightContent={<RightActions />}
      />
    </div>
  )
}

export default DatasetSelector
