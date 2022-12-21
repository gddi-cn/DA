import {useAtom} from "jotai";

import { orderDetailAtom } from '../store'
import {OrderStatus} from "@src/shared/enum/order";
import {formatUnixDate} from "@src/utils/tools";

export const useMeta = () => {
  const [orderDetail]  = useAtom(orderDetailAtom)
  const { name, status, created, totalImage, demandDocUrl } = orderDetail || {}

  return {
    name: name || '-',
    totalImage: status && (status >= OrderStatus.IN_PROGRESS)
      ? (totalImage || totalImage === 0 ? `${totalImage} 张` : '-') : '-',
    createdAt: created ? formatUnixDate(created) : '-',
    demandDocUrl,
  }
}
