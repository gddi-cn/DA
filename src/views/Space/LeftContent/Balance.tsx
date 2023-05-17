
import React from "react";
import styled from "styled-components";

import { useBalance } from "./hook";


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

const Balance: React.FC = () => {
  const { balance } = useBalance();

  return (
    <Container>
      <Title>账户余额</Title>
      <B>{balance}</B>
    </Container>
  );
};

export default Balance;
