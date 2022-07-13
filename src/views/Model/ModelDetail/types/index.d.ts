import type { SetStateAction, Dispatch } from 'react'

export = ModelDetailType;
export as namespace ModelDetailType;

type Partial<T> = {
    [P in keyof T]?: any
}

declare namespace ModelDetailType {

    interface VersionItem {
        created: string
        id: string
        name: string
        platform: string
        test_accuracy: number
        train_accuracy: number
    }

    interface TaskInfo {
        eta: number,
        progress: number,
        current: number,
        flows: any[]
    }

    interface IterInfo {
        app_data_args: string
        application: string
        begin: string
        created: string
        dataset_id: string
        description: string
        end: string
        engine: string
        gpu_count: number
        id: string
        inference_api: string
        model_type: string
        name: string
        onnx_path: string
        parent_id: string
        platform: string
        reason: string
        result: any
        status: number
        task_info: TaskInfo
        train_task_id: string
    }

    interface VersionInfo {
        cover: string
        created: string
        description: string
        id: string
        iter: IterInfo
        model_type: string
        name: string
    }

    interface TrainingOrFailedProps {
        currentVersion: VersionItem | undefined
        id: string,
        versionInfo: VersionInfo | undefined
    }

    interface TrainInfoProps {
        versionInfo: VersionInfo | undefined
    }

    interface TrianFlowProps {
        currentVersion: VersionItem | undefined,
        id: string
    }

    type TabIndex = 'train_process' | 'model_forecast' | 'model_contrast' | 'error_analysis'

    interface TrainSuccessProps {
        versionInfo: VersionInfo | undefined,
        id ?:string | undefined
    }

    interface ModelInfomationsProps {
        versionInfo: VersionInfo | undefined,
    }

    interface VerticalTabHandleProps {
        tabIndex: TabIndex,
        setTabIndex: Dispatch<SetStateAction<TabIndex>>
    }
}
