import { ProjectStatus } from '@src/shared/enum/project'

export interface UpdateProjectData {
  dataset: {
    id: string,
  },
  model: {
    id: string,
    version_id: string,
  },
  name: string,
  status?: ProjectStatus,
}

export interface UpdateProjectResponse {
  additional: {
    cover: string,
    eta: number,
    model_type: string,
    platform: string,
    status: number
  },
  created: number,
  dataset: {
    id: string,
  },
  model: {
    id: string,
    version_id: string,
  },
  name: string,
  status: ProjectStatus,
  updated: number,
}