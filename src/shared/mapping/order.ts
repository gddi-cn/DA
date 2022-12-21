import {OrderStatus} from "@src/shared/enum/order";

export const orderStatusNameMapping: Map<OrderStatus, string> = new Map([
  [OrderStatus.COMMIT, /*      */'提交需求'],
  [OrderStatus.NOT_START, /*   */'确认需求'],
  [OrderStatus.IN_PROGRESS, /* */'数据标注'],
  [OrderStatus.ACCEPTANCE, /*  */'审核验收'],
  [OrderStatus.REWORK, /*      */'返工'],
  [OrderStatus.FINISHED, /*    */'完成'],
  [OrderStatus.ABROGATION, /*  */'需求终止'],
])