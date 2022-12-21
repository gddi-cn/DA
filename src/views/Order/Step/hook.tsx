import React from "react";
import {useAtom} from "jotai";
import {StepProps} from 'antd'
import styled from "styled-components";

import {orderDetailAtom} from '../store'
import {OrderStatus} from "@src/shared/enum/order";
import {orderStatusNameMapping} from "@src/shared/mapping/order";

import {ReactComponent as DoneIcon} from '../assets/icon/done.svg'
import {ReactComponent as ProcessIcon} from '../assets/icon/progressing.svg'
import {ReactComponent as FailIcon} from '../assets/icon/fail.svg'
import {ReactComponent as WaitIcon} from '../assets/icon/wait.svg'

const IconWrap = styled.div`
  height: 32px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const getStatus = (current: number, idx: number, error = false): StepProps['status'] => {
  if (idx === current) return error ? 'error' : 'process'

  if (idx < current) return 'finish'

  return 'wait'
}


const getIcon = (current: number, idx: number, error = false): StepProps['icon'] => {
  if (idx === current) return error ? <FailIcon /> : <ProcessIcon />

  if (idx < current) return <DoneIcon />

  return (
    <IconWrap>
      <WaitIcon />
    </IconWrap>
  )
}

const abortSteps: StepProps[] =
  [
    OrderStatus.COMMIT,
    OrderStatus.NOT_START,
    OrderStatus.ABROGATION,
    OrderStatus.IN_PROGRESS,
    OrderStatus.ACCEPTANCE,
    OrderStatus.FINISHED,
  ].map((s, idx) => ({
    title: orderStatusNameMapping.get(s) || '-',
    icon: getIcon(2, idx, true),
    status: getStatus(2, idx, true)
  }))

const getDefaultSteps = (current: number): StepProps[] => (
  [
    OrderStatus.COMMIT,
    OrderStatus.NOT_START,
    OrderStatus.IN_PROGRESS,
    OrderStatus.ACCEPTANCE,
    OrderStatus.FINISHED,
  ].map((s, idx) => ({
    title: orderStatusNameMapping.get(s) || '-',
    status: getStatus(current, idx),
    icon: getIcon(current, idx),
  }))
)

const getReworkSteps = (current: number): StepProps[] => (
  [
    OrderStatus.COMMIT,
    OrderStatus.NOT_START,
    OrderStatus.REWORK,
    OrderStatus.ACCEPTANCE,
    OrderStatus.FINISHED,
  ].map((s, idx) => ({
    title: orderStatusNameMapping.get(s) || '-',
    status: getStatus(current, idx),
    icon: getIcon(current, idx),
  }))
)

export const useStep = () => {
  const [order] = useAtom(orderDetailAtom)

  const { status } = order || { status: OrderStatus.NOT_START }

  const { current, items } = React.useMemo(
    () => {
      switch (status) {
        case OrderStatus.ABROGATION:
          return {
            current: 2,
            items: abortSteps,
          }
        case OrderStatus.IN_PROGRESS:
          return {
            current: 2,
            items: getDefaultSteps(2),
          }
        case OrderStatus.REWORK:
          return {
            current: 2,
            items: getReworkSteps(2),
          }
        case OrderStatus.ACCEPTANCE:
          return {
            current: 3,
            items: getDefaultSteps(3)
          }
        case OrderStatus.FINISHED:
          return {
            current: 5,
            items: getDefaultSteps(5)
          }
        default:
          return {
            current: 1,
            items: getDefaultSteps(1),
          }
      }
    },
    [status]
  )

  return {
    current,
    items,
  }
}
