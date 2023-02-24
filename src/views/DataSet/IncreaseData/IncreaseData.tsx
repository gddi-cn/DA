import React from 'react'
import { FooterBar, UploadFile, GButton } from '@src/UIComponents'
import { useState, useRef, useMemo } from 'react'
import { message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'

import UploadingView from '../CreateDataSet/LocalDataSet/SelectDatasetFile/UploadingView'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_DETAIL } from '@router'
import { useDebounceFn } from 'ahooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './IncreaseData.module.less'
import { isEmpty } from 'lodash';
import { useAtom } from 'jotai';
import { templateDatasetAtom } from '@src/store/dataset';

const regExp = /\.(zip|tar|gz)$/

enum DatasetType {
  DETECTION = 'detection', // 目标检测
  CLASSIFY = 'classify', // 图片分类
  CITYSCAPES_SEGMENT = 'cityscapes_segment', // 通用分割
  POSE_DETECTION = 'pose_detection', // 姿态检测
  CAR_POSE_DETECTION = 'car_pose_detection', // 单目 3D
  KEYPOINTS_BASED_ACTION = 'keypoints_based_action', // 动作识别
  KEYPOINT_DETECTION = 'keypoint_detection', // 关键点检测
  IMAGE_RETRIEVAL = 'image_retrieval', // 图像检索
}

const typeURLMapping: Map<DatasetType, string> = new Map([
  [DatasetType.DETECTION, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/detection_example/detection_example.zip'],
  [DatasetType.CLASSIFY, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/classify_example/classify_example.zip'],
  [DatasetType.CITYSCAPES_SEGMENT, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/segmentation_example/segmentation_example.zip'],
  [DatasetType.POSE_DETECTION, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/pose_example/pose_example.zip'],
  [DatasetType.CAR_POSE_DETECTION, 'https://s3.local.cdn.desauto.net/public/example/detection_3d_example.zip'],
  [DatasetType.KEYPOINTS_BASED_ACTION, 'https://s3.local.cdn.desauto.net/public/example/action_detection_example.zip'],
  [DatasetType.KEYPOINT_DETECTION, 'https://s3.local.cdn.desauto.net/public/example/keypoint_detection_example.zip'],
  [DatasetType.IMAGE_RETRIEVAL, 'https://s3.local.cdn.desauto.net/public/example/image_retrieval.zip']
])

const IncreaseData = (): JSX.Element => {

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const [currentDataset] = useAtom(templateDatasetAtom)
  const datasetType = currentDataset?.scene

  const navigate = useNavigate()
  const [percent, setLocalPercent] = useState<any>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [s3info, setS3info] = useState<any>({})
  const [exampleUrl, setExampleUrl] = useState('')
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

  const handleOnuploadBigData = async (file: File | undefined) => {
    if (file) {
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
              setS3info(data)
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
      <UploadingView fileInfo={fileInfo} percent={percent} timeRef={timeRef} handleCnasel={handleCnasel.run}></UploadingView>
    )
  }, [fileInfo, percent, handleCnasel])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      // 弹窗确认是不是要走
      // if (isUploading) {
      //   return
      // }
      handleCnasel.run()
      navigate({
        pathname: APP_DATASET_DETAIL
      })
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
      })
    }

    const goNext = async () => {
      if (isEmpty(s3info)) {
        return
      }

      const { bucket, filename, key, hash } = s3info
      const createInfo = {

        key,
        filename,
        source: 1,
        bucket,

        hash,
        size: fileInfo.size
      }
      try {
        const dataset_id = activePipeLine?.APP_DATASET_DETAIL?.id
        if (!dataset_id) {
          message.error('资源不存在或者已经被删除')
          return
        }
        const creteDatares = await api.post(`/v3/datasets/${dataset_id}/import`, createInfo);
        console.log(creteDatares, 'creteDatares')
        if (creteDatares.code === 0) {
          message.success('增加数据成功')
          navigate({
            pathname: APP_DATASET_DETAIL
          })
          // 创建成功就清理
          socketPushMsgForProject(activePipeLine, {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton className={percent >= 100 ? 'yes_sir' : 'not_allow'} style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [percent, handleCnasel, navigate, activePipeLine, s3info, fileInfo.size])

  React.useEffect(() => {
    setExampleUrl(datasetType ? typeURLMapping.get(datasetType as DatasetType) || '' : '')
  }, [datasetType])

  return (
    <div styleName='IncreaseData' id='IncreaseData'>
      <div className='IncreaseData_wrap'>
        <div className='add_data_title'>添加数据</div>
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
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default IncreaseData
