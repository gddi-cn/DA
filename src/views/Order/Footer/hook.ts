import {useAtom} from "jotai";
import { orderDetailAtom } from '../store'
import {OrderStatus} from "@src/shared/enum/order";

export const useFooter = () => {
  const [order] = useAtom(orderDetailAtom)
  const { status } = order || { }

  const showCancel = status !== OrderStatus.ABROGATION && status !== OrderStatus.FINISHED

  const showDelete = status === OrderStatus.ABROGATION

  const showFinish = status === OrderStatus.FINISHED

  // TODO Impl buttons' click action
  const handleCancel = () => {

  }

  const handleDelete =  () => {

  }

  const handleFinish = () => {

  }

  return {
    showCancel,
    showDelete,
    showFinish,
    handleCancel,
    handleDelete,
    handleFinish,
  }
}
