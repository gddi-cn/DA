import React from "react";
import styled from "styled-components";
import Progress from './Progress'

import { useModelAuth } from "./hook";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #48A2DF;
`

const ModelAuth: React.FC = () => {
  const { progress, tip } = useModelAuth();

  return (
    <Container>
      <Title>模型授权</Title>
      <Progress progress={progress} />
      <Meta>
        <span>{tip}</span>
        <span>{progress}%</span>
      </Meta>
    </Container>
  );
};

export default ModelAuth;
