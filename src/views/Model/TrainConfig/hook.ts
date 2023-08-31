import {useSelector} from "react-redux";

import chipAPI from "@src/apis/chip";
import {ModelTrainMode} from "@src/shared/enum/model";
import {RootState} from "@reducer";
import {
  MAX_FPS,
  selectedChipAtom,
  stepAtom,
  applicationAtom,
  useResetStore, configFpsAtom, configConcurrentAtom, maxChannelAtom
} from "./store";
import {useAtomValue, useSetAtom} from "jotai";

export const useFetchRecommendConfig = () => {
  const selectedChip = useAtomValue(selectedChipAtom)
  const application = useAtomValue(applicationAtom)
  const maxChannel = useAtomValue(maxChannelAtom)
  const setFps = useSetAtom(configFpsAtom)
  const setConcurrent = useSetAtom(configConcurrentAtom)

  const task_type = useSelector((state: RootState) =>
    state.tasksSilce?.activePipeLine?.APP_DATA_SET_INDEX?.scene
  )

  return async () => {
    if (!selectedChip || !task_type) return

    const { name, chip_type, brand } = selectedChip

    const { success, data } = await chipAPI.fetchRecommendConfig(application, {
      task_type,
      chip_type,
      name,
      mode: ModelTrainMode.ACC,
      brand
    })

    if (!success || !data) {
      setFps(5)
      setConcurrent(1)
      return
    }

    const fps = data.fps || 5
    const channel = data.channel || 1

    setFps(Math.min(fps, MAX_FPS))
    setConcurrent(Math.min(channel, maxChannel))
  }
}

export const useTrainConfig = () => {
  useResetStore()
  const step = useAtomValue(stepAtom)

  return {
    step,
  }
}
