import React from "react";
import { useAtom } from "jotai";
import _ from "lodash";

import deviceGroupAPI from "@src/apis/deviceGroups";
import { DeviceType } from "@src/shared/enum/device";
import { DeviceGroupOptions } from "@src/shared/types/deviceGroup";
import { GroupDevice } from "@src/shared/types/device";
import { message } from "antd";

import {
  edgeDeviceListAtom,
  edgeGroupRemoteSearchRefAtom,
  edgeNameAtom,
  edgePageAtom,
  edgePageSizeAtom,
  edgeTotalAtom,
  fetchingEdgeAtom,
  selectedEdgeDeviceIdListAtom,
  selectedEdgeGroupAtom,
} from "@views/Space/Content/Device/store";
import deviceAPI from "@src/apis/device";
import { RemoteSearchRef } from "@src/components/RemoteSearch/RemoteSearch";

export const useRefreshEdgeDevice = () => {
  const [group] = useAtom(selectedEdgeGroupAtom);
  const [name] = useAtom(edgeNameAtom);
  const [, setList] = useAtom(edgeDeviceListAtom);
  const [page, setPage] = useAtom(edgePageAtom);
  const [page_size] = useAtom(edgePageSizeAtom);
  const [, setETotal] = useAtom(edgeTotalAtom);
  const [loading, setLoading] = useAtom(fetchingEdgeAtom);
  const [, setSelectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);

  const groupId = group?.value;

  return async (firstPage?: boolean) => {
    if (groupId !== 0 && !groupId) return;

    if (loading) return;

    setLoading(true);
    firstPage && setPage(1)
    const { success, data } = await deviceGroupAPI.fetchGroupDeviceList(
      groupId,
      {
        name,
        page,
        page_size,
        type: DeviceType.EDGE,
      }
    );
    setLoading(false);

    setSelectedDeviceIdList([]);

    if (!success || !data) {
      setETotal(0);
      setList([]);
      return;
    }

    setETotal(data.total || 0);
    setList(data.items || []);
  };
};

export const useEdge = () => {
  const [group] = useAtom(selectedEdgeGroupAtom);
  const [name] = useAtom(edgeNameAtom);
  const [page, setPage] = useAtom(edgePageAtom);
  const [page_size, setPageSize] = useAtom(edgePageSizeAtom);
  const [deviceList] = useAtom(edgeDeviceListAtom);
  const [selectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);
  const [loading, setLoading] = useAtom(fetchingEdgeAtom);
  const [total] = useAtom(edgeTotalAtom);

  const groupId = group?.value;

  const refresh = useRefreshEdgeDevice();

  const handleChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  React.useEffect(() => {
    refresh(true);
  }, [groupId, name, page_size]);

  React.useEffect(() => {
    refresh();
  }, [page]);

  return {
    page,
    pageSize: page_size,
    total,
    handleChange,
    showOperations: selectedDeviceIdList?.length > 0,
    showDeleteGroup: deviceList.length <= 0,
    loading,
  };
};

export const useNameFilter = () => {
  const [name, setName] = useAtom(edgeNameAtom);
  const [localName, setLocalName] = React.useState<string>("");
  const [, setPage] = useAtom(edgePageAtom)

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

export const useDeviceGroupSelector = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(
    selectedEdgeGroupAtom
  );

  const [, setEdgeGroupSelectorRef] = useAtom(edgeGroupRemoteSearchRefAtom)
  const edgeGroupSelectorRef = React.useRef<RemoteSearchRef>(null)


  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter((x) => x.value === 0);
    setSelectedDeviceGroup(defaultGroup || null);
  }, []);

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null);
  };

  React.useEffect(
    () => {
      setEdgeGroupSelectorRef(edgeGroupSelectorRef)
      return () => {
        setEdgeGroupSelectorRef(undefined)
      }
    },
    []
  )

  return {
    selectedDeviceGroup,
    onFirstLoad,
    handleChange,
    edgeGroupSelectorRef,
  };
};

export const useEdgeList = () => {
  const [dataSource] = useAtom(edgeDeviceListAtom);
  const [loading] = useAtom(fetchingEdgeAtom);
  const [, setSelectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);

  const handleSelectedChange = (idList: Array<GroupDevice["id"]>) => {
    setSelectedDeviceIdList(idList);
  };

  return {
    showNoData: !dataSource.length,
    loading,
    dataSource,
    handleSelectedChange,
  };
};

export const useMoveDevice = () => {
  const [selectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sourceGroupOptions] = useAtom(selectedEdgeGroupAtom);
  const [targetGroupOptions, setTargetGroupOptions] =
    React.useState<DeviceGroupOptions | null>(null);

  const sourceGroupId = sourceGroupOptions?.value;
  const targetGroupId = targetGroupOptions?.value;

  const refresh = useRefreshEdgeDevice();

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter((x) => x.value === 0);
    setTargetGroupOptions(defaultGroup || null);
  }, []);

  const handleChange = (value?: DeviceGroupOptions) => {
    setTargetGroupOptions(value || null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleMove = () => {
    if (loading) return;
    if (!selectedDeviceIdList.length) return;
    if (
      (sourceGroupId !== 0 && !sourceGroupId) ||
      (targetGroupId !== 0 && !targetGroupId)
    )
      return;

    setLoading(true);
    Promise.all(
      selectedDeviceIdList.map((id) =>
        deviceGroupAPI.moveDevice(id, sourceGroupId, targetGroupId)
      )
    ).then((resList) => {
      setLoading(false);
      const success = resList.every((x) => x.success);

      if (success) {
        message.success("移动成功");
      }

      refresh();
    });
  };

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    targetGroupOptions,
    onFirstLoad,
    handleChange,
    handleMove,
  };
};

export const useCopyDevice = () => {
  const [selectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sourceGroupOptions] = useAtom(selectedEdgeGroupAtom);
  const [targetGroupOptions, setTargetGroupOptions] =
    React.useState<DeviceGroupOptions | null>(null);

  const sourceGroupId = sourceGroupOptions?.value;
  const targetGroupId = targetGroupOptions?.value;

  const refresh = useRefreshEdgeDevice();

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter((x) => x.value === 0);
    setTargetGroupOptions(defaultGroup || null);
  }, []);

  const handleChange = (value?: DeviceGroupOptions) => {
    setTargetGroupOptions(value || null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleCopy = () => {
    if (loading) return;
    if (!selectedDeviceIdList.length) return;
    if (
      (sourceGroupId !== 0 && !sourceGroupId) ||
      (targetGroupId !== 0 && !targetGroupId)
    )
      return;

    setLoading(true);
    Promise.all(
      selectedDeviceIdList.map((id) =>
        deviceGroupAPI.copyDevice(id, sourceGroupId, targetGroupId)
      )
    ).then((resList) => {
      setLoading(false);
      const success = resList.every((x) => x.success);

      if (success) {
        message.success("复制成功");
      }

      refresh();
    });
  };

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    targetGroupOptions,
    onFirstLoad,
    handleChange,
    handleCopy,
  };
};

export const useUnregister = () => {
  const [selectedDeviceIdList] = useAtom(selectedEdgeDeviceIdListAtom);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [groupOptions] = useAtom(selectedEdgeGroupAtom);

  const refresh = useRefreshEdgeDevice();

  const groupId = groupOptions?.value;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleUnregister = () => {
    if (loading) return;
    if (groupId !== 0 && !groupId) return;
    if (!selectedDeviceIdList.length) return;

    setLoading(true);
    Promise.all(
      selectedDeviceIdList.map((id) => deviceGroupAPI.unregister(id, groupId))
    ).then((resList) => {
      setLoading(false);
      const success = resList.every((x) => x.success);

      if (success) {
        message.success("注销成功");
      }

      refresh();
    });
  };

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    handleUnregister,
  };
};

export const useDeleteGroup = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [groupOptions, setGroupOptions] = useAtom(selectedEdgeGroupAtom);
  const [edgeGroupSelectorRef] = useAtom(edgeGroupRemoteSearchRefAtom)

  const groupId = groupOptions?.value;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleDeleteGroup = async () => {
    if (loading) return;
    if (!groupId) return;

    setLoading(true);
    const { success } = await deviceGroupAPI.delete(groupId);
    setLoading(false);

    edgeGroupSelectorRef?.current?.refresh && edgeGroupSelectorRef?.current?.refresh()

    if (success) {
      message.success("删除成功");
    }

    setGroupOptions({ key: 0, value: 0, label: "默认组" });
  };

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    handleDeleteGroup,
    show: groupId && groupId !== 0,
  };
};

export const useGenCode = () => {
  const [step, setStep] = React.useState<"group" | "code">("group");
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedDeviceGroup, setSelectedDeviceGroup] =
    React.useState<DeviceGroupOptions | null>(null);
  const [code, setCode] = React.useState<string>("");

  const groupId = selectedDeviceGroup?.value;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter((x) => x.value === 0);
    setSelectedDeviceGroup(defaultGroup || null);
  }, []);

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null);
  };

  const handleGen = async () => {
    if (!groupId || loading) return;

    setLoading(true);
    const { success, data } = await deviceAPI.genAuthCode(groupId);
    setLoading(false);

    if (!success || !data) {
      setCode("");
      return;
    }

    setStep("code");
    setCode(data);

    try {
      await navigator.clipboard.writeText(data);
    } catch {
      message.warn("无法复制注册码，请手动复制");
    }
  };

  const handleBack = () => {
    setStep("group");
  };

  React.useEffect(() => {
    if (!open) {
      setStep("group");
    }
  }, [open]);

  return {
    step,
    open,
    loading,
    code,
    handleOpen,
    handleClose,
    selectedDeviceGroup,
    onFirstLoad,
    handleChange,
    disableGen: !groupId && groupId !== 0,
    handleGen,
    handleBack,
  };
};
