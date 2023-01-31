import React from "react";
import styled from "styled-components";

import NoData from './NoData'
import Left from './Left'
import Right from './Right'
import { useImgRetrieval } from './hook'

const Container = styled.div`
  max-height: calc(100vh - 170px);
  height: 100%;
  display: flex;
  overflow: hidden;
  max-width: 100%;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  column-gap: 20px;
  padding: 16px;
`;

const ImgRetrieval: React.FC = () => {
  const { empty } = useImgRetrieval()

  return (
    <Container>
      {
        empty ? (
          <NoData />
        ) : (
          <>
            <Left />
            <Right />
          </>
        )
      }
    </Container>
  );
};

export default ImgRetrieval;
