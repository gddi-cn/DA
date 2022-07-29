import type { SetStateAction, Dispatch } from 'react'
import type { VersionInfo } from '@reducer/modelDetailSlice/modelDetailSlice.d.ts'
export = ModelDetailType;
export as namespace ModelDetailType;

type Partial<T> = {
    [P in keyof T]?: any
}

declare namespace ModelDetailType {

    interface TrainingOrFailedProps {

        id?: string,

    }

    interface TrianFlowProps {

        id?: string,
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

    interface TransversionProps {
        versionInfo: VersionInfo | undefined,
    }

    interface ForecastExampleProps {
        versionInfo: VersionInfo | undefined,
    }
}
