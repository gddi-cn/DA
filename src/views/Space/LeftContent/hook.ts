import React from "react";
import { useAtom } from "jotai";
import { authUserInfoAtom } from "@src/store/user";
import { fetchingUsageAtom, usageAtom, currentPageAtom } from "../store";
import userAPI from "@src/apis/user";
import { Space } from "../enums";

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
  const [, setUsage] = useAtom(usageAtom);
  const [loading, setLoading] = useAtom(fetchingUsageAtom);

  return async () => {
    if (loading) return;

    setLoading(true);
    const { success, data } = await userAPI.usage();
    setLoading(false);

    if (!success || !data) {
      setUsage(null);
      return;
    }

    setUsage(data);
  };
};

export const useUsage = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [loading] = useAtom(fetchingUsageAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

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

export const useTrainTime = () => {
  const [usage] = useAtom(usageAtom);

  const { train_usage, train_limited } = usage || {
    train_limited: 1,
    train_usage: 0,
  };

  const noLimit = train_limited === 0;

  const progress = noLimit
    ? 0
    : (((train_usage / train_limited) * 10000) | 0) / 100;

  const used = ((train_usage / 6) | 0) / 10;
  const total = noLimit ? "无限制" : ((train_limited / 6) | 0) / 10;

  const tip = `${used} / ${total} 小时`;

  return {
    tip,
    progress,
  };
};

export const useStorage = () => {
  const [usage] = useAtom(usageAtom);

  const { storage_limited, storage_usage } = usage || {
    storage_limited: 1,
    storage_usage: 0,
  };

  const noLimit = storage_limited === 0;

  const progress = noLimit
    ? 0
    : (((storage_usage / storage_limited) * 10000) | 0) / 100;

  const used = (storage_usage / 2 ** 30).toFixed(1);
  const limited = noLimit ? "无限制" : (storage_limited / 2 ** 30).toFixed(1);

  const tip = `${used} / ${limited} GB`;

  return {
    progress,
    tip,
  };
};

export const useAuthModel = () => {
  const [usage] = useAtom(usageAtom);

  const { authorization_usage: usaged, authorization_limited: limited } =
    usage || { authorization_usage: 0, authorization_limited: 1 };

  return {
    usaged,
    limited: limited === 0 ? "无限制" : limited + "",
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
