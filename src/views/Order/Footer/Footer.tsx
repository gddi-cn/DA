import React from 'react'
import {FooterBar} from "@src/UIComponents";

import { useFooter } from './hook'
import {PrimaryBtn, SecondaryBtn} from "@src/components/Button";

const Footer: React.FC = () => {
  const {
    showCancel, showDelete, showFinish,
    handleCancel, handleDelete, handleFinish
  } = useFooter()

  return (
    <FooterBar
      leftContent={
        showCancel ? (
          <SecondaryBtn width={132} onClick={handleCancel}>
            取消
          </SecondaryBtn>
        ) : null
      }
      rightContent={
        showDelete ? (
          <SecondaryBtn error onClick={handleDelete}>
            删除任务
          </SecondaryBtn>
        ) : (
          showFinish ? (
            <PrimaryBtn onClick={handleFinish}>
              查看数据集
            </PrimaryBtn>
          ) : null
        )
      }
    />
  )
}

export default Footer
