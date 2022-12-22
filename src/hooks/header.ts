import {ProjectStatus} from "@src/shared/enum/project";
import projectAPI from "@src/apis/project";
import {useDispatch, useSelector} from "react-redux";
import {checkoutTask, saveTaskActiveList} from "@reducer/tasksSilce";
import {RootState} from "@reducer";
import {useNavigate} from "react-router-dom";
import { APP_GUIDE_PAGE } from "@router";
import {socketPushMsgForProject} from "@ghooks";
import { SNAPSHOT_KEY_OF_ROUTER } from "@src/constants";


export const useHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id: projectId } = useSelector((state: RootState) =>
    state.tasksSilce?.activeTaskInfo || { id: undefined }
  )

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const syncActiveTask = async (): Promise<boolean> => {
    const params: Project.ListParams = {
      status: ProjectStatus.ACTIVE,
      sort: 'desc',
      order: 'updated',
      page_size: 6,
      page: 1,
    }

    const { success, data } = await projectAPI.list(params)

    if (!success || !data) return false

    // 当前 project 不在列表中，将当前 project 设为 null
    if (!data.items?.some(x => x.id === projectId)) {
      dispatch(checkoutTask(null))
      navigate(APP_GUIDE_PAGE)
    }

    dispatch(saveTaskActiveList(data.items || []))

    return true
  }

  const deleteCurrentProject = async (): Promise<boolean> => {
    if (!projectId) return false

    const { success } = await projectAPI.delete(projectId)

    if (!success) return false

    return await syncActiveTask()
  }

  const updateCurrentProjectStatus = (pathname: string) => {
    navigate({ pathname })
    socketPushMsgForProject(activePipeLine, {
      active_page: (SNAPSHOT_KEY_OF_ROUTER as any)[pathname]
    })
  }

  return {
    syncActiveTask,
    deleteCurrentProject,
    updateCurrentProjectStatus,
  }
}