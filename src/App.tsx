import React from "react";
import styled from "styled-components";
import { Calculator } from "./pages/Calculator/Calculator";

const App: React.FC = () => {
  return (
    <AppContainer>
      <Calculator />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default App;
