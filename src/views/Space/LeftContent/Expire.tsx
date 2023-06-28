
import React from "react";
import styled from "styled-components";

import { useExpire } from "./hook";


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

const B = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #48A2DF;
`

const Expire: React.FC = () => {
  const { expire } = useExpire();

  return (
    <Container>
      <Title>授权到期时间</Title>
      <B>{expire}</B>
    </Container>
  );
};

export default Expire;
