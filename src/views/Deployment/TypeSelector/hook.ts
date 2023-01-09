import React from 'react'
import { useAtom } from 'jotai'

import { DeployType } from '@src/shared/enum/deploy'
import { deployTypeDescMapping, deployTypeLogoMapping, deployTypeNameMapping } from '@src/shared/mapping/deploy'
import { disabledTrialAtom, selectedTypeAtom } from './store'
import { APP_EXPERIENCE, APP_PLATFORM, APP_SDK_Documents } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { useNavigate } from 'react-router-dom'
import experienceAPI from '@src/apis/experience'

export const useItemCard = (deployType: DeployType, disabled: boolean) => {
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
    if (disabled) return
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
      const $c = containerRef.current
      if (!$c) return

      if (disabled) {
        $c.setAttribute('disabled', '')
      } else {
        $c.removeAttribute('disabled')
      }
    },
    [disabled]
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

  const toPlatform = () => {
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_PLATFORM,
      }
    )
    navigate(
      {
        pathname: APP_PLATFORM,
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
      case DeployType.PLATFORM:
        toPlatform()
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

export const useTypeSelector = () => {
  const modelVersionId = useSelector((state: RootState) => state.tasksSilce.activeTaskInfo?.model?.version_id)
  const [disabledTrial, setDisabledTrial] = useAtom(disabledTrialAtom)

  React.useEffect(
    () => {
      if (!modelVersionId) {
        setDisabledTrial(true)
        return
      }

      experienceAPI.check(modelVersionId)
        .then(({ success, data }) => {
          if (!success || !data) {
            setDisabledTrial(true)
            return
          }

          setDisabledTrial(!Boolean(data.supported))
        })
    },
    [modelVersionId]
  )

  return {
    disabledTrial,
  }
}
