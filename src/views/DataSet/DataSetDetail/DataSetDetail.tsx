import styled from "styled-components";

import { ScaleRight } from "@src/UIComponents";
import DatasetInfo from "./DatasetInfo";
import DatasetPreview from "./DatasetPreview";
import Footer from "./Footer";

import { useDatasetDetail } from './hook'

const Container = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  flex: 1;
  max-width: 1920px;
  padding: 10px 30px;
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
`;

const DataSetDetail = (): JSX.Element => {
  useDatasetDetail()

  return (
    <Container>
      <Content>
        <ScaleRight
          leftContent={(
            <Item>
              <DatasetInfo />
            </Item>
          )}
          rightContent={(
            <Item>
              <DatasetPreview />
            </Item>
          )}
        />
      </Content>
      <Footer />
    </Container>
  );
};

export default DataSetDetail;
