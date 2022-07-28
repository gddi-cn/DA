
import { FooterBar, UploadFile, GButton, GSelect } from '@src/UIComponents'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Select, message } from 'antd';
import api from '@api'
import { S3Uploader } from '@src/components'
import { ReactComponent as Tips } from './icon/tips.svg'

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

const { Option } = Select;

const regExp = /\.(zip|tar|gz)$/

const SelectDatasetFile = (): JSX.Element => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  // const activeTaskInfo = useSelector((state: RootState) => {
  //   return state.tasksSilce.activeTaskInfo || {}
  // })
  const navigate = useNavigate()
  const [percent, setLocalPercent] = useState<any>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [s3info, setS3info] = useState<any>({})
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

  const [proportion, setProportion] = useState<any>(0.2)

  useEffect(() => {
    console.log(activePipeLine, 'activePipeLineactivePipeLine')
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

  const handleProportionChange = useCallback(
    (value: string) => {
      console.log(value)
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
              <p>*</p><p>训练集与测试集比1例</p>
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

        <div className='tips_wrap'>
          <Tips />
        </div></>
    )
  }, [handleProportionChange, proportion])

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

    const goNext = async () => {
      if (isEmpty(s3info)) {
        return
      }

      console.log(s3info, 225)
      const { APP_LOCAL_FILE_STEP_1, APP_LOCAL_FILE_STEP_2 } = activePipeLine

      const { bucket, filename, key, hash } = s3info
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
        size: fileInfo.size
      }
      try {
        const creteDatares = await api.post('/v3/datasets', createInfo);
        console.log(creteDatares, 'creteDatares')
        if (creteDatares.code === 0) {
          console.log('90909090')

          message.success('创建数据集成功')
          navigate({
            pathname: APP_LOCAL_FILE_STEP_4
          })
          // 创建成功就清理
          socketPushMsgForProject(activePipeLine, {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_4,
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
  }, [percent, handleCnasel, navigate, activePipeLine, s3info, proportion, fileInfo.size])

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
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectDatasetFile
