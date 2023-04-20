import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authUserInfoAtom } from "@src/store/user";
import { currentPageAtom } from "../store";
import { Space } from "../enums";
import systemAPI from "@src/apis/system";
import { channelAtom, channelRestAtom, channelTotalAtom, deviceAtom, deviceRestAtom, deviceTotalAtom, expireAtom, loadingAtom, modelAtom, modelAuthAtom, modelAuthRestAtom, modelAuthTotalAtom, modelRestAtom, modelTotalAtom, onlineDeviceAtom, onlineDeviceRestAtom, onlineDeviceTotalAtom } from "./store";
import { formatUnixDate } from "@src/utils/tools";
import moment from "moment";

const useGreeting = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [greeting, setGreeting] = React.useState<string>("上午好!");

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("上午好!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("下午好!");
    } else {
      setGreeting("晚上好!");
    }
  };

  React.useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    getGreeting();

    timerRef.current = setInterval(getGreeting, 6e4);

    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  return greeting;
};

export const useLeftContent = () => {
  const [userInfo] = useAtom(authUserInfoAtom);
  const greeting = useGreeting();

  return {
    greeting,
    username: userInfo?.nick_name || "-",
  };
};

export const useRefreshUsage = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  const setChannelRest = useSetAtom(channelRestAtom)
  const setChannelTotal = useSetAtom(channelTotalAtom)
  const setModelRest = useSetAtom(modelRestAtom)
  const setModelTotal = useSetAtom(modelTotalAtom)
  const setDeviceRest = useSetAtom(deviceRestAtom)
  const setDeviceTotal = useSetAtom(deviceTotalAtom)
  const setOnlineDeviceRest = useSetAtom(onlineDeviceRestAtom)
  const setOnlineDeviceTotal = useSetAtom(onlineDeviceTotalAtom)
  const setExpire = useSetAtom(expireAtom)
  const setModelAuthRest = useSetAtom(modelAuthRestAtom)
  const setModelAuthTotal = useSetAtom(modelAuthTotalAtom)

  return async () => {
    if (loading) return

    setLoading(true)
    const { success, data } = await systemAPI.license()
    setLoading(false)

    if (!success || !data?.license) return

    const {
      channel,
      channel_total,
      model,
      model_total,
      device,
      device_total,
      online_device,
      online_device_total,
      expire,
      model_auth,
      model_auth_total,
    } = data.license

    setChannelRest(channel)
    setChannelTotal(channel_total)
    setModelRest(model)
    setModelTotal(model_total)
    setDeviceRest(device)
    setDeviceTotal(device_total)
    setOnlineDeviceRest(online_device)
    setOnlineDeviceTotal(online_device_total)
    setExpire(expire)
    setModelAuthRest(model_auth)
    setModelAuthTotal(model_auth_total)
  };
};

export const useResetUseage = () => {
  const setLoading = useSetAtom(loadingAtom)
  const setChannelRest = useSetAtom(channelRestAtom)
  const setChannelTotal = useSetAtom(channelTotalAtom)
  const setModelRest = useSetAtom(modelRestAtom)
  const setModelTotal = useSetAtom(modelTotalAtom)
  const setDeviceRest = useSetAtom(deviceRestAtom)
  const setDeviceTotal = useSetAtom(deviceTotalAtom)
  const setOnlineDeviceRest = useSetAtom(onlineDeviceRestAtom)
  const setOnlineDeviceTotal = useSetAtom(onlineDeviceTotalAtom)
  const setExpire = useSetAtom(expireAtom)
  const setModelAuthRest = useSetAtom(modelAuthRestAtom)
  const setModelAuthTotal = useSetAtom(modelAuthTotalAtom)

  React.useEffect(
    () => {
      return () => {
        setLoading(true)
        setChannelRest(0)
        setChannelTotal(0)
        setModelRest(0)
        setModelTotal(0)
        setDeviceRest(0)
        setDeviceTotal(0)
        setOnlineDeviceRest(0)
        setOnlineDeviceTotal(0)
        setExpire(0)
        setModelAuthRest(0)
        setModelAuthTotal(0)
        setLoading(false)
      }
    },
    []
  )
}

export const useUsage = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const loading = useAtomValue(loadingAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  useResetUseage()
  const refresh = useRefreshUsage();

  const handleClick = () => {
    setCurrentPage(Space.Page.USAGE);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  React.useEffect(() => {
    const $c = containerRef.current;
    if (!$c) return;

    if (currentPage === Space.Page.USAGE) {
      $c.setAttribute("selected", "");
    } else {
      $c.removeAttribute("selected");
    }
  }, [currentPage]);

  return {
    containerRef,
    loading,
    handleClick,
  };
};

export const useAccount = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const active = currentPage === Space.Page.ACCOUNT

  const handleClick = () => {
    setCurrentPage(Space.Page.ACCOUNT);
  };

  React.useEffect(() => {
    const $c = containerRef.current;
    if (!$c) return;

    if (active) {
      $c.setAttribute("selected", "");
    } else {
      $c.removeAttribute("selected");
    }
  }, [currentPage]);

  return {
    active,
    handleClick,
    containerRef,
  };
};

export const useDevice = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const active = currentPage === Space.Page.DEVICE

  const handleClick = () => {
    setCurrentPage(Space.Page.DEVICE);
  };

  React.useEffect(() => {
    const $c = containerRef.current;
    if (!$c) return;

    if (active) {
      $c.setAttribute("selected", "");
    } else {
      $c.removeAttribute("selected");
    }
  }, [currentPage]);

  return {
    active,
    handleClick,
    containerRef,
  };
};

export const useApp = () => {
  
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const active = currentPage === Space.Page.APP

  const handleClick = () => {
    setCurrentPage(Space.Page.APP);
  };

  React.useEffect(() => {
    const $c = containerRef.current;
    if (!$c) return;

    if (active) {
      $c.setAttribute("selected", "");
    } else {
      $c.removeAttribute("selected");
    }
  }, [currentPage]);

  return {
    active,
    handleClick,
    containerRef,
  };
}

export const useDeploy = () => {
  
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const active = currentPage === Space.Page.DEPLOY

  const handleClick = () => {
    setCurrentPage(Space.Page.DEPLOY);
  };

  React.useEffect(() => {
    const $c = containerRef.current;
    if (!$c) return;

    if (active) {
      $c.setAttribute("selected", "");
    } else {
      $c.removeAttribute("selected");
    }
  }, [currentPage]);

  return {
    active,
    handleClick,
    containerRef,
  };
}

export const useModelAuth = () => {
  const modelAuth = useAtomValue(modelAuthAtom)
  const modelAuthTotal = useAtomValue(modelAuthTotalAtom)

  const progress = modelAuthTotal === 0 ? 1 : (modelAuth / modelAuthTotal) * 100 | 0
  const tip = `${modelAuth} / ${modelAuthTotal} 个`

  return {
    progress,
    tip,
  }

}

export const useChannel = () => {
  const channel = useAtomValue(channelAtom)
  const channelTotal = useAtomValue(channelTotalAtom)

  const progress = channelTotal === 0 ? 1 : (channel / channelTotal) * 100 | 0
  const tip = `${channel} / ${channelTotal} 路`

  return {
    progress,
    tip,
  }
}

export const useModel = () => {
  const model = useAtomValue(modelAtom)
  const modelTotal = useAtomValue(modelTotalAtom)

  const progress = modelTotal === 0 ? 1 : (model / modelTotal) * 100 | 0
  const tip = `${model} / ${modelTotal} 个`

  return {
    progress,
    tip,
  }
}

// 应用设备
export const useEdgeDevice = () => {
  const onlineDevice = useAtomValue(onlineDeviceAtom)
  const onlineDeviceTotal = useAtomValue(onlineDeviceTotalAtom)

  const progress = onlineDeviceTotal === 0 ? 1 : (onlineDevice / onlineDeviceTotal) * 100 | 0
  const tip = `${onlineDevice} / ${onlineDeviceTotal} 台`

  return {
    progress,
    tip,
  }
}

// SDK 设备
export const useTerminalDevice = () => {
  const device = useAtomValue(deviceAtom)
  const deviceTotal = useAtomValue(deviceTotalAtom)

  const progress = deviceTotal === 0 ? 1 : (device / deviceTotal) * 100 | 0
  const tip = `${device} / ${deviceTotal} 台`

  return {
    progress,
    tip,
  }
}

export const useExprie = () => {
  const expire = useAtomValue(expireAtom)

  const date = moment(expire * 1000).format('YYYY-MM-DD')

  return {
    date,
  }
}
