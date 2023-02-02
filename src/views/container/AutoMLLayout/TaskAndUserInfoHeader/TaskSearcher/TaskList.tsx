import React from 'react'
import styled from 'styled-components'

import { useTaskList } from './hook'
import { ReactCusScrollBar } from '@src/UIComponents'
import TaskItem from './TaskItem'
import Nodata from './Nodata'
import { Spin } from 'antd'
import LoadMore from './LoadMore'

const Container = styled.div`
  width: 452px;
  height: 444px;
  overflow: hidden;
`

const ListWrap = styled.li`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const TaskList: React.FC = () => {
  const { empty, taskList, loading } = useTaskList()

  return (
    <Spin spinning={loading}>
      <Container>
          {
            empty ? (
              <Nodata />
            ) : (
              <ReactCusScrollBar id={'task_searcher_list'}>
                <ListWrap>
                  {
                    taskList.map((task) => (
                      <TaskItem {...task} key={task.id} />
                    ))
                  }
                  <LoadMore />
                </ListWrap>
              </ReactCusScrollBar>
            )
          }
      </Container>
    </Spin>
  )
}

export default TaskList

