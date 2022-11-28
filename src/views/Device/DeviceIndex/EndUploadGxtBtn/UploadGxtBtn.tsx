import { useRef, useState } from 'react'
import { message, Upload } from 'antd'
import { GButton } from '@src/UIComponents'
import { bytesToSize } from '@src/utils'
import FailedTablie from '../MarginalEndRegisterForm/FailedTablie'
import api from '@api'
import { useDebounceFn } from 'ahooks'
import { isEmpty, isNil } from 'lodash'
// import './UploadGxtBtn.module.less'
const maxSize = 10 * 1024 * 1024
const UploadGxtBtn = (props: any) => {
  const { callBack, groupSelected, deviceType } = props
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<any>(0)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });
  const fileList = useRef<any>([])

  const DeviceAuthRef = useRef<any>(null)
  const [failedList, setFailedList] = useState<Array<any>>([])

  const onprogress = (event: any) => {
    console.log(event, 'event')
    const tmp = event.loaded / event.total * 100

    const pre = timeRef.current.pre
    const preLoad = timeRef.current.preLoad

    timeRef.current = {
      pre: pre,
      next: new Date().valueOf() / 1000,
      preLoad: preLoad,
      nextLoad: event.loaded
    }
    setProgress(tmp.toFixed(0))
  };
  const uploadFile = useDebounceFn(
    () => {
      (
        async () => {
          try {
            setLoading(true)
            // 上传
            timeRef.current.pre = new Date().valueOf() / 1000
            const formData = new FormData();
            fileList.current.map((item: any) => formData.append('files', item))
            // console.log(formData, 'formData')
            // formData.append('group', selected?.id)
            const res = await api.post(
              '/v3/device/offline_register',
              formData,
              { onUploadProgress: onprogress, params: { group: groupSelected, device_type: deviceType } })
            if (res.code === 0) {
              message.success(res?.message)
              callBack && callBack()
              if (!isNil(res?.data)) {
                const arr = res?.data.filter((o: any) => o?.result !== 'Success')

                if (!isEmpty(arr)) {
                  console.log(arr, 'arrarrarr')
                  setFailedList(arr)
                  DeviceAuthRef.current.setIsModalVisible(true)
                  console.log(arr, 'arrarrarr')
                }
              }
            } else {
              message.error(res?.message)
            }
          } catch (e) {
            fileList.current = []
            setLoading(false)
            console.log(e)
          } finally {
            fileList.current = []
            setLoading(false)
          }
        }
      )()
    }, {
      wait: 200
    }
  )
  const UploadProps = useRef(
    {
      maxCount: 100,
      multiple: true,
      // directory: true,
      accept: '.gxt',
      beforeUpload: (file: any): any => {
        if (file.size > maxSize) {
          message.error(`文件不得大于${bytesToSize(maxSize)}`)
          return Promise.reject(new Error(`文件不得大于${bytesToSize(maxSize)}`))
        }

        fileList.current.push(file)

        // if (_reg.test(file.name)) {
        //   // const arr: any = [file]

        //   console.log('111')
        // } else {
        //   message.error('暂不支持该格式！')
        //   return Promise.reject(new Error('暂不支持该格式！'))
        // }
        uploadFile.run()
        return false
      },

    }
  );
  return (
    <>
      <Upload {...{ ...UploadProps.current }} itemRender={() => null} >
        <GButton type='primary' >

          {loading ? `已上传${progress}%` : '注册设备'}
        </GButton>
      </Upload>
      <FailedTablie ref={DeviceAuthRef} data={failedList}/>
    </>
  )
}

export default UploadGxtBtn
