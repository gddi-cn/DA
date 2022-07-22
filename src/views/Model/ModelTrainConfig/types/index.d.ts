import type { SetStateAction, Dispatch } from 'react'
import type { FormInstance } from 'antd'
export = ModelTrainConfigType;
export as namespace ModelTrainConfigType;

type Partial<T> = {
    [P in keyof T]?: any
}

declare namespace ModelTrainConfigType {

    interface ChipFetchResItem {
        application?: string,
        brand?: string,
        chip_type?: string,
        fps_limited?: number
        name?: string,
        summary?: string,
        url?: string,
    }

    interface ChipList {
        chipList: ChipFetchResItem[],
        onChange?:any,
        value?:any
        setSelected?:any
    }

    interface ChipItem {
        data: ChipFetchResItem,
        setSelected: Dispatch<SetStateAction<ChipFetchResItem>>,
        selected: ChipFetchResItem
    }

    interface ConfigSetting {
        // selected: ChipFetchResItem,
        formInstance:FormInstance,
        maxFps:number
    }
}
