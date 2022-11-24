import React from 'react'
import { DatasetDownloadStatus } from '@src/shared/enum/dataset'
import { SmallButton } from '@src/UIComponents'
import styled from 'styled-components'
import { datasetDownloadStatusNameMapping } from '@src/shared/mapping/dataset'
import { Dataset } from '@src/shared/types/dataset'
import datasetAPI from '@src/apis/dataset'

const Container = styled.div`
  margin-left: 8px;
`

const Download: React.FC<Dataset & { refresh: () => void }> = (
  {
    id,
    download,
    refresh,
  }
) => {
  const { status, url } = download || {}

  const disabled = status === DatasetDownloadStatus.DOWNLOADING

  const handleApply = () => {
    datasetAPI.applyDownload(id)
      .then(() => {
        refresh()
      })
  }

  const handleDownload = () => {
    if (!url) return

    const $a = document.createElement('a')
    $a.href = url
    $a.target = '_blank'
    document.body.appendChild($a)
    $a.click()
    $a.remove()
  }

  const handleClick = () => {
    switch (status) {
      case DatasetDownloadStatus.UNKNOWN:
        handleApply()
        break
      case DatasetDownloadStatus.FAILED:
        handleApply()
        break
      case DatasetDownloadStatus.SUCCESS:
        handleDownload()
        break
      default:
        break
    }
  }

  return (
    <Container>
      <SmallButton type={'nomal'} disabled={disabled} onClick={handleClick}>
        { datasetDownloadStatusNameMapping.get(status) || '重新申请' }
      </SmallButton>
    </Container>
  )
}

export default Download
