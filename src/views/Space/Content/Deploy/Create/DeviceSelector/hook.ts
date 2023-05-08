import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import _ from 'lodash'

import {
  selectedDeviceGroupAtom,
  deviceNameAtom,
  devicePageAtom,
  deviceListAtom,
  devicePageSizeAtom,
  deviceTotalAtom,
  fetchingDeviceAtom,
  stepAtom,
  selectedDeviceListAtom,
  deviceTypeAtom,
  selectedAppListAtom,
  sortAtom,
  sortByAtom,
} from "../store";
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { currentPageAtom } from '../../store';
import { Space } from '@src/views/Space/enums';
import deviceGroupAPI from '@src/apis/deviceGroups';
import { DeviceType } from '@src/shared/enum/device';
import { GroupDevice } from '@src/shared/types/device';
import produce from 'immer';

export const useDeviceGroupSelector = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(
    selectedDeviceGroupAtom
  );

  const onFirstLoad = React.useCallback((o: any[]) => {
    if (!selectedDeviceGroup) return

    const [selected] = o.filter(x => x.value === selectedDeviceGroup.value)
    setSelectedDeviceGroup(selected || null);
  }, []);

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null);
  };


  return {
    selectedDeviceGroup,
    onFirstLoad,
    handleChange,
  };
};

export const useNameFilter = () => {
  const [name, setName] = useAtom(deviceNameAtom);
  const [localName, setLocalName] = React.useState<string>("");
  const [, setPage] = useAtom(devicePageAtom)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalName(e.target.value);
  };

  const debouncedSetName = React.useMemo(() => _.debounce(setName, 200), []);

  React.useEffect(() => {
    debouncedSetName(localName);
  }, [localName]);

  React.useEffect(() => {
    setPage(1)
  }, [name])

  return {
    name: localName,
    handleChange,
  };
};

export const useRefreshDevice = () => {
  const [group] = useAtom(selectedDeviceGroupAtom);
  const [name] = useAtom(deviceNameAtom);
  const [, setList] = useAtom(deviceListAtom);
  const [page, setPage] = useAtom(devicePageAtom);
  const [page_size] = useAtom(devicePageSizeAtom);
  const [, setTotal] = useAtom(deviceTotalAtom);
  const [loading, setLoading] = useAtom(fetchingDeviceAtom);
  const [selectedDeviceType] = useAtom(deviceTypeAtom)
  const sort = useAtomValue(sortAtom)
  const sortBy = useAtomValue(sortByAtom)

  const device_chip_id = selectedDeviceType?.value

  const groupId = group?.value;

  return async (firstPage?: boolean) => {
    if (loading) return;

    setLoading(true);
    firstPage && setPage(1)
    const { success, data } = await deviceGroupAPI.fetchDeviceList(
      {
        name,
        page,
        page_size,
        type: DeviceType.EDGE,
        device_chip_id,
        group: groupId ?? -1,
        sort,
        sort_by: sortBy,
      }
    );
    setLoading(false);

    if (!success || !data) {
      setTotal(0);
      setList([]);
      return;
    }

    setTotal(data.total || 0);
    setList(data.items || []);
  };
};

export const useDeviceSelector = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setStep] = useAtom(stepAtom)
  const [name] = useAtom(deviceNameAtom);
  const [page, setPage] = useAtom(devicePageAtom);
  const [page_size, setPageSize] = useAtom(devicePageSizeAtom);
  const [group] = useAtom(selectedDeviceGroupAtom)
  const [loading] = useAtom(fetchingDeviceAtom)
  const [total] = useAtom(deviceTotalAtom)
  const [deviceList] = useAtom(deviceListAtom)
  const [selectedDeviceList, setSelectedDeviceList] = useAtom(selectedDeviceListAtom)
  const [deviceType] = useAtom(deviceTypeAtom)

  const [sort, setSort] = useAtom(sortAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)

  const handleSortChange = (sort: 'asc' | 'desc', sortBy: 'name' | 'registered_time') => {
    setSort(sort)
    setSortBy(sortBy)
  }

  const disabledNext =
    selectedDeviceList.length <= 0
    || !deviceType

  const handleCancel = () => {
    setCurrentPage(Space.Deploy.Page.LIST)
  }

  const handleNext = () => {
    if (disabledNext) return
    setStep(Space.Deploy.Create.Step.APP)
  }

  const groupId = group?.value;

  const refresh = useRefreshDevice();

  const handleChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const selectedAll = React.useMemo(
    () =>
      deviceList.every(device => selectedDeviceList.some(x => x.id === device.id))
      && deviceList.length > 0,
    [deviceList, selectedDeviceList]
  )

  const indeterminate = React.useMemo(
    () =>
      deviceList.some(d => selectedDeviceList.some(x => x.id === d.id))
      && deviceList.length > 0,
    [deviceList, selectedDeviceList]
  )

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedDeviceList(
        _.differenceWith(
          selectedDeviceList,
          _.intersectionWith(
            selectedDeviceList,
            deviceList,
            (a, b) => a.id === b.id
          ),
          (a, b) => a.id === b.id
        )
      )
      return
    }

    setSelectedDeviceList(produce(draft => {
      draft.push(
        ..._.differenceWith(deviceList, selectedDeviceList, (a, b) => a.id === b.id)
      )
    }))
  }

  React.useEffect(() => {
    refresh(true);
  }, [groupId, name, page_size, deviceType, sort, sortBy]);

  React.useEffect(() => {
    refresh();
  }, [page]);

  return {
    disabledNext,
    handleCancel,
    handleNext,
    handleChange,
    loading,
    total,
    page,
    pageSize: page_size,
    deviceList,
    selectedAll,
    indeterminate,
    handleSelectAll,
    selectedCount: selectedDeviceList.length,
    disabledSelect: !deviceType,
    sort,
    sortBy,
    handleSortChange,
  }
}


export const useRow = (device: GroupDevice) => {
  const [selectedDeviceList, setSelectedDeviceList] = useAtom(selectedDeviceListAtom)
  const idx = selectedDeviceList.findIndex(x => x.id === device.id)
  const selected = idx >= 0
  const [deviceType] = useAtom(deviceTypeAtom)

  const handleSelect = () => {
    if (!deviceType) return

    if (selected) {
      setSelectedDeviceList(produce(draft => {
        draft.splice(idx, 1)
      }))
      return
    }
    setSelectedDeviceList(produce(draft => {
      draft.push(device)
    }))
  }

  return {
    selected,
    handleSelect,
    disabledSelect: !deviceType,
  }
}

export const useSelectDeviceType = () => {
  const [deviceType, setDeviceType] = useAtom(deviceTypeAtom)
  const [, setSelectedAppList] = useAtom(selectedAppListAtom)
  const [, setSelectedDeviceList] = useAtom(selectedDeviceListAtom)

  const handleChange = (value?: Device.Chip.Option) => {
    setDeviceType(value || undefined)
    setSelectedAppList([])
    setSelectedDeviceList([])
  }

  return {
    value: deviceType,
    handleChange,
  }
}
