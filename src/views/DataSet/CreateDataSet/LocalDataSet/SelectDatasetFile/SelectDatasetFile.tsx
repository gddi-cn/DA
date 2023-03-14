import { FooterBar, UploadFile, GButton, GSelect } from '@src/UIComponents'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Select, message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'

import UploadingView from './UploadingView'
import { useNavigate } from 'react-router-dom'
import { APP_LOCAL_FILE_STEP_4, APP_LOCAL_FILE_STEP_2 } from '@router'
import { useDebounceFn } from 'ahooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './SelectDatasetFile.module.less'
import { isEmpty } from 'lodash';
import { useBack2DatasetIndex } from '@src/hooks/task';
import { SecondaryBtn } from '@src/components/Button';

const { Option } = Select;

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

const SelectDatasetFile = (): JSX.Element => {
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
  const [exampleUrl, setExampleUrl] = useState('')
  const [proportion, setProportion] = useState<any>(0.2)
  const [backing, setBacking] = useState<boolean>(false)
  const [fileInfo, setFileInfo] = useState({
    filename: '',
    size: 0
  })

  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const datasetType = useMemo(
    () => {
      return activePipeLine?.APP_LOCAL_FILE_STEP_1?.activeType
    },
    [activePipeLine]
  )
  // const activeTaskInfo = useSelector((state: RootState) => {
  //   return state.tasksSilce.activeTaskInfo || {}
  // })


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
    console.log({uploader: uploadCurrent.current})
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

    const { APP_LOCAL_FILE_STEP_1, APP_LOCAL_FILE_STEP_2 } = activePipeLine

    const { bucket, filename, key, hash, size } = s3info

    const createInfo = {
      scene: APP_LOCAL_FILE_STEP_1?.activeType,
      name: APP_LOCAL_FILE_STEP_2?.name,
      summary: APP_LOCAL_FILE_STEP_2?.summary,
      cover: APP_LOCAL_FILE_STEP_2?.cover,
      key,
      filename,
      source: 1,
      bucket,
      val_share: proportion,
      hash,
      size,
    }

    try {
      setLoading(true)
      const creteDatares = await api.post('/v3/datasets', createInfo);
      if (creteDatares.code === 0) {
        message.success('创建数据集成功')
        setLoading(false)
        navigate({
          pathname: APP_LOCAL_FILE_STEP_4
        })
        // 创建成功就清理
        socketPushMsgForProject(activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_4,
        })
      } else {
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const handleOnuploadBigData = async (file:File|undefined) => {
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

  const handleProportionChange = useCallback(
    (value: string) => {
      if (activePipeLine.APP_LOCAL_FILE_STEP_3) {
        const obj = Object.assign({ ...activePipeLine.APP_LOCAL_FILE_STEP_3 }, {
          proportion: value
        })

        socketPushMsgForProject(activePipeLine, {
          APP_LOCAL_FILE_STEP_3: obj
        })
      } else {
        socketPushMsgForProject(activePipeLine, {
          APP_LOCAL_FILE_STEP_3: { proportion: value }
        })
      }
    }, [activePipeLine]
  )

  const topview = useMemo(() => {
    return (
      <>
        <div className='select_percent'>
          <div className='select_wrap'>
            <div className='form_title'>
              <p>*</p><p>训练集与测试集比例</p>
            </div>
            <div className='form_content'>
              <GSelect value={proportion} style={{ width: '100%' }} onChange={handleProportionChange}>
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
  }, [exampleUrl, handleProportionChange, proportion])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      // 弹窗确认是不是要走
      // if (isUploading) {
      //   return
      // }
      handleCnasel.run()
      navigate({
        pathname: APP_LOCAL_FILE_STEP_2
      })
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
      </div>
    )
  }, [handleCnasel ])

  useEffect(() => {
    if (activePipeLine?.APP_LOCAL_FILE_STEP_3?.proportion) {
      const { proportion } = activePipeLine.APP_LOCAL_FILE_STEP_3
      setProportion(proportion)
    } else {
      // 默认带上
      socketPushMsgForProject(activePipeLine, {
        APP_LOCAL_FILE_STEP_3: { proportion: 0.2 }
      })
    }
  }, [activePipeLine])

  useEffect(() => {
    setExampleUrl(datasetType ? typeURLMapping.get(datasetType as DatasetType) || '' : '')
  }, [datasetType])

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
        rightContent={rightContent}
      />
    </div>
  )
}

export default SelectDatasetFile
