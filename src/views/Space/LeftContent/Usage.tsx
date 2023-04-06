import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

import watermark from "@src/asset/images/platform/watermark.png";
import { useUsage } from "./hook";

import Model from "./Model";
import Channel from "./Channel";
import Train from "./Train";
import Storage from '@views/Space/LeftContent/Storage'

const Container = styled.div`
  margin-top: 20px;
  background: #edf8ff;
  border-radius: 4px;
  padding: 20px 10px;
  position: relative;
  outline: 0px solid #edf8ff;
  transition: all ease-in-out 0.2s;
  &:hover:not([selected]) {
    cursor: pointer;
    outline: 1px solid #edf8ff;
  }
  &[selected] {
    outline: 1px solid #48a2df;
  }
`;

const Watermark = styled.img`
  object-fit: contain;
  display: block;
  width: 104px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 4px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`;

const DataDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  row-gap: 16px;
`;

const Usage: React.FC = () => {
  const { loading, containerRef, handleClick } = useUsage();

  return (
    <Spin spinning={loading}>
      <Container ref={containerRef} onClick={handleClick}>
        <Watermark src={watermark} alt={"watermark"} />
        <Title>使用情况</Title>
        <DataDisplay>
          <Train />
          <Storage />
          <Model />
          <Channel />
        </DataDisplay>
      </Container>
    </Spin>
  );
};

export default Usage;
