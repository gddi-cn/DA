import { atom } from "jotai";
import { Deploy } from "./enums";
import { atomWithRefresh } from "@src/utils/atomCreators";
import appAPI from "@src/apis/app";
import { currentVersionIdAtom } from "@src/components/ModelVersionSelector/store";

export const currentStepAtom = atom<Deploy.Step>(Deploy.Step.SELECT_APP)

export const selectedAppListAtom = atom<App.Instance[]>([])


export const appListAtom = atomWithRefresh(async (get) => {
  const model_iter_id = get(currentVersionIdAtom)
  const { success, data } = await appAPI.list({
    page: 1,
    page_size: 999,
    model_iter_id,
  })

  if (!success || !data?.items) return []

  return data.items
})

export const createAppOpenAtom = atom<boolean>(false)
