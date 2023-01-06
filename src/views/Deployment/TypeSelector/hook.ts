import React from 'react'
import { useAtom } from 'jotai'

import { DeployType } from '@src/shared/enum/deploy'
import { deployTypeDescMapping, deployTypeLogoMapping, deployTypeNameMapping } from '@src/shared/mapping/deploy'
import { selectedTypeAtom } from './store'
import { APP_EXPERIENCE, APP_SDK_Documents } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { useNavigate } from 'react-router-dom'

export const useItemCard = (deployType: DeployType) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom)

  const { logo, title, description } = React.useMemo(
    () => {
      const logo = deployTypeLogoMapping.get(deployType)
      const title = deployTypeNameMapping.get(deployType)
      const description = deployTypeDescMapping.get(deployType)

      return {
        logo,
        title,
        description,
      }
    },
    [deployType]
  )

  const selected = selectedType === deployType

  const handleClick = () => {
    if (selected) return setSelectedType(null)
    setSelectedType(deployType)
  }


  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  React.useEffect(
    () => {
      return () => setSelectedType(null)
    },
    []
  )

  return {
    containerRef,
    logo,
    title,
    description,
    handleClick,
  }
}

export const useFooter = () => {
  const [selectedType] = useAtom(selectedTypeAtom)
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const toSdk = () => {
    navigate({
      pathname: APP_SDK_Documents
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SDK_Documents
      }
    )
  }

  const toExperience = () => {
    navigate({
      pathname: APP_EXPERIENCE,
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_EXPERIENCE,
      }
    )
  }

  const handleClick = () => {
    if (!selectedType) return

    switch (selectedType) {
      case DeployType.SDK:
        toSdk()
        break
      case DeployType.EXPERIENCE:
        toExperience()
        break
      default:
        break
    }
  }

  return {
    disabled: selectedType === null,
    handleClick,
  }
}
