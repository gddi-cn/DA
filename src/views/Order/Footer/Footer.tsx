import React from 'react'
import {FooterBar} from "@src/UIComponents";

import { useFooter } from './hook'
import {PrimaryBtn, SecondaryBtn} from "@src/components/Button";

const Footer: React.FC = () => {
  const {
    showFooter,
    showDelete, showFinish,
    handleDelete, handleFinish,
    deleteLoading,
  } = useFooter()

  return showFooter ? (
    <FooterBar
      rightContent={
        showDelete ? (
          <SecondaryBtn loading={deleteLoading} color={'error'} onClick={handleDelete}>
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
  ) : null
}

export default Footer
