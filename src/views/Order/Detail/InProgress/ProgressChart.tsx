import React from 'react'
import styled from "styled-components";
import {Progress} from "antd";

interface ProgressChartProps {
  done: number
  total: number
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Percent = styled.p`
  font-weight: 600;
  font-size: 42px;
  line-height: 59px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.25px;
  color: #48A2DF;
`

const Detail = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #48A2DF;
`

const ProgressChart: React.FC<ProgressChartProps> = (
  {
    done,
    total,
  }
) => {
  const percent = (() => {
    if  (!done || !total) return 0
    if (done >= total) return 100
    return Math.floor(done * 100 / total)
  })()

  return (
    <Progress
      type="circle"
      percent={percent}
      strokeWidth={9}
      width={200}
      strokeColor={'#48A2DF'}
      trailColor={'#CCE6F9'}
      format={() => (
        <Content>
          <Percent>
            {percent}%
          </Percent>
          <Detail>
            {done || 0} / {total || 0}
          </Detail>
        </Content>
      )}
    />
  )
}

export default ProgressChart
