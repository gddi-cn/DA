import React from 'react'
import styled from 'styled-components'
import { Button as AntButton } from 'antd'
import { License } from '@src/shared/types/license'
import { useAtom } from 'jotai'
import { idAtom, versionIdAtom } from '../../store'
import modelAPI from '@src/apis/model'
import { downloadBlob } from '@src/utils/tools'

const Button = styled(AntButton)`
  padding: 0;
`

interface DownloadProps {
  id: License['id'];
  disabled?: boolean;
}

const Download: React.FC<DownloadProps> = (
  {
    id,
    disabled = false,
  }
) => {
  const [modelId] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)

  const [loading, setLoading] = React.useState<boolean>(false)

  const handleDownload = async () => {
    if (loading || !id || !modelId || !versionId) return

    setLoading(true)

    Promise.all([
      modelAPI.downloadModel(modelId, versionId),
      modelAPI.downloadLicense(id, modelId, versionId)
    ])
      .then((resList) => {
        setLoading(false)
        const success = resList.every(x => x.success)
        const dataList: Array<Blob> = resList.map(x => x.data).filter(Boolean) as Array<Blob>
        if (!success || dataList.length !== 2) return

        downloadBlob(dataList[0], 'model.gdd')
        downloadBlob(dataList[1], 'license')
      })
  }

  return (
    <Button type={'link'} disabled={disabled || loading} onClick={handleDownload} style={{ marginLeft: 32 }}>
      {
        loading ? '下载中...' : '下载授权文件'
      }
    </Button>
  )
}

export default Download
