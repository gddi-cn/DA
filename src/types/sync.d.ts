declare namespace Sync {
  interface ListParams {
    page: number,
    page_size: number,
    state?: import('@src/shared/enum/sync').Sync.State,
  }

  interface SyncParams {
    apps: Array<App.Instance['id']>
    device_ids: Array<Device.Instance['id']>
    expire_seconds: number;
    limit?: number;
  }

  interface Instance {
    config_url: string
    create_time: number
    devices: Array<Device.SyncInstance>
    failed_count: number
    group_id: number
    group_name: string
    id: number
    pending_count: number
    success_count: number
    sync_state: 'Done' | 'InProgress' | 'Failure'
    total: number
  }
}
