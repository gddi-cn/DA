import React from 'react'
import styled from 'styled-components'
import { Button as AntButton } from 'antd'
import { License } from '@src/shared/types/license'
import { useAtom } from 'jotai'
import { idAtom, versionIdAtom } from '../../store'
import modelAPI from '@src/apis/model'

const Button = styled(AntButton)`
  padding: 0;
`

interface DownloadProps {
  id: License['id'];
  disabled?: boolean;
}

const DownLoad: React.FC<DownloadProps> = (
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

    const { success, data } = await modelAPI.downloadLicense(id, modelId, versionId)

    setLoading(false)

    if (!success || !data) return

    const aElement = document.createElement('a');
    aElement.setAttribute('download', 'license');
    const href = URL.createObjectURL(data);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
  }

  return (
    <Button type={'link'} disabled={disabled || loading} onClick={handleDownload}>
      {
        loading ? '下载中...' : '下载授权文件'
      }
    </Button>
  )
}

export default DownLoad